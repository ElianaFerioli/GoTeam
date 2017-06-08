<?php
session_start();
require_once '../Model/Usuario.php';
require_once '../Model/Preferencia.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if(isset($_GET['preferencias'])){
    $usuario = Usuario::getUsuario("EmailUs", $_SESSION['emailUsuario']);
    $codUs = $usuario->getCodUs();
    $preferencias = Preferencia::getPreferencias($codUs);
    echo json_encode($preferencias);
}
if(isset($_GET['addPreferencia'])){
    $usuario = Usuario::getUsuario("EmailUs", $_SESSION['emailUsuario']);
    $codUs = $usuario->getCodUs();
    Preferencia::insertNuevaPreferencia($_GET['addPreferencia'], $codUs);
}
if(isset($_GET['removePreferencia'])){
    $usuario = Usuario::getUsuario("EmailUs", $_SESSION['emailUsuario']);
    $codUs = $usuario->getCodUs();
    Preferencia::delete("CodDep", $_GET['removePreferencia'], "CodUs", $codUs);
}

