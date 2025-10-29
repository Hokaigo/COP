<?php

function getDb(): PDO{
    static $db = null;

    if ($db === null) {
        $host = 'localhost';
        $dbName = 'sudoku';
        $user = 'root';
        $pass = '';
        $charset = 'utf8mb4';
        $port = 3307;

        $dsn = "mysql:host=$host;port=$port;dbname=$dbName;charset=$charset";
        try{
            $db = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
        } catch (PDOException $e){
            die("database connection failed: " . $e->getMessage());
        }
    }
    return $db;
}
