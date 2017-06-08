<?php    
    session_start();
    if(!isset($_SESSION['emailUsuario'])&&!isset($_SESSION['facebook'])){
        header('Location: ../index.php');
    } else {   
        require_once '../Model/Usuario.php';
        $usuario = Usuario::getUsuario("EmailUs", $_SESSION['emailUsuario']);
        require_once '../Model/Deporte.php';
        $deportes = Deporte::getDeportes();
        require_once '../Model/Participacion.php';
        $codUs = $usuario->getCodUs();
        $participacion = Participacion::getParticipacion($codUs);
        $participacionAbierta = Participacion::getParticipacionAbiertaPorFecha($codUs);
        require_once '../Model/Evento.php';
        //Getsiona la foto de usuario
        $fotoUs = "../View/img/defecto.png";
        if(strpos($usuario->getFotoUs(), 'defecto.png') === 0){
            if(isset($_SESSION['idFacebook'])){
                $fotoUs = "https://graph.facebook.com/".$_SESSION['idFacebook']."/picture?type=square&w%E2%80%8Cidth=500&height=500";
            } else {
                $fotoUs = "../img/defecto.png";
            }
        } else {
            if(strpos($usuario->getFotoUs(), '.png') == false){
                if(strpos($usuario->getFotoUs(), '.jpg') == false){
                    $fotoUs = "../../View/img/uploads/".$usuario->getFotoUs().".jpg";
                } else {
                    $fotoUs = "../../View/img/uploads/".$usuario->getFotoUs();
                }
            } else {
                $fotoUs = "../../View/img/uploads/".$usuario->getFotoUs();
            }
        }
?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>GoTeam</title>
        <link rel="icon" href="../View/img/logo.png">
        <script src="../View/js/jquery-2.1.4.min.js"></script>
        <script src="../View/js/jquery-ui.min.js"></script>
        <script src="../View/js/funcionesIndexUsuario.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
        <script src="../View/js/markerclusterer.js"></script>
        <script src="../View/js/maps.js"></script>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDsgQz0wL8zo8FHX0tFIVs-ffxANoxPNSA &callback=initMap"></script>
        <link rel="stylesheet" type="text/css" href="../View/css/jquery-ui.css">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">
        <link href="../View/css/uploadcss/style.css" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="../View/css/estiloIndexUsuario.css">
        <meta name="viewport" content="width=device-width, height=device-height; initial-scale=1.0; maximum-scale=1.0;"> 
        <style>
            #map {
               height: 90%;
            }
            #deporte, #instalacion, #pista, #nivel, #datepicker, #hora, #usuarios, #insertarEvento{
                padding: 0 !important;
                width: 15%;
            }
            #deporte *, #instalacion *, #pista *, #nivel *{
                background-color: rgba(0,0,0, 0.5);
                color: white;
            }
            .creaEventos{
                height: 350px;
            }
            
        </style>
    </head>
    <body>
        <header>    
            <a id="logoHeader" href="../index.php"></a>
            <a id="nombreUsuario" href="../View/indexUsuario.php"><?php echo $usuario->getNomUs() ?></a>
            <div class="relleno">
                
            </div>
            <div id="nav">
                <a href="../Controller/logout.php">Logout</a>
                <a href="#perfilUsuario">Perfil</a>
                <a href="#crear">Crear evento</a>
                <a href="#eventosCercanos">Mapa</a>
            </div>
        </header>
        <div id="crear">
            
        </div>
        <div class="creaEventos">
            <div class="creaEventosCabecera">
                <span>Crea tus eventos</span>
            </div>
            <div class="creaEventosBody">   
                <div class="container">
                    <select name="deporte" id="deporte">
                        <option value="" class="defecto" selected disabled>--Deporte--</option>
                        <?php
                            foreach($deportes as $de)  {  
                        ?>
                                <option  id="<?=$de->getCodDep()?>" value="<?= strtolower($de->getNomDep())?>"><?=$de->getNomDep()?></option>
                        <?php
                            }
                        ?>
                    </select>
                    <select name="instalacion" id="instalacion">
                        <!-- Se rellana con ajax-->
                    </select>                   
                    <select name="pista" id="pista">
                        <!--Se rellena con ajax-->
                    </select>
                </div>
                <div class="container">
                    <select name="nivel" id="nivel">
                        <option value="" class="defecto" selected disabled>--Nivel--</option>
                        <option value="Principiante">Principiante</option>
                        <option value="Bajo">Bajo</option>
                        <option value="Medio">Medio</option>
                        <option value="Alto">Alto</option>
                        <option value="Profesional">Profesional</option>
                    </select>
                    <input type="text" placeholder="Fecha aaaa-mm-dd" name="datepicker"  id="datepicker">
                    <input id="hora" type="text" placeholder="Hora" name="hora" class="timepicker">
                </div>
                <div class="container">
                    <input id="usuarios" type="number" placeholder="Usuarios faltantes" name="usuarios"  min="1">
                </div>
                <input id="codUs" type="hidden" name="<?=$codUs?>">
                <div class="container">
                    <button id="insertarEvento">Insertar Evento</button>
                </div>
            </div>
            <div class="iconos">
                <div class="iconoDeporte icon1"></div>
                <div class="iconoDeporte icon2"></div>
                <div class="iconoDeporte icon3"></div>
                <div class="iconoDeporte icon4"></div>
            </div>
        </div>        
        <div class="eventosAbiertos">
            <div class="eventosAbiertosCabecera">
                <span>Próximos Eventos</span>
            </div>
            <div class="dialogEliminarEvento">
                <div>¿Está seguro que quiere borrar este elemento?</div>
            </div>
            <div class="eventosAbiertosBody">                
            <?php
                    foreach($participacionAbierta as $par){
            ?>
                    <div class="participacionAbiertaEventos" name="<?php echo $par?>">
                        
                    </div>
            <?php   
                }
            ?>
            </div>
        </div>
        <div class="deportes">
            <div class="deportesCabecera">
                <span>Gestiona tus preferencias</span>
            </div>
            <div class="deportesBody">                
                <?php
                    foreach($deportes as $dep){
                ?>
                    <div class="deporte deporte<?php echo $dep->getCodDep()?>" name="<?php echo $dep->getCodDep()?>">
                        <span class="favorite"></span>
                    </div>
                <?php   
                    }
                ?>
            </div>
        </div>
        <div id="perfilUsuario">            
        </div>
        <div class="perfil">
            <div class="perfilCabecera">
                <span>Perfil de Usuario</span>
            </div>
            <div class="perfilBody"> 
                <div class="fotoContainer" style="background-image: url('<?php echo $fotoUs?>')" title="Modificar Imagen">
                    <div class="contendorSpanEditarFoto">
                        <span class="editarFoto opener"></span>
                    </div>
                </div>
                <div id="dialog-form" title="Subir Archivo">
                    <form id="upload" method="post" action="../Controller/upload/upload.php" enctype="multipart/form-data">
                        <div id="drop">
                            <a>Examinar</a>
                            <input type="file" name="upl" multiple />
                        </div>
                        <ul>
                            <!-- The file uploads will be shown here -->
                        </ul>
                    </form>
                </div>
                <div class="datosUsuario">
                    <div>
                        <div>
                            <span class="ballicon"></span>
                            <span id="nombreDeUsuario" class="datos"><?php echo $usuario->getNomUs()?></span>
                            <input type="text" class="nombreDeUsuario" value="<?php echo $usuario->getNomUs()?>">
                        </div>
                        <div>
                            <span class="ballicon"></span>
                            <span id="fechaNacimiento"class="datos"><?php echo $usuario->getFechNac()?></span>
                            <input type="text" class="datepickerUsuario" value="<?php echo $usuario->getFechNac()?>">
                        </div>
                        <div>
                            <span class="ballicon"></span>
                            <span id="lugarUsuario" class="datos"><span class="localidad"><?php echo $usuario->getLocalUs()?></span>,<span class="provincia"> <?php echo $usuario->getProvUs()?></span></span>
                            <input type="text" value="" class="lugarUsuario" placeholder="Codigo Postal">
                        </div>
                        <span style="display:none" id="localidad"><?php echo $usuario->getLocalUs()?></span>
                    </div>
                    <div>
                        <p class="datos" id="descripcionUsuario"><i><?php echo $usuario->getDescUs()?></i></p>
                        <textarea rows="4" class="descripcionUsuario" cols="50"><?php echo $usuario->getDescUs()?></textarea>
                    </div>
                    <button class="modificarDatos ">Modificar datos</button>
                </div>                
            </div>
        </div>        
        <div class="eventos">
            <div class="eventosCabecera">
                <span>Historial de Participaciones</span>
            </div>
            <div class="eventosBody">                
                <?php
                    foreach($participacion as $par){
                ?>
                    <div class="participacionEventos" name="<?php echo $par?>">
                        
                    </div>
                <?php   
                    }
                ?>
            </div>
        </div>
        <div id="eventosCercanos">
            
        </div>
        <div class="tablaEventosCercanos"></div>
        <div class="eventosCeracanos">            
            <div class="eventosCercanosCabecera">
                <span>Mapa de Eventos Cercanos</span>
            </div>           
            <div class="eventosCercanosBody" id="map">                
                
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
        <audio id="audio" src="../View/sound/wet.mp3" controls="false" autostart="0">
                    <source src="../View/sound/wet.mp3" type="audio/mp3">
                    <source src="../View/sound/wet.ogg" type="audio/ogg">
                    Tu explorador no soporta elementos de audio.
       </audio>
        <audio id="audio2" src="../View/sound/capisci.mp3" controls="false" autostart="0">
                    <source src="../View/sound/capisci.mp3" type="audio/mp3">
                    <source src="../View/sound/capisci.ogg" type="audio/ogg">
                    Tu explorador no soporta elementos de audio.
       </audio>
        <script src="../View/js/uploadfunciones/jquery.knob.js"></script>
        <script src="../View/js/uploadfunciones/jquery.ui.widget.js"></script>
	<script src="../View/js/uploadfunciones/jquery.iframe-transport.js"></script>
	<script src="../View/js/uploadfunciones/jquery.fileupload.js"></script>
	<script src="../View/js/uploadfunciones/script.js"></script>
        <script src="http://cdn.tutorialzine.com/misc/enhance/v1.js" async></script>       
    </body>
</html>
<?php
    }
?>