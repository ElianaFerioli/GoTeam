<?php
abstract class GoTeamDB {
  private static $server = 'localhost';
  private static $db = 'goTeam';
  private static $user = 'root';
  private static $password = 'root';
  /*private static $server = 'mysql.hostinger.es';
  private static $db = 'u611982465_gote';
  private static $user = 'u611982465_elian';
  private static $password = '9RDO0rWIdjBb';*/

  public static function connectDB() {
    try {
      $connection = new PDO("mysql:host=".self::$server.";dbname=".self::$db.";charset=utf8", self::$user, self::$password);
    } catch (PDOException $e) {
      echo "No se ha podido establecer conexión con el servidor de bases de datos.<br>";
      die ("Error: " . $e->getMessage());
    } 
    return $connection;
  }
}
