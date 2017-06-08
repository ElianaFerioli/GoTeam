<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">        
        <link rel="stylesheet" type="text/css" href="../View/css/estiloListadoAdministradorUsuario.css">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <title></title>
        <script src="../View/js/jquery-2.1.4.min.js"></script>
        <script src="../View/js/funcionesListadoAdministradorUsuario.js"></script>
    </head>
    <body>
        <div class="page-header container">
            <a href="../View/indexAdmin.php" class="btn btn-primary">Panel de Administración</a>
            <br>
            <h1>Administración de Usuarios</h1>              
        </div>
             <?php
                if(!$insertar){                
             ?>
             <div class="container">
                <form action="../Controller/administracion.php" method="get" name="modificar">
                    <div class="main row">
                       <input type="hidden" name="modificar" value="modificarUsuario">
                       <input type="hidden" name="codUs" value="<?= $usmod->getCodUs() ?>">
                       <h3 class="col-xs-12 col-sm-8 col-md-9 col-lg-9">Modificar usuario <span class="nombre"><?= $usmod->getNomUs() ?></span></h3>
                    </div>
                    <div class="main row">
                       <input type="text" value="<?= $usmod->getNomUs() ?>" name="nomUs" class="customInput col-xs-12 col-sm-3">
                       <input type="text" value="<?= $usmod->getPassUs() ?>" name="passUs" class="customInput col-xs-12 col-sm-3">
                       <input type="text" value="<?= $usmod->getEmailUs() ?>" name="emailUs" class="customInput col-xs-12 col-sm-3">
                    </div>
                    <div class="main row">
                       <input type="text" value="<?= $usmod->getFechNac() ?>" name="fechNac" class="customInput col-xs-12 col-sm-3">
                       <input type="text" value="<?= $usmod->getProvUs() ?>" name="provUs" class="customInput col-xs-12 col-sm-3"> 
                       <input type="text" value="<?= $usmod->getLocalUs() ?>" name="localUs" class="customInput col-xs-12 col-sm-3">
                       <button type="submit" class="btn btn-info col-xs-12 col-sm-2" id="modificarUsuario">Modificar Usuario</button>
                    </div>
                </form>
             </div>
        <?php 
                } else {
        ?>
        <div class="container">
            <form action="../Controller/administracion.php" method="get" name="insertar">
                    <div class="main row">
                        <input type="hidden" name="insertar" value="insertarUsuario">
                        <h3 class="col-xs-12 col-sm-8 col-md-9 col-lg-9">Insertar nuevo Usuario</h3>
                    </div>
                    <!--Dado a que el formulario es pequeño, se establecen los valores de las columnas para dispositivos móviles
                    respetando el principio de mobile-first. No obstante, si la pantalla es más grande se segirán respetando los
                    valores del sm-->
                    <div class="main row">
                        <input type="text" placeholder="Nombre" name="nomUs" class="customInput col-xs-12 col-sm-3">
                        <input type="password" placeholder="Contraseña" name="passUs" class="customInput col-xs-12 col-sm-3">
                        <input type="text" placeholder="Email" name="emailUs" class="customInput col-xs-12 col-sm-3">
                    </div>
                    <div class="main row">
                        <input type="text" placeholder="Nacimiento aa-mm-dd" name="fechNac" class="customInput col-xs-12 col-sm-3">
                        <input type="text" placeholder="Provincia" name="provUs" class="customInput col-xs-12 col-sm-3">
                        <input type="text" placeholder="Localidad" name="localUs" class="customInput col-xs-12 col-sm-3">
                        <button type="submit" class="btn btn-success col-xs-12 col-sm-2" id="insertarUsuario">Insertar Usuario</button>
                    </div>
                </form>
        </div>
            <?php
                }
            ?>
            <!--Dado a que el tamaño de la tabla es demasiado grande, se respeta el principio de mobilefirst de bootstrap,
            y se tomará el valor de 12-col-xs como defecto. Por eso no se determina ningun otro valor en la tabla. No existe una 
            distribución mejor para tantas columnas-->
             <table class="table table-hover">
                <thead>
                    <tr id="cabecera">
                        <th id="tablaCodigo">Codigo</th>
                        <th id="tablaNombre">Nombre</th>
                        <th id="tablaFechNac">Fecha de nacimiento</th>
                        <th id="tablaEmail">Email</th>
                        <th id="tablaProvincia">Provincia</th>
                        <th id="tablaLocalidad">Localidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="contenidoTabla">
            <?php
                foreach($data[$tabla] as $us)  {             
            ?>
               <tr>
                   <td><?=$us->getCodUs()?></td>
                    <td><?=$us->getNomUs()?></td>
                    <td><?=$us->getFechNac()?></td>
                    <td><?=$us->getEmailUs()?></td>
                    <td><?=$us->getProvUs()?></td>
                    <td><?=$us->getLocalUs()?></td>
                    <td class="row">
                        <a href="../Controller/administracion.php?modificacionUsuario=<?=$us->getCodUs()?>&tabla=USUARIO" class="btn btn-warning col-xs-4">Modificar</a>
                        <a href="../Controller/administracion.php?borradoUsuario=<?=$us->getCodUs()?>"  class="btn btn-danger col-xs-4">Borrar</a>
                    </td>
                </tr>
            <?php
              }
            ?>
                </tbody>
            </table>
        <script src="http://code.jquery.com/jquery-latest.js"></script>	
        <script src="http://code.jquery.com/jquery-latest.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </body>
</html>
