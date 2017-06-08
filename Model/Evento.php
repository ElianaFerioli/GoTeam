<?php
require_once 'GoTeamDB.php';
class Evento {
  //Atributos de instancia
  private $codEven;
  private $codPista;
  private $fechEven;
  private $horaEven;
  private $nivelEven;
  private $usuariosFaltantes;
  private $cerrado;
  //Constructor
  function __construct($codEv, $codPis, $fechEv, $horaEv, $nivelEv, $usFalt, $cerr) {
    $this->codEven = $codEv;
    $this->codPista = $codPis;
    $this->fechEven = $fechEv;
    $this->horaEven = $horaEv;
    $this->nivelEven = $nivelEv;
    $this->usuariosFaltantes = $usFalt;
    $this->cerrado = $cerr;
  }
  //Getters
  function getCodEven() {
      return $this->codEven;
  }
  function getCodPista() {
      return $this->codPista;
  }
  function getFechEven() {
      return $this->fechEven;
  }
  function getHoraEven() {
      return $this->horaEven;
  }
  function getNivelEven() {
      return $this->nivelEven;
  }
  function getUsuariosFaltantes() {
      return $this->usuariosFaltantes;
  }
  function getCerrado() {
      return $this->cerrado;
  }
  //Setters
  function setCodEven($codEven) {
      $this->codEven = $codEven;
  }
  function setCodPista($codPista) {
      $this->codPista = $codPista;
  }
  function setFechEven($fechEven) {
      $this->fechEven = $fechEven;
  }
  function setHoraEven($horaEven) {
      $this->horaEven = $horaEven;
  }
  function setNivelEven($nivelEven) {
      $this->nivelEven = $nivelEven;
  }
  function setUsuariosFaltantes($usuariosFaltantes) {
      $this->usuariosFaltantes = $usuariosFaltantes;
  }
  function setCerrado($cerrado) {
      $this->cerrado = $cerrado;
  }
  //Métodos de instancia
  public function insert() {
    $conexion = GoTeamDB::connectDB();
    $insercion = "INSERT INTO EVENTO (CodPista, FechEven, HoraEven, NivelEven, UsuariosFaltantes, Cerrado)"
            . " VALUES (\"".$this->codPista."\", \"".$this->fechEven."\", \"".$this->horaEven."\""
            . "\"".$this->nivelEven."\", \"".$this->usuariosFaltantes."\", \"".$this->cerrado."\")";
    $conexion->exec($insercion);
  }
  public static function insertaEvento($codpis, $fech, $hora, $nivel, $faltantes) {
    $conexion = GoTeamDB::connectDB();
    $insercion = "INSERT INTO EVENTO (CodPista, FechEven, HoraEven, NivelEven, UsuariosFaltantes)"
            . " VALUES (\"".$codpis."\", \"".$fech."\", \"".$hora."\","
            . "\"".$nivel."\", \"".$faltantes."\")";
    $conexion->exec($insercion);
  }
  public static function delete($atributo, $valor) {
    $conexion = GoTeamDB::connectDB();
    $borrado = "DELETE FROM EVENTO WHERE ".$atributo. "=\"".$valor."\"";
    $conexion->exec($borrado);
  }  
  public static function getEventos() {
    $conexion = GoTeamDB::connectDB();
    $seleccion = "SELECT CodEven, CodPista, FechEven, HoraEven, NivelEven, UsuariosFaltantes, Cerrado"
            . " FROM EVENTO";
    $consulta = $conexion->query($seleccion);    
    $eventos= [];    
    while ($registro = $consulta->fetchObject()) {
      $eventos[] = new Evento($registro->CodEven, $registro->CodPista, $registro->FechEven, $registro->HoraEven, 
              $registro->NivelEven, $registro->UsuariosFaltantes, $registro->Cerrado);
    }   
    return $eventos;    
  }
  public static function update($cod, $fech, $hor, $ni, $us, $codEven) {
    $conexion = GoTeamDB::connectDB();
    $update = "UPDATE EVENTO SET CodPista=\"".$cod."\", FechEven=\"".$fech."\", HoraEven=\"".$hor."\", NivelEven=\"".
            $ni."\", UsuariosFaltantes=\"".$us."\"".
            " WHERE CodEven=".$codEven;
    $conexion->exec($update);
  }
  
