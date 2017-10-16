<?php
class Database{

    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    // get the database connection
    public function getConnection(){

        $this->host = getenv('DATABASE_SERVICE_NAME');
        $this->db_name = getenv('DATABASE_NAME');
        $this->username = getenv('DATABASE_USER');
        $this->password = getenv('DATABASE_PASSWORD');
            
        $this->conn = null;

        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}