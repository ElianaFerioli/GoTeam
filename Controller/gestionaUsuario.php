<?php
session_start();
require_once '../Model/Usuario.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if(isset($_GET['nombreFoto'])){
    Usuario::updateAtributo("FotoUs", $_GET['nombreFoto'], $_SESSION['emailUsuario']);
}

if(isset($_GET['modificarUsuario'])){
    Usuario::updateAtributo("NomUs", $_GET['nombre'], $_SESSION['emailUsuario']);
    Usuario::updateAtributo("FechNac", $_GET['fecha'], $_SESSION['emailUsuario']);
    if(isset($_GET['prov'])){
        Usuario::updateAtributo("ProvUs", $_GET['prov'], $_SESSION['emailUsuario']);
    }
    if(isset($_GET['local'])){
        Usuario::updateAtributo("LocaUs", $_GET['local'], $_SESSION['emailUsuario']);
    }
    Usuario::updateAtributo("DescUs", $_GET['desc'], $_SESSION['emailUsuario']);
}
