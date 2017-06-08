<?php
session_start();
require_once '../Model/Participacion.php';
require_once '../Model/Usuario.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if(isset($_GET['nuevaParticipacion'])){
    if(isset($_GET['codUs'])){
        Participacion::insertNuevaParticipacion($_GET['codUs'], $_GET['codEven']);
    } else {
        $us = Usuario::getUsuario("EmailUs", $_SESSION['emailUsuario']);
        $codUs = $us->getCodUs();
        Participacion::insertNuevaParticipacion($codUs, $_GET['codEven']);
    }
}
if(isset($_GET['borrar'])){
    $us = Usuario::getUsuario("EmailUs", $_SESSION['emailUsuario']);
    $codUs = $us->getCodUs();
    Participacion::delete($codUs, $_GET['codEven']);
}
if(isset($_GET['esApuntado'])){
    $us = Usuario::getUsuario("EmailUs", $_SESSION['emailUsuario']);
    $codUs = $us->getCodUs();
    Participacion::getParticipacionDeUsuarioEnEvento($codUs, $_GET['codEven']);
    //Participacion::insertNuevaParticipacion($_GET['codUs'], $_GET['codEven']);
}
