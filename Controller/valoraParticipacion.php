<?php
session_start();
require_once '../Model/Participacion.php';
require_once '../Model/Usuario.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if(isset($_GET['valoracion'])){
    $us = Usuario::getUsuario("EmailUs", $_SESSION['emailUsuario']);
    $codUs = $us->getCodUs();
    Participacion::updateParticipacion($codUs, $_GET['codEven'], $_GET['valoracion']);
}
