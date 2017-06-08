<?php
session_start();
require_once '../Model/Usuario.php';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if(Usuario::verificaUsuario($_GET['emailUsuario'])){
        $passCorrecta = Usuario::verificaPassword($_GET['emailUsuario']);
        if($passCorrecta==$_GET['passUsuario']){            
            $usuario = Usuario::getUsuario("EmailUs", $_GET['emailUsuario']);
            if(Usuario::verificaAdmin($_GET['emailUsuario'])){
                //Si es administrador lo manda a la vista de administrado
                include '../View/indexAdmin.php';
            } else {
                $_SESSION['emailUsuario'] = $usuario->getEmailUs();
                include '../View/indexUsuario.php';
            }
        } else {
            session_destroy();
            include '../index.php';
        }
} else if(isset($_SESSION['facebook'])){
    $usuario = Usuario::getUsuario("EmailUs", $facebook_user);
    if($facebook_user==$usuario->getEmailUs()){
        $_SESSION['emailUsuario'] = $usuario->getEmailUs();
        unset($_SESSION['facebook']);
    }
    include '../View/indexUsuario.php';
} else {
    session_destroy();
    include '../index.php';
}
