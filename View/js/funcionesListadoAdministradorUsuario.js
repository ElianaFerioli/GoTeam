/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    var forma;
    var contadorCodigo = 0;
    var contadorNombre = 0;
    var contadorFecha = 0;
    var contadorEmail = 0;
    var contadorProvincia = 0;
    var contadorLocalidad = 0;
    $("#tablaCodigo").click(function(){
        contadorCodigo++;
        if((contadorCodigo%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
        $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "ordenarPor=codUs&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        cadena =  cadena + "<tr><td>" + output[i]['codUs'] + "</td><td>" + output[i]['nomUs'] + 
                                "</td><td>" + output[i]['fechNac'] + "</td><td>" + output[i]['emailUs'] + 
                                "</td><td>" + output[i]['provUs'] + "</td><td>" + output[i]['localUs'] + 
                                "</td>" + "<td class=\"row\"><a href=\"../Controller/administracion.php?modificacionUsuario=" + output[i]['codUs'] + "&tabla=USUARIO\" class=\"btn btn-warning col-xs-4\">Modificar</a>"
                                + "<a href=\"../Controller/administracion.php?borradoUsuario=" + output[i]['codUs'] + "\"  class=\"btn btn-danger col-xs-4\">Borrar</a></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                }
            });
    });
    $("#tablaNombre").click(function(){
        contadorNombre++;
        if((contadorNombre%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
       $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "ordenarPor=nomUs&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        cadena =  cadena + "<tr><td>" + output[i]['codUs'] + "</td><td>" + output[i]['nomUs'] + 
                                "</td><td>" + output[i]['fechNac'] + "</td><td>" + output[i]['emailUs'] + 
                                "</td><td>" + output[i]['provUs'] + "</td><td>" + output[i]['localUs'] + 
                                "</td>" + "<td class=\"row\"><a href=\"../Controller/administracion.php?modificacionUsuario=" + output[i]['codUs'] + "&tabla=USUARIO\" class=\"btn btn-warning col-xs-4\">Modificar</a>"
                                + "<a href=\"../Controller/administracion.php?borradoUsuario=" + output[i]['codUs'] + "\"  class=\"btn btn-danger col-xs-4\">Borrar</a></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                }
            });
    });
    $("#tablaFechNac").click(function(){
        contadorFecha++;
        if((contadorFecha%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
       $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "ordenarPor=FechNac&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        cadena =  cadena + "<tr><td>" + output[i]['codUs'] + "</td><td>" + output[i]['nomUs'] + 
                                "</td><td>" + output[i]['fechNac'] + "</td><td>" + output[i]['emailUs'] + 
                                "</td><td>" + output[i]['provUs'] + "</td><td>" + output[i]['localUs'] + 
                                "</td>" + "<td class=\"row\"><a href=\"../Controller/administracion.php?modificacionUsuario=" + output[i]['codUs'] + "&tabla=USUARIO\" class=\"btn btn-warning col-xs-4\">Modificar</a>"
                                + "<a href=\"../Controller/administracion.php?borradoUsuario=" + output[i]['codUs'] + "\"  class=\"btn btn-danger col-xs-4\">Borrar</a></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                }
            });
    });
    $("#tablaEmail").click(function(){
        contadorEmail++;
        if((contadorEmail%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
       $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "ordenarPor=EmailUs&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        cadena =  cadena + "<tr><td>" + output[i]['codUs'] + "</td><td>" + output[i]['nomUs'] + 
                                "</td><td>" + output[i]['fechNac'] + "</td><td>" + output[i]['emailUs'] + 
                                "</td><td>" + output[i]['provUs'] + "</td><td>" + output[i]['localUs'] + 
                                "</td>" + "<td class=\"row\"><a href=\"../Controller/administracion.php?modificacionUsuario=" + output[i]['codUs'] + "&tabla=USUARIO\" class=\"btn btn-warning col-xs-4\">Modificar</a>"
                                + "<a href=\"../Controller/administracion.php?borradoUsuario=" + output[i]['codUs'] + "\"  class=\"btn btn-danger col-xs-4\">Borrar</a></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                }
            });
    });
    $("#tablaProvincia").click(function(){
        contadorProvincia++;
        if((contadorProvincia%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
       $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "ordenarPor=ProvUs&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        cadena =  cadena + "<tr><td>" + output[i]['codUs'] + "</td><td>" + output[i]['nomUs'] + 
                                "</td><td>" + output[i]['fechNac'] + "</td><td>" + output[i]['emailUs'] + 
                                "</td><td>" + output[i]['provUs'] + "</td><td>" + output[i]['localUs'] + 
                                "</td>" + "<td class=\"row\"><a href=\"../Controller/administracion.php?modificacionUsuario=" + output[i]['codUs'] + "&tabla=USUARIO\" class=\"btn btn-warning col-xs-4\">Modificar</a>"
                                + "<a href=\"../Controller/administracion.php?borradoUsuario=" + output[i]['codUs'] + "\"  class=\"btn btn-danger col-xs-4\">Borrar</a></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                }
            });
    });
    $("#tablaLocalidad").click(function(){
        contadorLocalidad++;
        if((contadorLocalidad%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
       $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "ordenarPor=LocaUs&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        cadena =  cadena + "<tr><td>" + output[i]['codUs'] + "</td><td>" + output[i]['nomUs'] + 
                                "</td><td>" + output[i]['fechNac'] + "</td><td>" + output[i]['emailUs'] + 
                                "</td><td>" + output[i]['provUs'] + "</td><td>" + output[i]['localUs'] + 
                                "</td>" + "<td class=\"row\"><a href=\"../Controller/administracion.php?modificacionUsuario=" + output[i]['codUs'] + "&tabla=USUARIO\" class=\"btn btn-warning col-xs-4\">Modificar</a>"
                                + "<a href=\"../Controller/administracion.php?borradoUsuario=" + output[i]['codUs'] + "\"  class=\"btn btn-danger col-xs-4\">Borrar</a></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                }
            });
    });
});