  public static function updateUsuariosBorrados($codEven) {
    $conexion = GoTeamDB::connectDB();
    $update = "UPDATE EVENTO SET UsuariosFaltantes= UsuariosFaltantes+1 WHERE CodEven=".$codEven;
    $conexion->exec($update);
  }
  public static function updateUsuariosSumados($codEven) {
    $conexion = GoTeamDB::connectDB();
    $update = "UPDATE EVENTO SET UsuariosFaltantes= UsuariosFaltantes-1 WHERE CodEven=".$codEven;
    $conexion->exec($update);
  }
  public static function getEvento($codEven) {
    $conexion = GoTeamDB::connectDB();
    $seleccion = "SELECT * FROM EVENTO WHERE CodEven=".$codEven;
    $consulta = $conexion->query($seleccion);    
    $registro = $consulta->fetchObject();
    $evento = new Evento($registro->CodEven, $registro->CodPista, $registro->FechEven, $registro->HoraEven, 
              $registro->NivelEven, $registro->UsuariosFaltantes, $registro->Cerrado);
    return $evento;
  } 
  
  
  public static function getCodigoPistaEvento($atributo, $valor) {
    $conexion = GoTeamDB::connectDB();
    $seleccion = "SELECT CodEven, CodPista, FechEven, HoraEven, NivelEven, UsuariosFaltantes, Cerrado"
            . " FROM EVENTO WHERE ".$atributo."=\"".$valor."\"";
    $consulta = $conexion->query($seleccion);
    $registro = $consulta->fetchObject();
    $evento = $registro->CodPista;
    echo $evento;    
  }
  public static function getEventoPorNomInstalacion($valor) {
    $conexion = GoTeamDB::connectDB();
    $seleccion = "SELECT * FROM EVENTO E, INSTALACION I, PISTA P, DEPORTE D WHERE E.CodPista=P.CodPista "
            . "AND P.CodInst=I.CodInst AND P.CodDep=D.CodDep AND I.NomInst=\"".$valor."\" AND E.FechEven"
            . " > CURRENT_DATE() ORDER BY E.FechEven DESC";
    $consulta = $conexion->query($seleccion);
    $evento= [];    
    while ($registro = $consulta->fetchObject()) {
        $nuevo = [];
        $nuevo[] = $registro->NomDep;
        $nuevo[] = $registro->FechEven;
        $nuevo[] = $registro->HoraEven;
        $nuevo[] = $registro->NivelEven;
        $nuevo[] = $registro->UsuariosFaltantes;
        $nuevo[] = $registro->CodEven;
        $evento[] = $nuevo;
    } 
    echo \json_encode($evento);
  }
  
  public static function insertaEventoAjax($codpis, $fech, $hora, $nivel, $faltantes) {
    $conexion = GoTeamDB::connectDB();
    $insercion = "INSERT INTO EVENTO (CodPista, FechEven, HoraEven, NivelEven, UsuariosFaltantes)"
            . " VALUES (\"".$codpis."\", \"".$fech."\", \"".$hora."\","
            . "\"".$nivel."\", \"".$faltantes."\")";
    $conexion->exec($insercion);
    //RECUPERA EL ID DE LA ÚLTIMA FINAL AÑADIDA
    $ultimoId = $conexion->lastInsertId();
    echo $ultimoId;
  }
  public static function getEventosOrdenados($ordenaPor, $forma) {
    $conexion = GoTeamDB::connectDB();
    $seleccion = "SELECT * FROM EVENTO E, PISTA P, INSTALACION I WHERE E.CodPista = P.CodPista AND "
            . "I.CodInst = P.CodInst ORDER BY ".$ordenaPor." ".$forma;
    $consulta = $conexion->query($seleccion);
    while ($registro = $consulta->fetchObject()) {
        $datos[] = array("codDep" => $registro->CodDep, "nomInst" => $registro->NomInst, 
            "nomPist" => $registro->NomPist, "fechEven" => $registro->FechEven,
            "horaEven" => $registro->HoraEven, "nivelEven" => $registro->NivelEven,
            "usuariosFaltantes" => $registro->UsuariosFaltantes, "cerrado" => $registro->Cerrado,
            "codEven" => $registro->CodEven);
    }
    return $datos;    
  }
  public static function getEventoCompleto($codigo) {
    $conexion = GoTeamDB::connectDB();
    $seleccion = "SELECT * FROM EVENTO E, PISTA P, INSTALACION I, DEPORTE D WHERE E.CodPista = P.CodPista AND "
            . "I.CodInst = P.CodInst AND D.CodDep=P.CodDep AND E.CodEven=".$codigo;
    $consulta = $conexion->query($seleccion);
    while ($registro = $consulta->fetchObject()) {
        $datos[] = array("codDep" => $registro->CodDep, "nomInst" => $registro->NomInst, 
            "nomPist" => $registro->NomPist, "fechEven" => $registro->FechEven,
            "horaEven" => $registro->HoraEven, "nivelEven" => $registro->NivelEven,
            "usuariosFaltantes" => $registro->UsuariosFaltantes, "cerrado" => $registro->Cerrado,
            "codEven" => $registro->CodEven, "nomDep" => $registro->NomDep, "codInst" => $registro->CodInst,
            "codPista" => $registro->CodPista);
    }
    return $datos;
  }
}