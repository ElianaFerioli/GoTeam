<?php
session_start();
if(isset($_SESSION['facebook'])){
    unset($_SESSION['facebook']);
}
if(isset($_SESSION['emailUsuario'])){
    unset($_SESSION['emailUsuario']);
}
//header('Location: http://goteam.hol.es/index.php');
header('Location: http://localhost:8000/index.php');

