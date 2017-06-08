<?php
session_start();
require_once '../Model/Evento.php';
require_once '../Model/Pista.php';
require_once '../Model/Deporte.php';
require_once '../Model/Usuario.php';
require_once '../Model/Participacion.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if(isset($_GET['evento'])){
    $evento = Evento::getEvento($_GET['evento']);
    $codDep = Pista::getDeportePorPista($evento->getCodPista());
    $instalacion = Pista::getNomInstPorDeporteParaEvento($codDep, $evento->getCodEven());
    $nomDep = Deporte::getDeporte("CodDep", $codDep);
    $us = Usuario::getUsuario("EmailUs", $_SESSION['emailUsuario']);
    $codUs = $us->getCodUs();
    $valoracion = Participacion::getValoracionPorUsuarioYEvento($codUs, $evento->getCodEven());
    $ev = [];
    $ev["CodEven"] = $evento->getCodEven();
    $ev["CodPista"] = $evento->getCodPista();
    $ev["FechEven"] = $evento->getFechEven();
    $ev["HoraEven"] = $evento->getHoraEven();
    $ev["NivelEven"] = $evento->getNivelEven();
    $ev["UsuariosFaltantes"] = $evento->getUsuariosFaltantes();
    $ev["Cerrado"] = $evento->getCerrado();
    $ev["NomInst"] = $instalacion;
    $ev["NomDep"] = $nomDep->getNomDep();
    $ev["CodDep"] = $codDep;
    $ev["Valoracion"] = $valoracion;
    echo json_encode($ev);
}
if(isset($_GET['crearEvento'])){
    $pis = $_GET['pistaEvento'];
    $fech = $_GET['fechEven'];
    $ho = $_GET['horaEven'];
    $ni = $_GET['nivel'];
    $falt = $_GET['usuariosFaltantes'];
    $ultimoId = Evento::insertaEventoAjax($pis, $fech, $ho, $ni, $falt);     
}
if(isset($_GET['borrarUsuario'])){
    Evento::updateUsuariosBorrados($_GET['codEven']);
}
if(isset($_GET['sumarUsuario'])){
    Evento::updateUsuariosSumados($_GET['codEven']);
}
if(isset($_GET['eventosInstalacion'])){
    Evento::getEventoPorNomInstalacion($_GET['instalacion']);
}
if(isset($_GET['busqueda'])){
    
    $eventos = Evento::getEventos();
    $arrayEventos = [];
    foreach($eventos as $ev){
        $codEven = $ev->getCodEven();
        $codDep = Pista::getDeportePorPista($ev->getCodPista());        
        $instalacion = Pista::getNomInstPorDeporteParaEvento($codDep, $codEven);
        $nomDep = Deporte::getDeporte("CodDep", $codDep);
            $e = [];
            $e["FechEven"] = $ev->getFechEven();
            $e["HoraEven"] = $ev->getHoraEven();
            $e["NivelEven"] = $ev->getNivelEven();
            $e["UsuariosFaltantes"] = $ev->getUsuariosFaltantes();
            $e["NomInst"] = $instalacion;
            $e["NomDep"] = $nomDep->getNomDep();
       $arrayEventos[] = $e;
    }
    echo json_encode($arrayEventos);
}