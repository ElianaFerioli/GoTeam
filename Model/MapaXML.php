<?php
require_once 'GoTeamDB.php';
function parseToXML($htmlStr)
{
$xmlStr=str_replace('<','&lt;',$htmlStr);
$xmlStr=str_replace('>','&gt;',$xmlStr);
$xmlStr=str_replace('"','&quot;',$xmlStr);
$xmlStr=str_replace("'",'&#39;',$xmlStr);
$xmlStr=str_replace("&",'&amp;',$xmlStr);
return $xmlStr;
}


$conexion = GoTeamDB::connectDB();
$seleccion = "SELECT * FROM EVENTO E, INSTALACION I, PISTA P, DEPORTE D WHERE E.CodPista=P.CodPista "
        . "AND P.CodInst=I.CodInst AND P.CodDep=D.CodDep AND E.FechEven > CURRENT_DATE() ORDER BY "
        . "E.FechEven DESC";
$consulta = $conexion->query($seleccion);  
header("Content-type: text/xml");

echo '<markers>';

while ($registro = $consulta->fetchObject()) {

  echo '<marker ';
  echo 'name="' . parseToXML($registro->NomInst) . '" ';
  echo 'deporte="' . parseToXML($registro->NomDep) . '" ';
  echo 'fecha="' . parseToXML($registro->FechEven) . '" ';
  echo 'hora="' . parseToXML($registro->HoraEven) . '" ';
  echo 'lat="' . parseToXML($registro->Latitud) . '" ';
  echo 'lng="' . parseToXML($registro->Longitud) . '" ';
  echo '/>';
}

echo '</markers>';

?>

