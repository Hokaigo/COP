<?php
require_once __DIR__ . '/UserRepository.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
class UserController
{
    private UserRepository $repo;

    private string $secretKey = '58a34f4148fb1a04801b7339af41884c';

    public function __construct(){
        $this->repo = new UserRepository();
    }

    public function handleRequest(): void{
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Credentials: true');

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }

        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        switch (true) {
            case ($path === '/register' && $method === 'POST'):
                $this->createUser();
                break;

            case ($path === '/login' && $method === 'POST'):
                $this->loginUser();
                break;

            case (preg_match('/\/users\/(\d+)/', $path, $matches) && $method === 'GET'):
                $userId = $matches[1];
                $this->getUser($userId);
                break;

            case ($path === '/stats' && $method === 'POST'):
                $this->saveUserStat();
                break;

            case ($path === '/stats' && $method === 'DELETE'):
                $this->deleteUserStats();
                break;

            case (preg_match('/\/stats\/(\d+)/', $path, $matches) && $method === 'DELETE'):
                $statId = $matches[1];
                $this->deleteSingleStat($statId);
                break;

            case (preg_match('/\/users\/(\d+)/', $path, $matches) && $method === 'DELETE'):
                $userId = $matches[1];
                $this->deleteUser($userId);
                break;

            default:
                http_response_code(404);
                echo json_encode(['error' => 'Route Not Found']);
                break;
        }
    }

    private function deleteUser($id): void {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
        if (!$authHeader) {
            http_response_code(401);
            echo json_encode(['error' => 'No token']);
            return;
        }
        $token = str_replace('Bearer ', '', $authHeader);
        if (empty($token)) {
            http_response_code(401);
            echo json_encode(['error' => 'No token']);
            return;
        }

        try {
            $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));
            $loggedInUserId = $decoded->data->userId;

            if ($loggedInUserId != $id) {
                http_response_code(403);
                echo json_encode(['error' => 'Access denied: You can only delete your own account.']);
                return;
            }

            $success = $this->repo->deleteUser($loggedInUserId);

            if ($success) {
                http_response_code(200);
                echo json_encode(['success' => true, 'message' => 'User account deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete user account']);
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token', 'message' => $e->getMessage()]);
        }
    }

    private function deleteSingleStat($statId): void{
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
        if (!$authHeader) {
            http_response_code(401);
            echo json_encode(['error' => 'No token']);
            return;
        }

        $token = str_replace('Bearer ', '', $authHeader);
        if (empty($token)) {
            http_response_code(401);
            echo json_encode(['error' => 'No token']);
            return;
        }

        try {
            $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));
            $loggedInUserId = $decoded->data->userId;

            $deletedRows = $this->repo->deleteSingleGameStat($statId, $loggedInUserId);

            if ($deletedRows > 0) {
                http_response_code(200);
                echo json_encode(['success' => true, 'message' => 'Stat record deleted']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Stat record not found or access denied']);
            }

        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token', 'message' => $e->getMessage()]);
        }
    }

    private function deleteUserStats(): void{
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
        if (!$authHeader) {
            http_response_code(401);
            return;
        }

        $token = str_replace('Bearer ', '', $authHeader);
        if (empty($token)) {
            http_response_code(401);
            return;
        }

        try{
            $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));
            $loggedInUserId = $decoded->data->userId;

            $success = $this->repo->deleteGameStatByUserId($loggedInUserId);

            if ($success) {
                http_response_code(200);
                echo json_encode(['success' => true, 'message' => 'All game stats deleted']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete game stats']);
            }
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token', 'message' => $e->getMessage()]);
        }
    }

    private function saveUserStat(): void{
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
        if (!$authHeader) { return; }
        $token = str_replace('Bearer ', '', $authHeader);
        if (empty($token)) { return; }

        try{
            $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));
            $loggedInUserId = $decoded->data->userId;

            $data = json_decode(file_get_contents("php://input"), true);

            if (!$data || !isset($data['difficulty'], $data['timeSpent'], $data['correct'], $data['score'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid game stats data']);
                return;
            }

            $success = $this->repo->saveGameStat($loggedInUserId, $data['difficulty'], $data['timeSpent'],
                $data['correct'], $data['score']);

            if ($success) {
                http_response_code(201);
                echo json_encode(['success' => true, 'message' => 'Game stats saved']);
            } else{
                http_response_code(500);
                echo json_encode(['error' => 'Failed to save game stats']);
            }
        } catch (Exception $e){
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token', 'message' => $e->getMessage()]);
        }
    }

    private function getUser($id): void
    {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? null;

        if (!$authHeader) {
            http_response_code(401);
            echo json_encode(['error' => 'No token provided']);
            return;
        }

        $token = str_replace('Bearer ', '', $authHeader);
        if (empty($token)) {
            http_response_code(401);
            echo json_encode(['error' => 'Token not found in header']);
            return;
        }

        try {
            $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));

            $loggedInUserId = $decoded->data->userId;
            if ($loggedInUserId != $id) {
                http_response_code(403);
                echo json_encode(['error' => 'Access denied']);
                return;
            }

            $user = $this->repo->getUserById($id);
            if($user){
                unset($user['passwordHash']);
                $stats = $this->repo->getGameStatByUserId($id);
                $user['stats'] = $stats;
                echo json_encode($user);
            } else{
                http_response_code(404);
                echo json_encode(['error' => 'User not found.']);
            }

        } catch (Firebase\JWT\ExpiredException $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Token has expired']);
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token', 'message' => $e->getMessage()]);
        }
    }

    private function createUser(): void{
        $data = json_decode(file_get_contents('php://input'), true);

        $errors = [];

        if(!$data || !isset($data['name']) || !isset($data['email']) || !isset($data['password'])){
            http_response_code(400);
            echo json_encode(['error' => 'Invalid data']);
            return;
        }

        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];

        if (empty($name)) {
            $errors['name'] = 'Name is required.';
        } elseif (mb_strlen($name) < 2) {
            $errors['name'] = 'Name must be at least 2 symbols.';
        } elseif (mb_strlen($name) > 10) {
            $errors['name'] = 'Name must be 10 symbols or less.';
        } elseif (preg_match('/\s/', $name)) {
            $errors['name'] = 'Name must not contain spaces.';
        }

        if (empty($email)) {
            $errors['email'] = 'Email is required.';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Incorrect email format.';
        } elseif (preg_match('/\s/', $email)) {
            $errors['email'] = 'Email must not contain spaces.';
        }

        if (empty($password)) {
            $errors['password'] = 'Password is required.';
        } elseif (mb_strlen($password) < 6) {
            $errors['password'] = 'Password must be at least 6 symbols.';
        } elseif (mb_strlen($password) > 30) {
            $errors['password'] = 'Password must be 30 symbols or less.';
        } elseif (preg_match('/\s/', $password)) {
            $errors['password'] = 'Password must not contain spaces.';
        }

        if (!empty($errors)) {
            http_response_code(422);
            echo json_encode(['errors' => $errors]);
            return;
        }

        $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);

        if($this->repo->findByEmail($data['email'])){
            http_response_code(409);
            echo json_encode(['error' => 'Email already exists.']);
            return;
        }

        if ($this->repo->createUser($data['name'], $data['email'], $passwordHash)) {
            http_response_code(201);
            echo json_encode(['success' => true, 'message' => 'User created']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create user']);
        }
    }

    private function loginUser(): void {
        $data = json_decode(file_get_contents('php://input'), true);

        if(!$data || !isset($data['email']) || !isset($data['password'])){
            http_response_code(400);
            echo json_encode(['error' => 'Email and password required']);
            return;
        }

        $user = $this->repo->findByEmail($data['email']);

        if ($user && password_verify($data['password'], $user['passwordHash'])) {

            unset($user['passwordHash']);

            $issuedAt = time();
            $expire = $issuedAt + 3600;
            $issuer = "http://sudoku.local";

            $payload = [
                'iat' => $issuedAt,
                'exp' => $expire,
                'iss' => $issuer,
                'data' => [
                    'userId' => $user['id']
                ]
            ];

            $token = JWT::encode($payload, $this->secretKey, 'HS256');

            echo json_encode([
                'success' => true,
                'user' => $user,
                'token' => $token
            ]);

        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid data']);
        }
    }
}