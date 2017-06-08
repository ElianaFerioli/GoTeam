<?php
session_start();
$existe = file_exists('./Model/Evento.php');
if ($existe){
    require_once './Model/Usuario.php';
    require_once './Controller/startFacebook.php';
} else {
    require_once '../Model/Usuario.php';
    require_once '../Controller/startFacebook.php';
}
if(isset($_SESSION['facebook'])){
    $emailFacebook =  $facebook_user->getProperty("email");
    $idFacebook = $facebook_user->getProperty("id");
    if(Usuario::verificaUsuario($emailFacebook)){
        $_SESSION['emailUsuario'] = $emailFacebook;
        $_SESSION['idFacebook'] = $idFacebook;
        unset($_SESSION['facebook']);
    } else {
        unset($_SESSION['facebook']);
    }
 } else {
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>GoTeam</title>
        <?php
            $existe = file_exists('./Model/Evento.php');
            if ($existe){
        ?>
            <link rel="icon" href="./View/img/logo.png">
            <script src="./View/js/jquery-2.1.4.min.js"></script>
            <script src="./View/js/jquery-ui.min.js"></script>
            <script src="./View/js/funcionesIndex.js"></script>
            <link rel="stylesheet" type="text/css" href="./View/css/estiloIndex.css">
            <link rel="stylesheet" type="text/css" href="./View/css/jquery-ui.css">
        <?php
            } else {
        ?>
            <link rel="icon" href="../View/img/logo.png">
            <script src="../View/js/jquery-2.1.4.min.js"></script>
            <script src="../View/js/jquery-ui.min.js"></script>
            <script src="../View/js/funcionesIndex.js"></script>
            <link rel="stylesheet" type="text/css" href="../View/css/estiloIndex.css">
            <link rel="stylesheet" type="text/css" href="../View/css/jquery-ui.css">
        <?php
           }
        ?>
        <meta name="viewport" content="width=device-width, height=device-height; initial-scale=1.0">
        <style>
            #formularioLoginMovil, #formularioRegistroMovil{
                display: none;
            }
        </style>
    </head>
    <body>
        <ul class="slide">
            <li>
                <span></span>
            </li>
            <li>
                <span></span>
            </li>
            <li>
                <span></span>
            </li>
            <li>
                <span></span>
            </li>
            <li>
                <span></span>
            </li>
            <li>
                <span></span>
            </li>
            <li>
                <span></span>
            </li>
            <li>
                <span></span>
            </li>
        </ul>
        <div id="toast">Usuario dado de alta.</div>
        <div id="formularioLogin">            
            <form method="get" action="../Controller/loguearUsuario.php" id="contenedorFormularioLogin">
                <div class="cerrarFormularioLogin"></div>
                <div class="contenedorInput">
                    <input type="email" placeholder="usuario@usuario.com" name="emailUsuario" id="emailUsuario">
                    <div class="mensaje email">
                        <!--Ajax-->
                    </div>
                </div>
                <div class="contenedorInput">
                    <input type="password" placeholder="Contraseña" name="passUsuario" id="passUsuario">
                    <div class="mensaje password">
                        <!--Ajax-->
                    </div>
                </div>
                <input type="submit" class="botonLogin"/>
            </form>
        </div>
         <div id="formularioLoginMovil">            
            <form method="get" action="../Controller/loguearUsuario.php" id="contenedorFormularioLoginMovil">
                <div class="contenedorInput">
                    <input type="email" placeholder="usuario@usuario.com" name="emailUsuario">
                </div>
                <div class="contenedorInput">
                    <input type="password" placeholder="Contraseña" name="passUsuario">
                </div>                
                <input type="button" class="botonLoginMovil botonLoginMovilCerrar" value="Cerrar"/>
                <input type="submit" class="botonLoginMovil" value="Iniciar Sesión"/>
            </form>
        </div>
        <div id="formularioRegistro">            
            <div id="contenedorFormularioRegistro">
                <div class="cerrarFormularioRegistro"></div>
                <div class="contenedorInput primero">
                    <input type="email" placeholder="usuario@usuario.com" name="emailUsuarioRegistro" id="emailUsuarioRegistro">
                    <div class="mensaje emailRegistro">
                        <!--Ajax-->
                    </div>
                </div>
                <div class="contenedorInput primero">
                    <input type="text" placeholder="Nombre de usuario" name="nomUsuarioRegistro" id="nomUsuarioRegistro">
                    <div class="mensaje nombreRegistro">
                        <!--Ajax-->
                    </div>
                </div>
                <div class="contenedorInput primero">
                    <input type="password" placeholder="Contraseña" name="passUsuarioRegistro" id="passUsuarioRegistro">
                    <div class="mensaje passwordRegistro">
                        <!--Ajax-->
                    </div>
                </div>
                <div class="contenedorInput primero">
                    <input type="password" placeholder="Repetir Contraseña" name="passUsuarioRepetirRegistro" id="passUsuarioRepetirRegistro">
                    <div class="mensaje passwordRegistroRepetir">
                        <!--Ajax-->
                    </div>
                </div>
                 <div class="contenedorInput primero">
                    <input type="text" placeholder="Codigo postal" name="codigoPostal" id="codigoPostal">
                    <div class="mensaje codigoPostal">
                        <!--Ajax-->
                    </div>
                </div>
                <div class="contenedorInput primero">
                    <input type="text" placeholder="Fecha de nacieminto aaaa-mm-dd" name="datepicker" id="datepicker">
                    <div class="mensaje fechNacRegistro">
                        <!--Ajax-->
                    </div>
                </div> 
                <div class="mandarDatos"></div>    
            </div>
            <img id="loader" src="./View/img/loading.gif">
            </div>
            <div id="formularioRegistroMovil">            
                <form id="contenedorFormularioRegistroMovil" method="get" action="./Controller/registrarUsuario.php">
                    <div class="contenedorInput primero">
                        <input required type="email" placeholder="usuario@usuario.com" name="emailUsuarioRegistro" >

                    </div>
                    <div class="contenedorInput primero">
                        <input required type="text" placeholder="Nombre de usuario" name="nomUsuarioRegistro" >

                    </div>
                    <div class="contenedorInput primero">
                        <input required type="password" placeholder="Contraseña" name="passUsuarioRegistro" id="passUsuarioRegistro2">

                    </div>
                    <div class="contenedorInput primero">
                        <input required type="password" placeholder="Repetir Contraseña" name="passUsuarioRepetirRegistro" id="passUsuarioRepetirRegistro2">

                    </div>
                     <div class="contenedorInput primero">
                        <input required type="text" placeholder="Codigo postal" name="codigoPostal" id="codigoPostal2">

                    </div>
                    <div class="contenedorInput primero">
                        <input required type="text" placeholder="Fecha de nacieminto aaaa-mm-dd"  name="fechNac" id="datepicker2">
                    </div> 
                    <input type="hidden" name="localidad" value=""/>
                    <input type="hidden" name="provincia" value=""/>
                    <input type="hidden" name="movil" value=""/>
                    <input type="button" class="botonRegistroMovil botonRegistroMovilCerrar" value="Cerrar"/>
                    <input type="submit" class="botonRegistroMovil" value="Registrarse"/>
                </form>
            </div>            
        </div>
        <div id="explorarFormulario">
            <div class="cerrarExplorar"></div>
            <input type="text" id="searchBar" placeholder="         Pon tu deporte y encuentra tu evento...">
            <div class="contenedorTabla">
                <table id="explorarEventosTabla">
                    <tr class="cabeceraTabla">
                        <th>Deporte</th>
                        <th>Instalación</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Nivel</th>
                        <th>Plazas vacantes</th>
                    </tr>
                </table>
            </div>
        </div> 
        <div id="contenedorGoTeam">     
            <div class="cerrarGoTeam"></div>            
            <div id="goTeamAbout">
                <video id="video" src="./View/vid/video.webm" allowfullscreen  controls="true">
                    <source src="./View/vid/video.webm" type="video/webm">
                    <source src="./View/vid/video.mp4" type="video/mp4">
                    Tu explorador no soporta elementos de video.
                </video>
            </div>
        </div>
        <div id="principal">
            <div id="logoSlogan">
                <div id="logo">
                </div>
                <p id="slogan">
                    <span>Make</span> your team.<br>Make your <span>goals</span>.
                </p>
            </div>
            <div id="nav">
                <div id="socialMedia">
                    <?php
                        if(!isset($_SESSION['facebook'])&&!isset($_SESSION['emailUsuario'])){
                    ?>
                        <a id="facebook" href="<?php echo $helper->getLoginUrl($config['scopes']); ?>" title="Para loguearse debe estar registrado"></a>
                    <?php               
                        }
                     ?>
                </div>                
                <div id="contenedorEnlaces">
                    <?php
                        if(isset($_SESSION['emailUsuario'])||isset($_SESSION['facebook'])){
                    ?>
                        <a type="button" id="home" href="./View/indexUsuario.php">Home</a>
                        <a type="button" id="logout" href="./Controller/logout.php">Logout</a>  
                     <?php
                        } else {
                    ?>
                        <button type="button" id="login">Login</button>  
                        <button type="button" id="registrarse">Registrarse</button>
                     <?php
                        }
                    ?>                       
                    <button type="button" id="explorar">Explorar</button>
                    <button type="button" id="goTeam">GoTeam</button>
                </div>
            </div>
            <div id="cover">               
                <div id="more"> 
                    <span>+</span>
                </div>
                <div id="less" style="display: flex"> 
                    <span>-</span>
                </div>
            </div>
           <div class="abajo">
            <div id="informacion">
                <div id="deporte">
                    <div class="pasos"><p>1</p></div>
                    <h2>Encuentra tu <span>Deporte</span></h2>
                    <p>
                        Si amas es deporte, este sitio es perfecto para ti. En GoTeam ponemos a tu disposición una herramienta
                        con la que podrás elegir qué deporte quieres practicar, dónde y cuando. Entra a la comunidad y descubre.
                    </p>
                </div>
                <div id="equipo">
                    <div class="pasos"><p>2</p></div>
                    <h2>Completa tu <span>Equipo</span></h2>
                    <p>
                        Lo más difícil en la práctica del deporte colectivo es conseguir ponerse de acuerdo sobre el sitio y 
                        la hora. Con GoTeam podrás informar de tus eventos deportivos a todos los usuarios y 
                        completar los equipos. 
                    </p>
                </div>
                <div id="evento">
                    <div class="pasos"><p>3</p></div>
                    <h2>Disfruta tu <span>Evento</span></h2>
                    <p>
                        En GoTeam encontrarás eventos de cualquier tipo de deporte y nivel. Solo tienes que apuntarte. Aprovecha esta herramienta y atrévete a disfrutar
                        del deporte como no lo has hecho nunca!
                    </p>
                </div>
            </div>
            <footer>
                <div>
                    <a class="contacto facebook" href="https://www.facebook.com/eliana.ferioli?ref=bookmarks"></a>
                    <a class="contacto twitter" href="https://twitter.com/elianaferioli"></a>
                    <a class="contacto instagram" href="https://www.instagram.com/elianaferiolinunez/?hl=es"></a>
                    <a class="contacto linkedin" href="https://es.linkedin.com/in/eliana-mariel-ferioli-n%C3%BA%C3%B1ez-180540107?trk=prof-samename-name"></a>
                </div>
             </footer>
        </div>       
    </body>
</html>
<?php
 }
?>