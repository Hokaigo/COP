<?php
require_once __DIR__ . '/db.php';

class UserRepository
{
    private PDO $db;

    public function __construct(){
        $this->db = getDb();
    }

    public function createUser($name, $email, $passwordHash){
        $statement = $this->db->prepare('INSERT INTO users (name, email, passwordHash) VALUES (?, ?, ?)');
        return $statement->execute([$name, $email, $passwordHash]);
    }

    public function findByEmail($email){
        $statement = $this->db->prepare('SELECT * FROM users WHERE email = ? LIMIT 1');
        $statement->execute([$email]);
        return $statement->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function getUserById($id){
        $statement = $this->db->prepare('SELECT id, name, email FROM users WHERE id = ? LIMIT 1');
        $statement->execute([$id]);
        return $statement->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function saveGameStat($userId, $difficulty, $timeSpent, $correctCells, $scorePercent){
        $sql = 'INSERT INTO game_stats (user_id, difficulty, time_spent, correct_cells, score_percent) VALUES (?, ?, ?, ?, ?)';
        $statement = $this->db->prepare($sql);
        return $statement->execute([$userId, $difficulty, $timeSpent, $correctCells, $scorePercent]);
    }

    public function getGameStatByUserId($userId){
        $sql = 'SELECT id, difficulty, time_spent, correct_cells, score_percent, created_at FROM game_stats WHERE user_id = ? 
                                                                                       ORDER BY created_at DESC ';
        $statement = $this->db->prepare($sql);
        $statement->execute([$userId]);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteGameStatByUserId($userId){
        $sql = 'DELETE FROM game_stats WHERE user_id = ?';
        $statement = $this->db->prepare($sql);
        return $statement->execute([$userId]);
    }

    public function deleteSingleGameStat($statId, $userId){
        $sql = 'DELETE FROM game_stats WHERE id = ? AND user_id = ?';
        $statement = $this->db->prepare($sql);
        $statement->execute([$statId, $userId]);
        return $statement->rowCount();
    }

    public function deleteUser($userId)
    {
        $sql = 'DELETE FROM users WHERE id = ?';
        $statement = $this->db->prepare($sql);
        return $statement->execute([$userId]);
    }
}