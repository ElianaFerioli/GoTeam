<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">        
        <link rel="stylesheet" type="text/css" href="../View/css/estiloListadoAdministradorEvento.css">
        <link rel="stylesheet" type="text/css" href="../View/css/jquery-ui.css">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">
        <script src="../View/js/jquery-2.1.4.min.js"></script>
        <script src="../View/js/jquery-ui.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
        <script src="http://cdn.jsdelivr.net/jquery.validation/1.15.1/jquery.validate.min.js"></script>
        <script src="../View/js//funcionesListadoAdministradorEvento.js"></script>
        <!--<script src="../View/js/funciones.js"></script>-->
        <title></title>
    </head>
    <body>
        <div class="dialog">
            <div>¿Está seguro que quiere borrar este elemento?</div>
        </div>
        <div class="page-header container">
             <a href="../View/indexAdmin.php" class="btn btn-primary">Panel de Administración</a>
             <br>
            <h1>Administración de Evento</h1>      
        </div>
        <?php 
            if($insertar){
        ?>
        <div class="container">
            <h3>Insertar nuevo Evento</h3>
            <form action="../Controller/administracion.php" method="get" id="insertar">
                     <input type="hidden" name="insertar" value="insertarEvento">                     
                    <!-- <div class="main row"> -->
                        <select name="deporte" id="deporte" class="col-xs-12 col-sm-12 col-md-2">
                            <option value="" class="defecto" selected disabled>--Deporte--</option>
                            <?php
                               foreach($deporte as $de)  {  
                            ?>
                            <option  id="<?=$de->getCodDep()?>" value="<?= strtolower($de->getNomDep())?>"><?=$de->getNomDep()?></option>
                            <?php
                               }
                            ?>
                        </select>
                        <select name="instalacion" id="instalacion" class="col-xs-12 col-sm-12 col-md-2">
                            <!-- Se rellana con ajax-->
                        </select>                   
                        <select name="pista" id="pista" class="col-xs-12 col-sm-12 col-md-2">
                            <!--Se rellena con ajax-->
                        </select>
                        <select name="nivel" class="col-xs-12 col-sm-12 col-md-2" id="nivel">
                            <option value="" class="defecto" selected disabled>--Nivel--</option>
                            <option value="Principiante">Principiante</option>
                            <option value="Bajo">Bajo</option>
                            <option value="Medio">Medio</option>
                            <option value="Alto">Alto</option>
                            <option value="Profesional">Profesional</option>
                        </select>
                    <!-- </div> -->
                    <!-- <div class="main row">-->
                        <input type="text" placeholder="Fecha aaaa-mm-dd" name="datepicker" class="col-xs-12 col-sm-12 col-md-2" id="datepicker">
                        <input id="hora" type="text" placeholder="Hora del evento 00:00:00" name="hora" class="col-xs-12 col-sm-12 col-md-2 timepicker">
                        <input id="usuarios" type="number" placeholder="Usuarios faltantes" name="usuarios" class="col-xs-12 col-sm-12 col-md-2" min="1">
                        <input type="submit" value="Insertar evento" class="btn btn-success col-xs-12 col-sm-12 col-md-2" id="insertarEvento">
                    <!-- </div>-->
            </form>
        </div>
        <form class="container" id="formularioModificar">  
                      <!--  <div>-->
                            <select name="deporte" class="col-xs-12 col-sm-12 col-md-2 deporte">
                                <option  name="1" value="football">Football</option>
                                <option  name="2" value="baloncesto">Baloncesto</option>
                                <option  name="3" value="tenis">Tenis</option>
                                <option  name="4" value="paddle">Paddle</option>
                                <option  name="5" value="volleyball">Volleyball</option>
                                <option  name="6" value="rugby">Rugby</option>
                                <option  name="7" value="running">Running</option>
                                <option  name="8" value="baseball">Baseball</option>
                                <option  name="9" value="ciclismo">Ciclismo</option>
                                <option  name="10" value="golf">Golf</option>
                                <option  name="11" value="hockey hielo">Hockey Hielo</option>
                                <option  name="12" value="hockey césped">Hockey Césped</option>
                                <option  name="13" value="hockey patines">Hockey Patines</option>
                                <option  name="14" value="paintball">Paintball</option>
                                <option  name="15" value="squash">Squash</option>
                                <option  name="16" value="surf">Surf</option>
                                <option  name="17" value="senderismo">Senderismo</option>
                                <option  name="18" value="softball">Softball</option>
                                <option  name="19" value="waterpolo">Waterpolo</option>
                            </select>
                            <select name="instalacion" class="col-xs-12 col-sm-12 col-md-2 instalacion">
                               <option selected disabled class="defecto">--Instalación--</option>
                            </select>
                            <select name="pista" class="col-xs-12 col-sm-12 col-md-2 pista">
                                <option selected disabled class="defecto">--Pista--</option>
                                <!--Se rellena con ajax-->
                            </select>
                            <select name="nivel" class="col-xs-12 col-sm-12 col-md-2 nivel">
                                <option name="Principiante" value="Principiante">Principiante</option>
                                <option name="Bajo" value="Bajo">Bajo</option>
                                <option name="Medio" value="Medio">Medio</option>
                                <option name="Alto" value="Alto">Alto</option>
                                <option name="Profesional" value="Profesional">Profesional</option>
                            </select>
                       <!-- </div>
                        <div>-->
                            <input type="text" placeholder="Fecha aaaa-mm-dd" name="datepicker"  class="col-xs-12 col-sm-12 col-md-2 fechEven datepicker"> 
                            <input type="text" placeholder="Hora del evento 00:00:00" name="hora" class="col-xs-12 col-sm-12 col-md-2 horaEven">
                            <input type="number" placeholder="Usuarios faltantes" name="usuarios"  class="col-xs-12 col-sm-12 col-md-2 usuariosFaltantes">
            
                        <!--</div>-->
            </form>
            <?php 
            }
            ?>
        <div class="row">
            <div class="col-xs-12">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <td colspan="6"id="paginacion">
                                Paginación 
                                <span></span>
                            </td>
                            <td colspan="2">
                                Número de eventos:
                                <input type="number" id="numeroEventos" min="5" placeholder="Todos los eventos">
                            </td>
                            <td class="row">
                                <button id="anterior" class="col-xs-5" name="0" disabled>Anterior</button>
                                <div class="col-xs-1"></div>
                                <button id="siguiente" class="col-xs-5" name="1" disabled>Siguiente</button>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <th id="tablaInstalacion">Intalación</th>
                            <th id="tablaPista">Pista</th>
                            <th id="tablaFecha">Fecha</th>
                            <th id="tablaHora">Hora</th>
                            <th id="tablaNivel">Nivel</th>
                            <th id="tablaUsuarios">Usuarios faltantes</th>
                            <th id="tablaEstado">Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="contenidoTabla">
                        <?php
                            $x = 0;
                            foreach($data[$tabla] as $ev)  {                
                        ?>
                           <tr name="<?=$ev->getCodEven()?>">
                               <td class="sprite deporte<?=Pista::getDeportePorPista($ev->getCodPista())?>"></td>
                                <td><?php echo $insta[$x];?></td>
                                <td><?php echo $pista[$x];?></td>
                                <td><?=$ev->getFechEven()?></td>
                                <td><?=$ev->getHoraEven()?></td>
                                <td><?=$ev->getNivelEven()?></td>
                                <td><?=$ev->getUsuariosFaltantes()?></td>
                                <td><?php
                                        if(($ev->getCerrado()==0)&&($ev->getUsuariosFaltantes()!=0)){
                                            echo "Abierto";
                                        } else if(($ev->getCerrado()==1)||($ev->getUsuariosFaltantes()==0)) {
                                            echo "Cerrado";
                                        }
                                    ?>
                                </td>
                                <td class="row">
                                    <div name="<?=$ev->getCodEven()?>" class="btn btn-warning col-xs-5 openerModificar">Modificar</div>
                                    <div class="col-xs-1"></div>
                                    <div name="<?=$ev->getCodEven()?>" class="btn btn-danger col-xs-5 opener">Borrar</div>
                                </td>
                            </tr> 
                        <?php
                            $x++;
                            }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>
</html>


