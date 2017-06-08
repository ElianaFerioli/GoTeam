<?php
require_once 'GoTeamDB.php';

class Preferencia {
  //Atributos de instancia
  private $codDep;
  private $codUs;
  private $nivelUs;
  //Constructor
  function __construct($codDep, $codUs, $nivelUs) {
    $this->codDep = $codDep;
    $this->codUs = $codUs;
    $this->nivelUs = $nivelUs;
  }
  //Getters y setters   
  function getCodDep() {
      return $this->codDep;
  }
  function getCodUs() {
      return $this->codUs;
  }
  function getNivelUs() {
      return $this->nivelUs;
  }
  function setCodDep($codDep) {
      $this->codDep = $codDep;
  }
  function setCodUs($codUs) {
      $this->codUs = $codUs;
  }
  function setNivelUs($nivelUs) {
      $this->nivelUs = $nivelUs;
  }
  //Métodos
  public static function insertNuevaPreferencia($dep, $us){
    $conexion = GoTeamDB::connectDB();
    $insercion = "INSERT INTO PREFERENCIA (CodDep, CodUs)"
            . " VALUES (\"".$dep."\", \"".$us."\")";
    $conexion->exec($insercion);
  }
  public static function delete($atributoUno, $valorUno, $atributoDos, $valorDos) {
    $conexion = GoTeamDB::connectDB();
    $borrado = "DELETE FROM PREFERENCIA WHERE ".$atributoUno. "=\"".$valorUno."\" AND ".$atributoDos. "=\"".$valorDos."\"";
    $conexion->exec($borrado);
  }

   public static function getPreferencias($codUs) {
    $conexion = GoTeamDB::connectDB();
    $seleccion = "SELECT *"
            . " FROM PREFERENCIA WHERE CodUs=\"".$codUs."\"";
    $consulta = $conexion->query($seleccion);    
    $preferencias= [];    
    while ($registro = $consulta->fetchObject()) {
      $preferencias[] = $registro->CodDep;
    }   
    return $preferencias;    
  } 
}