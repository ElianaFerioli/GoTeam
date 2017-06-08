<?php
require_once 'GoTeamDB.php';

class Participacion {
  //Atributos de instancia
  private $codUs;
  private $codEven;
  private $valoracion;
  //Constructor
  function __construct($codUs, $codEven, $valoracion) {
    $this->codUs = $codUs;
    $this->codEven = $codEven;
    $this->valoracion = $valoracion;
  }
  function getCodUs() {
      return $this->codUs;
  }

  function getCodEven() {
      return $this->codEven;
  }

  function setCodUs($codUs) {
      $this->codUs = $codUs;
  }

  function setCodEven($codEven) {
      $this->codEven = $codEven;
  }
  function getValoracion() {
      return $this->valoracion;
  }
  function setValoracion($valoracion) {
      $this->valoracion = $valoracion;
  }
  
  //Métodos
  public static function insertNuevaParticipacion($codUs, $codEven){
    $conexion = GoTeamDB::connectDB();
    $insercion = "INSERT INTO PARTICIPACION (CodUs, CodEven)"
            . " VALUES (\"".$codUs."\", \"".$codEven."\")";
    $conexion->exec($insercion);
  }
  public static function delete($codUs, $codEven) {
    $conexion = GoTeamDB::connectDB();
    $borrado = "DELETE FROM PARTICIPACION WHERE CodUs=".$codUs." AND  CodEven=".$codEven;
    $conexion->exec($borrado);
  }

   public static function getParticipacion($codUs) {
    $conexion = GoTeamDB::connectDB();
    /*$seleccion = "SELECT *"
            . " FROM PARTICIPACION WHERE ".$atributo."=\"".$valor."\"";*/
    $seleccion =  "SELECT * FROM  PARTICIPACION INNER JOIN  EVENTO ON PARTICIPACION.CodEven=EVENTO.CodEven "
            . "WHERE PARTICIPACION.CodUs=".$codUs." AND EVENTO.FechEven < CURRENT_DATE() ORDER BY "
            . "EVENTO.FechEven DESC";
    $consulta = $conexion->query($seleccion);    
    $participacion= [];    
    while ($registro = $consulta->fetchObject()) {
       $participacion[] = $registro->CodEven;
    }   
    return $participacion;    
  } 
  
  public static function getParticipacionDeUsuarioEnEvento($codUs, $codEven) {
    $conexion = GoTeamDB::connectDB();
    $seleccion =  "SELECT * FROM  PARTICIPACION WHERE CodUs=".$codUs." AND CodEven=".$codEven;
    $consulta = $conexion->query($seleccion);    
    $participacion= [];    
    while ($registro = $consulta->fetchObject()) {
       $participacion[] = $registro->CodEven;
    }   
    echo \json_encode($participacion);  
  } 
  
  
  public static function getParticipacionAbiertaPorFecha($codUs) {
    $conexion = GoTeamDB::connectDB();
    $seleccion = "SELECT * FROM  PARTICIPACION INNER JOIN  EVENTO ON PARTICIPACION.CodEven=EVENTO.CodEven "
            . "WHERE PARTICIPACION.CodUs=".$codUs." AND EVENTO.FechEven >= CURRENT_DATE() ORDER BY "
            . "EVENTO.FechEven DESC";
    $consulta = $conexion->query($seleccion);    
    $participacion= [];    
    while ($registro = $consulta->fetchObject()) {
       $participacion[] = $registro->CodEven;
    }   
    return $participacion;    
  } 
  
  public static function getValoracionPorUsuarioYEvento($codUs, $codEven) {
    $conexion = GoTeamDB::connectDB();
    $seleccion = "SELECT Valoracion"
            . " FROM PARTICIPACION WHERE CodUs=".$codUs." AND CodEven=".$codEven;
    $consulta = $conexion->query($seleccion);    
    $participacion= [];    
    while ($registro = $consulta->fetchObject()) {
       $participacion[] = $registro->Valoracion;
    }   
    return $participacion;    
  } 
  
  public static function updateParticipacion($codUs, $codEven, $valoracion) {
    $conexion = GoTeamDB::connectDB();
    $update = "UPDATE PARTICIPACION SET Valoracion=".$valoracion." WHERE CodUs=".$codUs." AND CodEven=".$codEven;
    $conexion->exec($update);
  }
}

