<?php
session_start();
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Recupera las clases que va a necesitar para recuperar la información
require_once '../Model/Usuario.php';

$email = $_GET['emailUsuarioRegistro'];
$nombre = $_GET['nomUsuarioRegistro'];
$pass = $_GET['passUsuarioRegistro'];
$fechNac = $_GET['fechNac'];
$provincia = $_GET['provincia'];
$localidad = $_GET['localidad'];
Usuario::insertNuevoUsuario($nombre, $pass, $email, $fechNac, $provincia, $localidad);
if(isset($_GET['movil'])){
    include '../View/indexUsuario.php';
}

