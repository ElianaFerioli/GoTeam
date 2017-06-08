<?php
require_once '../Model/Usuario.php';
/* 
 * Esta página es utilizada Para realizar las consultas de Ajax asociado al login
 * (verifica si el usuario existe y si coincide la contraseña)
 * No obstante, esta página no genera ningún tipo de sesión.
 */
if(!isset($_GET['passUsuario'])){
    if(Usuario::verificaUsuario($_GET['emailUsuario'])){
        echo "true";
    } else {
        echo "false";
    }
} else {
    if(Usuario::verificaUsuario($_GET['emailUsuario'])){
        $passCorrecta = Usuario::verificaPassword($_GET['emailUsuario']);
        if($passCorrecta==$_GET['passUsuario']){
            echo "true";
        } else {
            echo "false";
        }
    } else {
        echo "false";
    }
}

