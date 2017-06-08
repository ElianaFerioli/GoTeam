/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    var forma;
    var contadorInstalacion = 0;
    var contadorPista = 0;
    var contadorFecha = 0;
    var contadorHora = 0;
    var contadorNivel = 0;
    var contadorUsuarios = 0;
    var contadorEstado = 0;
    var paginasTotales = 0;
    var paginaElegida = 0;
    
    ///////función del change en el input que recoge el número de paginacion////
    $("#numeroEventos").change(function(){
        eventosPaginados();
    });      
    ////////////////////////fin del change del input de la paginacion///////////
    //
    //
    //////////////////////Función que muestra los eventos paginados/////////////
    function eventosPaginados(){    
        $("#anterior").attr("name", 0);
        $("#siguiente").attr("name", 1);
        var numeroEventosTotales;
        $.ajax({
            async: false,
            url: "../Controller/administracion.php",
            method: "GET",
            data: "eventoOrdenarPor=CodEven&forma=ASC",
            success: function(result){
                var output = jQuery.parseJSON(result);
                numeroEventosTotales = output.length;
            }                 
        });
        var numeroEventosPaginados;
        if(!$("#numeroEventos").val()){
            numeroEventosPaginados = numeroEventosTotales;
        } else {
            numeroEventosPaginados = $("#numeroEventos").val();
        }
        var numeroPaginas = parseInt(numeroEventosTotales/numeroEventosPaginados);        
        if((numeroEventosTotales%numeroEventosPaginados)>0){
            numeroPaginas++;
        }
        paginasTotales = numeroPaginas;
        $("#paginacion span").text("1/" + numeroPaginas);
        $("#numeroEventos").attr("max", numeroEventosTotales); 
        //Remueve las clases de paginacion que existan
        $("tbody tr").removeClass();
        for(var x = 0; x <= numeroEventosTotales; x++){            
            var i = parseInt(x/(numeroEventosPaginados));
            $("tbody tr:nth-child(" + (x+1) + ")").addClass("pagina" + i);
        }
        $("tbody tr").hide();
        if(paginaElegida == 0){
            $(".pagina0").show();
        } else {
            $(".pagina" + paginaElegida).show();
            $("#siguiente").attr("name", paginaElegida + 1);
            $("#anterior").attr("name", paginaElegida -1);
            $("#paginacion span").text(paginaElegida + "/" + paginasTotales);
        }        
        //habilito el boton de siguiente
        $("#siguiente").attr("disabled", false);
    }
    //////////////////////fin de la función de paginacion///////////////////////
    //
    //
    //
    /////////////////////función del click en siguiente/////////////////////////
    $("#siguiente").click(function(){
        //me fijo qué página hay que mostrar
        var pagina = $("#siguiente").attr("name");
        //deshabilito el botón siguiente si es la última página
        if((parseInt(pagina)+1)==paginasTotales){
            $("#siguiente").attr("disabled", true);
        }
        //habilito el boton de anterior
        if((parseInt(pagina)+1)==2){
            $("#anterior").attr("disabled", false);
        }
        //cambio el título de la paginacion
        $("#paginacion span").text((parseInt(pagina)+1) + "/" + paginasTotales);
        //le cambio el nombre para la proxima pagina
        $("#siguiente").attr("name", (parseInt(pagina)+1));
        $("#anterior").attr("name", pagina);
        //escondo todo el contenido de la tabla y muestro solo lo que hay que mostrar
        $("tbody tr").hide();
        $(".pagina" + pagina).show();
    });
    /////////////////////////fin funcion click en siguiente/////////////////////
    //
    //
    ////////////////////////función del click en anterior///////////////////////
    $("#anterior").click(function(){
        //me fijo qué página hay que mostrar
        var pagina = $("#anterior").attr("name");
        //deshabilito el botón anterior si es la primera página
        if((parseInt(pagina)-1)==0){
            $("#anterior").attr("disabled", true);
        }
        //habilito el boton siguiente si es la anteultima pagina
        if(pagina==(paginasTotales-1)){
            $("#siguiente").attr("disabled", false);
        }
        //cambio el título de la paginacion
        $("#paginacion span").text(pagina + "/" + paginasTotales);
        //le cambio el nombre para la proxima pagina
        $("#siguiente").attr("name", pagina);
        $("#anterior").attr("name", (parseInt(pagina)-1));
        //escondo todo el contenido de la tabla y muestro solo lo que hay que mostrar
        $("tbody tr").hide();
        $(".pagina" + (parseInt(pagina)-1)).show();
    });    
    ////////////////////////fin de función en click de anterior/////////////////
    //
    //
    //
    //////////////////////Funcion que ordena por instalación////////////////////
    $("#tablaInstalacion").click(function(){
        //deja la paginación en 0
        $("#anterior").attr("disabled", true);
        $("#siguiente").attr("disabled", true);
        $("#paginacion span").text("");
        $("#numeroEventos").val("");
        //Ordenación
        contadorInstalacion++;
        if((contadorInstalacion%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
        $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "eventoOrdenarPor=I.NomInst&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        var cer = "";
                         if(output[i]['cerrado'] == 0){
                            cer = "Abierto";
                        } else {
                            cer = "Cerrado";
                        }
                        cadena =  cadena + "<tr name=\"" + output[i]['codEven'] + "\"><td class=\"sprite deporte" + output[i]['codDep'] + "\"></td><td>" + output[i]['nomInst'] + 
                                "</td><td>" + output[i]['nomPist'] + "</td><td>" + output[i]['fechEven'] + 
                                "</td><td>" + output[i]['horaEven'] + "</td><td>" + output[i]['nivelEven'] + 
                                "</td><td>" + output[i]['usuariosFaltantes'] + "</td><td>" + cer + 
                                "</td>" + "<td class=\"row\"><div name=\"" + output[i]['codEven'] + "\" class=\"btn btn-warning col-xs-5 openerModificar\">Modificar</div>"
                                + "<div class=\"col-xs-1\"></div>"
                                + "<div name=\"" + output[i]['codEven'] + "\"  class=\"btn btn-danger col-xs-5 opener\">Borrar</div></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                    //Función que coloca los listeners de los click a los nuevos botones
                    colocaListeners();
                }
            });
    });
    ///////////////fin de funcion que ordena por instalación////////////////////
    //
    //
    ///////////////funcion que ordena por pista/////////////////////////////////
     $("#tablaPista").click(function(){
        //deja la paginación en 0
        $("#anterior").attr("disabled", true);
        $("#siguiente").attr("disabled", true);
        $("#paginacion span").text("");
        $("#numeroEventos").val("");
        //Ordenación
        contadorPista++;
        if((contadorPista%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
        $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "eventoOrdenarPor=P.NomPist&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        var cer = "";
                         if(output[i]['cerrado'] == 0){
                            cer = "Abierto";
                        } else {
                            cer = "Cerrado";
                        }
                        cadena =  cadena + "<tr name=\"" + output[i]['codEven'] + "\"><td class=\"sprite deporte" + output[i]['codDep'] + "\"></td><td>" + output[i]['nomInst'] + 
                                "</td><td>" + output[i]['nomPist'] + "</td><td>" + output[i]['fechEven'] + 
                                "</td><td>" + output[i]['horaEven'] + "</td><td>" + output[i]['nivelEven'] + 
                                "</td><td>" + output[i]['usuariosFaltantes'] + "</td><td>" + cer + 
                                "</td>" + "<td class=\"row\"><div name=\"" + output[i]['codEven'] + "\" class=\"btn btn-warning col-xs-5 openerModificar\">Modificar</div>"
                                + "<div class=\"col-xs-1\"></div>"
                                + "<div name=\"" + output[i]['codEven'] + "\"  class=\"btn btn-danger col-xs-5 opener\">Borrar</div></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                    //Función que coloca los listeners de los click a los nuevos botones
                    colocaListeners();
                }
            });
    });
    ///////////////fin de funcion que ordena por pista//////////////////////////
    //
    //
    ///////////////funcion que ordena por fecha/////////////////////////////////
    $("#tablaFecha").click(function(){
        //deja la paginación en 0
        $("#anterior").attr("disabled", true);
        $("#siguiente").attr("disabled", true);
        $("#paginacion span").text("");
        $("#numeroEventos").val("");
        //Ordenación
        contadorFecha++;
        if((contadorFecha%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
        $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "eventoOrdenarPor=E.FechEven&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        var cer = "";
                         if(output[i]['cerrado'] == 0){
                            cer = "Abierto";
                        } else {
                            cer = "Cerrado";
                        }
                        cadena =  cadena + "<tr name=\"" + output[i]['codEven'] + "\"><td class=\"sprite deporte" + output[i]['codDep'] + "\"></td><td>" + output[i]['nomInst'] + 
                                "</td><td>" + output[i]['nomPist'] + "</td><td>" + output[i]['fechEven'] + 
                                "</td><td>" + output[i]['horaEven'] + "</td><td>" + output[i]['nivelEven'] + 
                                "</td><td>" + output[i]['usuariosFaltantes'] + "</td><td>" + cer + 
                                "</td>" + "<td class=\"row\"><div name=\"" + output[i]['codEven'] + "\" class=\"btn btn-warning col-xs-5 openerModificar\">Modificar</div>"
                                + "<div class=\"col-xs-1\"></div>"
                                + "<div name=\"" + output[i]['codEven'] + "\"  class=\"btn btn-danger col-xs-5 opener\">Borrar</div></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                    //Función que coloca los listeners de los click a los nuevos botones
                    colocaListeners();
                }
            });
    });
    ///////////////fin de funcion que ordena por fecha//////////////////////////
    //
    //
    ///////////////funcion que ordena por hora//////////////////////////////////
    $("#tablaHora").click(function(){
        //deja la paginación en 0
        $("#anterior").attr("disabled", true);
        $("#siguiente").attr("disabled", true);
        $("#paginacion span").text("");
        $("#numeroEventos").val("");
        //Ordenación
        contadorHora++;
        if((contadorHora%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
        $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "eventoOrdenarPor=E.HoraEven&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        var cer = "";
                         if(output[i]['cerrado'] == 0){
                            cer = "Abierto";
                        } else {
                            cer = "Cerrado";
                        }
                        cadena =  cadena + "<tr name=\"" + output[i]['codEven'] + "\"><td class=\"sprite deporte" + output[i]['codDep'] + "\"></td><td>" + output[i]['nomInst'] + 
                                "</td><td>" + output[i]['nomPist'] + "</td><td>" + output[i]['fechEven'] + 
                                "</td><td>" + output[i]['horaEven'] + "</td><td>" + output[i]['nivelEven'] + 
                                "</td><td>" + output[i]['usuariosFaltantes'] + "</td><td>" + cer + 
                                "</td>" + "<td class=\"row\"><div name=\"" + output[i]['codEven'] + "\" class=\"btn btn-warning col-xs-5 openerModificar\">Modificar</div>"
                                + "<div class=\"col-xs-1\"></div>"
                                + "<div name=\"" + output[i]['codEven'] + "\"  class=\"btn btn-danger col-xs-5 opener\">Borrar</div></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                    //Función que coloca los listeners de los click a los nuevos botones
                    colocaListeners();
                }
            });
    });
    ///////////////fin de funcion que ordena por hora///////////////////////////
    //
    //
    ///////////////funcion que ordena por nivel/////////////////////////////////
    $("#tablaNivel").click(function(){
        //deja la paginación en 0
        $("#anterior").attr("disabled", true);
        $("#siguiente").attr("disabled", true);
        $("#paginacion span").text("");
        $("#numeroEventos").val("");
        //Ordenación
        contadorNivel++;
        if((contadorNivel%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
        $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "eventoOrdenarPor=E.NivelEven&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        var cer = "";
                         if(output[i]['cerrado'] == 0){
                            cer = "Abierto";
                        } else {
                            cer = "Cerrado";
                        }
                        cadena =  cadena + "<tr name=\"" + output[i]['codEven'] + "\"><td class=\"sprite deporte" + output[i]['codDep'] + "\"></td><td>" + output[i]['nomInst'] + 
                                "</td><td>" + output[i]['nomPist'] + "</td><td>" + output[i]['fechEven'] + 
                                "</td><td>" + output[i]['horaEven'] + "</td><td>" + output[i]['nivelEven'] + 
                                "</td><td>" + output[i]['usuariosFaltantes'] + "</td><td>" + cer + 
                                "</td>" + "<td class=\"row\"><div name=\"" + output[i]['codEven'] + "\" class=\"btn btn-warning col-xs-5 openerModificar\">Modificar</div>"
                                + "<div class=\"col-xs-1\"></div>"
                                + "<div name=\"" + output[i]['codEven'] + "\"  class=\"btn btn-danger col-xs-5 opener\">Borrar</div></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                    //Función que coloca los listeners de los click a los nuevos botones
                    colocaListeners();
                }
            });
    });
    ///////////////fin de funcion que ordena por nivel//////////////////////////
    //
    //
    ///////////////funcion que ordena por usuarios///////////////////////////////
    $("#tablaUsuarios").click(function(){
        //deja la paginación en 0
        $("#anterior").attr("disabled", true);
        $("#siguiente").attr("disabled", true);
        $("#paginacion span").text("");
        $("#numeroEventos").val("");
        //Ordenación
        contadorUsuarios++;
        if((contadorUsuarios%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
        $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "eventoOrdenarPor=E.UsuariosFaltantes&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        var cer = "";
                         if(output[i]['cerrado'] == 0){
                            cer = "Abierto";
                        } else {
                            cer = "Cerrado";
                        }
                        cadena =  cadena + "<tr name=\"" + output[i]['codEven'] + "\"><td class=\"sprite deporte" + output[i]['codDep'] + "\"></td><td>" + output[i]['nomInst'] + 
                                "</td><td>" + output[i]['nomPist'] + "</td><td>" + output[i]['fechEven'] + 
                                "</td><td>" + output[i]['horaEven'] + "</td><td>" + output[i]['nivelEven'] + 
                                "</td><td>" + output[i]['usuariosFaltantes'] + "</td><td>" + cer + 
                                "</td>" + "<td class=\"row\"><div name=\"" + output[i]['codEven'] + "\" class=\"btn btn-warning col-xs-5 openerModificar\">Modificar</div>"
                                + "<div class=\"col-xs-1\"></div>"
                                + "<div name=\"" + output[i]['codEven'] + "\"  class=\"btn btn-danger col-xs-5 opener\">Borrar</div></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                    //Función que coloca los listeners de los click a los nuevos botones
                    colocaListeners();
                }
            });
    });
    ///////////////fin de funcion que ordena por usuarios///////////////////////
    //
    //
    ///////////////funcion que ordena por estado////////////////////////////////
    $("#tablaEstado").click(function(){
        //deja la paginación en 0
        $("#anterior").attr("disabled", true);
        $("#siguiente").attr("disabled", true);
        $("#paginacion span").text("");
        $("#numeroEventos").val("");
        //Ordenación
        contadorEstado++;
        if((contadorEstado%2)===0){
            forma =  "DESC";
        } else {
            forma =  "ASC";
        }
        $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "eventoOrdenarPor=E.Cerrado&forma=" + forma,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    //crea el nuevo tbody
                    var cadena = "";
                    for (i=0; i < output.length; i++){
                        var cer = "";
                         if(output[i]['cerrado'] == 0){
                            cer = "Abierto";
                        } else {
                            cer = "Cerrado";
                        }
                        cadena =  cadena + "<tr name=\"" + output[i]['codEven'] + "\"><td class=\"sprite deporte" + output[i]['codDep'] + "\"></td><td>" + output[i]['nomInst'] + 
                                "</td><td>" + output[i]['nomPist'] + "</td><td>" + output[i]['fechEven'] + 
                                "</td><td>" + output[i]['horaEven'] + "</td><td>" + output[i]['nivelEven'] + 
                                "</td><td>" + output[i]['usuariosFaltantes'] + "</td><td>" + cer + 
                                "</td>" + "<td class=\"row\"><div name=\"" + output[i]['codEven'] + "\" class=\"btn btn-warning col-xs-5 openerModificar\">Modificar</div>"
                                + "<div class=\"col-xs-1\"></div>"
                                + "<div name=\"" + output[i]['codEven'] + "\"  class=\"btn btn-danger col-xs-5 opener\">Borrar</div></td></tr>";
                    }
                    //borra el contenido del tbody
                    $("#contenidoTabla *").remove();
                    //Rellena la tabla con el nuevo contenido ordenado
                    $("#contenidoTabla").append(cadena);
                    //Función que coloca los listeners de los click a los nuevos botones
                    colocaListeners();
                }
            });
    });
    ///////////////fin de funcion que ordena por estado/////////////////////////
    //
    //
    /////////////////////Datepicker de insertar/////////////////////////////////
        $( function() {
            $( "#datepicker" ).datepicker({
                altField: "#actualDate",
                altFormat: "yy-mm-dd",
                dateFormat: "yy-mm-dd",
                dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
                duration: "slow",
                minDate: "#actualDate",
                hideIfNoPrevNext: true,
                monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
                showAnim: "slide",
                showMonthAfterYear: true
            });
        });
    /////////////////////////////////fin del datepicker de insertar/////////////
    //
    //
    /////////////////////Datepicker modificacion////////////////////////////////
        $( function() {
            $( ".datepicker" ).datepicker({
                altField: "#actualDate",
                altFormat: "yy-mm-dd",
                dateFormat: "yy-mm-dd",
                dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
                duration: "slow",
                minDate: "#actualDate",
                hideIfNoPrevNext: true,
                monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
                showAnim: "slide",
                showMonthAfterYear: true
            });
        });
    /////////////////////////fin del datepicker de modificacion/////////////////
    //
    //
    ///////////////////////////////Timepicker///////////////////////////////////
    $( function() {
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '1',
            maxTime: '23:30pm',
            defaultTime: '24',
            startTime: '10:00',
            dynamic: true,
            dropdown: true,
            scrollbar: true
        });
    });
    //////////////////////////////////fin timepicker////////////////////////////
    //
    //
    //////////////////////Dialog de confirmación de borrado/////////////////////
    $( function() {
        $( ".dialog" ).dialog({
                autoOpen: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                hide: {
                    effect: "explode",
                    duration: 1000
                },
                closeOnEscape: true,
                modal: true,
                title: "Confirmación"
        });         
    } );
    /////////////////////////fin del dialog de confirmacion de borrado//////////
    //
    //
    //////////////////////////opener del dialog del borrado/////////////////////
    $(".opener").on("click", function() {
        var x = $(this).attr("name");
        $( ".dialog" ).dialog( "option", "buttons",{
            Borrar: function() {
                borrarFila(x);
            },
            Cancelar: function() {
                $( this ).dialog( "close" );
            }
            });
        $( ".dialog" ).dialog( "open" );
    });
    ///////////////fin del opener del dialog del borrado///n////////////////////
    //
    //
    ///////////////funcion que borra la fila////////////////////////////////////
    function borrarFila(elemento){
        $("tr[name=" + elemento + "]").fadeOut(600, function(){
            var x = $(this).attr("name");
            $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "borradoEvento=" + x,
                success: function(){
                   $(".dialog").dialog( "close" );
                   //llama a la función de paginacion
                    eventosPaginados();
                }
            });
        });       
    }
    ///////////////////////////fin de la funcion que borra la fila//////////////
    //
    //
    ///////////////////////Dialog de modificacion///////////////////////////////
    $( function() {
        $("#formularioModificar").dialog({
                autoOpen: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                hide: {
                    effect: "explode",
                    duration: 1000
                },
                closeOnEscape: true,
                modal: true,
                title: "Modificación",
                width: 1200,
        });         
    } );
    ///////////////////////////fin del dialog de modificacion///////////////////
    //
    //
    ///////////////////////opener del dialog de modificacion////////////////////
    $(".openerModificar").on("click", function() {
        var x = $(this).attr("name");
        $( "#formularioModificar" ).dialog( "option", "buttons",{
            Modificar: function() {
               /* //Validacion del formulario       LA VALIDACIÓN DEL FORMULARIO DE MODIFICACIÓN NO VA A FUNCIONAR PQ JQUERY UI NO UTILIZA INPUTS TYPE SUBMIT SINO QUE USA BUTTONS
                console.log("hola");
                $("#formularioModificar").validate({                    
                    onfocusout: true,
                    rules:{
                        deporte: "required",
                        instalacion: "required",
                        pista: "required",
                        nivel: "required",
                        datepicker: "required",
                        hora: "required",
                        usuarios: {
                            required: true,
                            min: 1
                        }
                    },
                    messages:{
                        deporte: "El evento debe de un deporte.",
                        instalacion: "El evento debe realizarse en una instalación.",
                        pista: "El evento debe realizarse en una pista concreta.",
                        nivel: "Debe seleccionar el nivel del evento.",
                        datepicker: "Debe seleccionar la fecha del evento.",
                        hora: "Debe seleccionar la hora del evento.",
                        usuarios:{
                            required: "Debe haber usuarios faltantes.",
                            min: "Debe faltar como mínimo, un usuario."
                        }
                    },
                    submitHandler: function() {
                                        modificarFila(x);
                                    }
                });*/
                 modificarFila(x);
            },
            Cancelar: function() {
                $( this ).dialog( "close" );
            }
            });        
        $( "#formularioModificar" ).dialog( "open" );
        //Borra los option de instalaciones y pistas
        $(".instalaciones").each(function(){
            $(this).remove();
        });
        $(".pistas").each(function(){
            $(this).remove();
        });
        //Rellena los nuevos select
        $.ajax({
            url: "../Controller/administracion.php",
            method: "GET",
            data: "consultaEventoAjax="+x,
            success: function(result){
                var output = jQuery.parseJSON(result);
                $(".deporte option[name=" + output[0]['codDep'] + "]").attr("selected", true);
                //crea el select de instalacion
                $.ajax({
                    url: "../Controller/administracion.php",
                    method: "GET",
                    data: "consultaInstalacion="+output[0]['codDep'],
                    success: function(result){
                        var outputNuevo = jQuery.parseJSON(result);
                        //Introduce nuevos option
                        if(outputNuevo.length>0) {
                            for (i=0; i < outputNuevo.length; i = i + 2){
                               if(outputNuevo[i]==output[0]['nomInst']){
                                $(".instalacion").append("<option selected class=\"instalaciones\" name=\"" + parseInt(outputNuevo[i + 1]) +"\">" + outputNuevo[i] +"</option>");
                               } else {
                                $(".instalacion").append("<option class=\"instalaciones\" name=\"" + parseInt(outputNuevo[i + 1]) +"\">" + outputNuevo[i] +"</option>");
                               }
                            }
                        }
                    }
                });
                //Crea el select de la pista                
                $.ajax({
                    url: "../Controller/administracion.php",
                    method: "GET",
                    data: "consultaPistaInstalcion=" + output[0]['codInst'] + "&deporte=" + output[0]['codDep'],
                    success: function(result){
                        //Introduce nuevos option
                        var outputNuevo = jQuery.parseJSON(result);
                        if(outputNuevo.length>0){                            
                            for (i=0; i < outputNuevo.length; i = i + 2){
                                if(outputNuevo[i]==output[0]['nomPist']){
                                    $(".pista").append("<option selected=\"selected\" class=\"pistas\" value=\"" + parseInt(outputNuevo[i + 1]) +"\">" + outputNuevo[i] +"</option>");
                                } else {
                                    $(".pista").append("<option class=\"pistas\" value=\"" + parseInt(outputNuevo[i + 1]) +"\">" + outputNuevo[i] +"</option>");
                                }
                            }
                        }
                    }
                });
                //crea el input del nivel
                $(".nivel").show();
                $(".nivel option[name=" + output[0]['nivelEven'] + "]").attr("selected", true);
                //crea el input de la fecha
                $(".fechEven").show();
                $(".fechEven").val(output[0]['fechEven']);
                //crea el input de la hora
                $(".horaEven").show();
                $(".horaEven").val(output[0]['horaEven']);
                //crea el input de los usuarios faltantes
                $(".usuariosFaltantes").show();
                $(".usuariosFaltantes").val(output[0]['usuariosFaltantes']);
            }
        });
    });
    //Rellena los option de las instalaciones dependiendo del deporte
    $(".deporte").change( function(){
        //borra las instalaciones y las pistas que haya
        $(".pistas").each(function(){
            $(this).remove();
        });
        $(".instalaciones").each(function(){
            $(this).remove();
        });        
        var id = $(this).children(":selected").attr("name");
        $.ajax({
            url: "../Controller/administracion.php",
            method: "GET",
            data: "consultaInstalacion="+id,
            success: function(result){
                //Introduce nuevos option
                $(".instalacion option").each(function(){
                   $(this).remove(); 
                });
                $(".instalacion").append("<option selected disabled>--Instalacion--</option>");
                $(".pista option").each(function(){
                   $(this).remove(); 
                });
                $(".pista").append("<option selected disabled>--Pista--</option>");
                var output = jQuery.parseJSON(result);
                //Introduce nuevos option
                if(output.length>0) {
                    for (i=0; i < output.length; i = i + 2){
                        $(".instalacion").append("<option class=\"instalaciones\" name=\"" + parseInt(output[i + 1]) +"\">" + output[i] +"</option>");
                    }
                    $(".instalacion").show();
                }
            }
        });
        });
        //Rellena los Option de las pistas dependiendo de la instalación y el deporte
        $(".instalacion").change( function(){
            var idInstalacion = $(this).children(":selected").attr("name");
            var idDeporte = $(".deporte").children(":selected").attr("name");
            //deja seleccionadas las cabeceras
                $(".pista .defecto").attr("selected", "selected");
                $(".pista .defecto").attr("disabled", false);
            $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "consultaPistaInstalcion=" + idInstalacion + "&deporte=" + idDeporte,
                success: function(result){
                    $(".pista option").each(function(){
                        $(this).remove(); 
                     });
                    $(".pista").append("<option selected disabled>--Instalacion--</option>");
                    //Introduce nuevos option
                    var output = jQuery.parseJSON(result);
                    if(output.length>0){
                        for (i=0; i < output.length; i = i + 2){
                           $(".pista").append("<option class=\"pistas\" value=\"" + parseInt(output[i + 1]) +"\">" + output[i] +"</option>");
                        }
                    }
                }
            });
        });
    ///////////////////////////fin de la funcion del opener de modificacion/////
    //
    //
    ///////////////////////Función de modificacion//////////////////////////////
    //Funcion que modifica la fila seleccionada
    function modificarFila(x){
        var codEven = x;
        var nomInstalacion = $(".instalacion").children(":selected").text();
        var nomPista = $(".pista").children(":selected").text();
        var codPista = $(".pista").val();
        var fechEven = $(".fechEven").val();
        var horaEven = $(".horaEven").val();
        var nivelEven = $(".nivel").val();
        var usuariosEven = $(".usuariosFaltantes").val();
        var codDep = $(".deporte").children(":selected").attr("name");
        $.ajax({
            async: false,
            url: "../Controller/administracion.php",
            method: "GET",
            data: "modificar=modificarEvento&codEven=" + codEven + "&pistaEvento=" + codPista + "&fechEven=" + fechEven + "&horaEven=" + horaEven + "&nivel=" + nivelEven + "&usuariosFaltantes=" + usuariosEven,
            success: function(result){
                $("#formularioModificar").dialog("close");
                $("tr[name=" + codEven + "]").fadeOut(800, function(){
                     $("tr[name=" + codEven + "] td:nth-child(1)").attr("class", "sprite deporte" + codDep);
                     $("tr[name=" + codEven + "] td:nth-child(2)").text(nomInstalacion);
                     $("tr[name=" + codEven + "] td:nth-child(3)").text(nomPista);
                     $("tr[name=" + codEven + "] td:nth-child(4)").text(fechEven);
                     $("tr[name=" + codEven + "] td:nth-child(5)").text(horaEven);
                     $("tr[name=" + codEven + "] td:nth-child(6)").text(nivelEven);
                     $("tr[name=" + codEven + "] td:nth-child(7)").text(usuariosEven);
                     $("tr[name=" + codEven + "]").fadeIn(800);
                });
            }
        });
    }
    ///////////////////fin de la funcíon de modificación////////////////////////
    //
    //   
    //////////////////////////////Función que coloca los listeners//////////////
    function colocaListeners(){
        //Esta función coloca el listener del click a los nuevos botones
        $(document).on("click", ".opener", function() {
            var x = $(this).attr("name");
            $( ".dialog" ).dialog( "option", "buttons",{
                Borrar: function() {
                    borrarFila(x);
                },
                Cancelar: function() {
                    $( this ).dialog( "close" );
                }
            });
            $( ".dialog" ).dialog( "open" );
        });
        $(document).on("click", ".openerModificar", function() {
            var x = $(this).attr("name");
            $( "#formularioModificar" ).dialog( "option", "buttons",{
                Modificar: function() {
                    modificarFila(x);
                },
                Cancelar: function() {
                    $( this ).dialog( "close" );
                }
            });        
            $( "#formularioModificar" ).dialog( "open" );
            //Borra los option de instalaciones y pistas
            $(".instalaciones").each(function(){
                $(this).remove();
            });
            $(".pistas").each(function(){
                $(this).remove();
            });
            //Rellena los nuevos select
            $.ajax({
                url: "../Controller/administracion.php",
                method: "GET",
                data: "consultaEventoAjax="+x,
                success: function(result){
                    var output = jQuery.parseJSON(result);
                    $(".deporte option[name=" + output[0]['codDep'] + "]").attr("selected", true);
                    //crea el select de instalacion
                    $.ajax({
                        url: "../Controller/administracion.php",
                        method: "GET",
                        data: "consultaInstalacion="+output[0]['codDep'],
                        success: function(result){
                            var outputNuevo = jQuery.parseJSON(result);
                            //Introduce nuevos option
                            if(outputNuevo.length>0) {
                                for (i=0; i < outputNuevo.length; i = i + 2){
                                    if(outputNuevo[i]==output[0]['nomInst']){
                                        $(".instalacion").append("<option selected class=\"instalaciones\" name=\"" + parseInt(outputNuevo[i + 1]) +"\">" + outputNuevo[i] +"</option>");
                                    } else {
                                        $(".instalacion").append("<option class=\"instalaciones\" name=\"" + parseInt(outputNuevo[i + 1]) +"\">" + outputNuevo[i] +"</option>");
                                    }
                                }
                            }
                        }
                    });
                    //Crea el select de la pista                
                    $.ajax({
                        url: "../Controller/administracion.php",
                        method: "GET",
                        data: "consultaPistaInstalcion=" + output[0]['codInst'] + "&deporte=" + output[0]['codDep'],
                        success: function(result){
                            //Introduce nuevos option
                            var outputNuevo = jQuery.parseJSON(result);
                            if(outputNuevo.length>0){                            
                                for (i=0; i < outputNuevo.length; i = i + 2){
                                    if(outputNuevo[i]==output[0]['nomPist']){
                                        $(".pista").append("<option selected=\"selected\" class=\"pistas\" value=\"" + parseInt(outputNuevo[i + 1]) +"\">" + outputNuevo[i] +"</option>");
                                    } else {
                                        $(".pista").append("<option class=\"pistas\" value=\"" + parseInt(outputNuevo[i + 1]) +"\">" + outputNuevo[i] +"</option>");
                                    }
                                }
                            }
                        }
                    });
                    //crea el input del nivel
                    $(".nivel").show();
                    $(".nivel option[name=" + output[0]['nivelEven'] + "]").attr("selected", true);
                    //crea el input de la fecha
                    $(".fechEven").show();
                    $(".fechEven").val(output[0]['fechEven']);
                    //crea el input de la hora
                    $(".horaEven").show();
                    $(".horaEven").val(output[0]['horaEven']);
                    //crea el input de los usuarios faltantes
                    $(".usuariosFaltantes").show();
                    $(".usuariosFaltantes").val(output[0]['usuariosFaltantes']);
                }
            });
        });
    }
    ////////////////////fin de la funcion que coloca los listeners//////////////
    //
    //
    ////////////////////Función incial que esconde todo el formulario///////////
    //Esconde todo el formulario
    $("#instalacion").hide();
    $("#pista").hide();
    $("#nivel").hide();
    $("#datepicker").hide();
    $("#hora").hide();
    $("#usuarios").hide();
    $("#insertarEvento").hide();
    /////////////////////////////////Fin////////////////////////////////////////
    //
    //
    //
    ////////////////Función del evento change en el select del deporte//////////
    //Rellena los option de las instalaciones dependiendo del deporte
    $("#deporte").change( function(){
        //Se fija que la nueva fila no exista
        if($( "#nueva" ).length){
            $( "#nueva" ).remove();
        }
        //Inserta una nueva fila
        $("#contenidoTabla tr:nth-child(1)").before("<tr id=\"nueva\"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
        $("#contenidoTabla tr:nth-child(1)").css("background-color", "#B0B0B0");
        var deporte = $("#deporte").children(":selected").attr("id");
        $("#nueva td:nth-child(1)").addClass("sprite deporte" + deporte);
        //Rellena los options siguientes
        var id = $(this).children(":selected").attr("id");
        $.ajax({
            url: "../Controller/administracion.php",
            method: "GET",
            data: "consultaInstalacion="+id,
            success: function(result){
                //Borra los anteriores option
                $(".instalaciones").each(function(){
                    $(this).remove();
                });
                //Esconde todo el formulario
                $("#instalacion").hide();
                $("#pista").hide();
                $("#nivel").hide();
                $("#datepicker").hide();
                $("#hora").hide();
                $("#usuarios").hide();
                $("#insertarEvento").hide();
                var output = jQuery.parseJSON(result);
                //Introduce nuevos option
                $("#instalacion option").each(function(){
                   $(this).remove(); 
                });
                $("#instalacion").append("<option selected disabled>--Instalacion--</option>");
                if(output.length>0) {                    
                    for (i=0; i < output.length; i = i + 2){
                        $("#instalacion").append("<option class=\"instalaciones\" id=\"" + parseInt(output[i + 1]) +"\">" + output[i] +"</option>");
                    }
                    $("#instalacion").show();
                }
            }
        });
    });
    /////////////////////////////Fin del change de deporte//////////////////////
    //
    //
    /////////////////////Función del change de instalaciones////////////////////
    //Rellena los Option de las pistas dependiendo de la instalación y el deporte
    $("#instalacion").change( function(){
        //Se fija que la nueva fila no esté rellena
        if($("#nueva td:nth-child(3)").text()!=""){                
            $("#nueva td:nth-child(3)").text("");
        }
        //Rellena la nueva fila
        var instalacion = $("#instalacion").children(":selected").text();
        $("#nueva td:nth-child(2)").text(instalacion);
        //rellena los options siguientes
        var idInstalacion = $(this).children(":selected").attr("id");
        var idDeporte = $("#deporte").children(":selected").attr("id");
        $.ajax({
            url: "../Controller/administracion.php",
            method: "GET",
            data: "consultaPistaInstalcion=" + idInstalacion + "&deporte=" + idDeporte,
            success: function(result){
                //Borra los anteriores option
                $(".pistas").each(function(){
                    $(this).remove();
                });
                //Esconde todo el formulario
                $("#instalacion").hide();
                $("#pista").hide();
                $("#nivel").hide();
                $("#datepicker").hide();
                $("#hora").hide();
                $("#usuarios").hide();
                $("#insertarEvento").hide();
                //Introduce nuevos option
                var output = jQuery.parseJSON(result);
                $("#pista option").each(function(){
                   $(this).remove(); 
                })
                $("#pista").append("<option selected disabled>--Pistas--</option>");
                if(output.length>0){
                    for (i=0; i < output.length; i = i + 2){
                        $("#pista").append("<option class=\"pistas\" value=\"" + parseInt(output[i + 1]) +"\">" + output[i] +"</option>");
                    }
                    $("#pista .defecto").attr("selected", true);
                    $("#pista .defecto").attr("disabled", false);
                    $("#instalacion").show();
                    $("#pista").show();
                    $("#nivel").show();
                    $("#datepicker").show();
                    $("#hora").show();
                    $("#usuarios").show()
                    $("#insertarEvento").show();
                }
            }
        });
    });
    /////////////////////////////Fin del change de instalaciones////////////////
    //
    //
    //
    ////////////////////////////Función del change de pista/////////////////////
    $("#pista").change(function(){
        //Rellena la nueva fila
        var pista = $("#pista").children(":selected").text();
        $("#nueva td:nth-child(3)").text(pista);
    });
    //////////////////////////////////fin del change de pista///////////////////
    //
    //
    /////////////////////////////Función del change de nivel////////////////////
    $("#nivel").change(function(){
        //Rellena la nueva fila
        var nivel = $("#nivel").children(":selected").text();
        $("#nueva td:nth-child(6)").text(nivel);
    });
    ///////////////////////////////////fin del change de nivel//////////////////
    //
    //
    //////////////////////función del change de la fecha////////////////////////
    $("#datepicker").change(function(){
        //Rellena la nueva fila
        var fechaLarga = $("#datepicker").datepicker("getDate");
        var dia = fechaLarga.getDate();
        var ano = fechaLarga.getFullYear();
        var mes = parseInt(fechaLarga.getMonth())+1;
        if(mes<10){
            mes = "0" + mes;
        }
        var fecha = ano + "-" + mes + "-" + dia;
        $("#nueva td:nth-child(4)").text(fecha);
    });
    /////////////////////////////fin del change de la fecha/////////////////////
    //
    //
    ///////////////////////////////función del change de la hora////////////////
    $('#hora').timepicker({
        change: function(time) {
            var element = $(this), text;
            // get access to this Timepicker instance
            var timepicker = element.timepicker();
            text = timepicker.format(time);
            var hora = text.substr(0,5) + ":00";
            $("#nueva td:nth-child(5)").text(hora);
        }
    });
    /////////////////////////////fin del change de la hora//////////////////////
    //
    //
    ///////////////////////////////función del change de usuarios///////////////
    $("#usuarios").change(function(){
        var usuarios = $("#usuarios").val();
        $("#nueva td:nth-child(7)").text(usuarios);
        var cerrado = "Cerrado";
        if(usuarios > 0){
            cerrado = "Abierto";
        }
        $("#nueva td:nth-child(8)").text(cerrado);
    });
    /////////////////////////////fin del change de usuarios/////////////////////
    //
    //
    ///////////////////////////////función del click en insertar////////////////
    $("#insertarEvento").click(function(){ 
        //Validación  del formulario de insertar evento
        $("#insertar").validate({
            onfocusout: true,
            rules:{
                deporte: "required",
                instalacion: "required",
                pista: "required",
                nivel: "required",
                datepicker: "required",
                hora: "required",
                usuarios: {
                    required: true,
                    min: 1
                }
            },
            messages:{
                deporte: "El evento debe de un deporte.",
                instalacion: "El evento debe realizarse en una instalación.",
                pista: "El evento debe realizarse en una pista concreta.",
                nivel: "Debe seleccionar el nivel del evento.",
                datepicker: "Debe seleccionar la fecha del evento.",
                hora: "Debe seleccionar la hora del evento.",
                usuarios:{
                    required: "Debe haber usuarios faltantes.",
                    min: "Debe faltar como mínimo, un usuario."
                }
            },
            submitHandler: function() {
                var pista = $("#pista").children(":selected").val();
                var fecha = $("#nueva td:nth-child(4)").text();
                var hora = $("#nueva td:nth-child(5)").text();
                var nivel = $("#nivel").children(":selected").val();
                var usuarios = $("#usuarios").val();
                $.ajax({
                    url: "../Controller/administracion.php",
                    method: "GET",
                    data: "insertar=insertarEvento&pistaEvento=" + pista + "&fechEven=" + fecha + "&horaEven=" + hora + "&nivel=" + nivel + "&usuariosFaltantes=" + usuarios,
                    success: function(result){
                        $("#nueva").fadeOut(800, function(){
                            $("#nueva td:nth-child(9)").addClass("row");
                            $("#nueva td:nth-child(9)").html("<div name=\"" + result + "\" class=\"btn btn-warning col-xs-5 openerModificar\">Modificar</div>"
                                                            + "<div class=\"col-xs-1\"></div>"
                                                            + "<div name=\"" + result + "\"  class=\"btn btn-danger col-xs-5 opener\">Borrar</div>");
                            $("#nueva").attr("name", result);
                            $("#nueva").css("background", "none");
                            $("#nueva").fadeIn(800, function(){
                                $("#nueva").removeAttr("id");
                            });
                        });
                        colocaListeners();
                        //Esconde todo el formulario
                        $("#instalacion").hide();
                        $("#pista").hide();
                        $("#nivel option").each(function(){
                            $(this).remove();
                        })
                        $("#nivel").append("<option class=\"defecto\" selected disabled>--Nivel--</option>"
                                            + "<option value=\"Principiante\">Principiante</option>"
                                            + "<option value=\"Bajo\">Bajo</option>"
                                            + "<option value=\"Medio\">Medio</option>"
                                            + "<option value=\"Alto\">Alto</option>"
                                            + "<option value=\"Profesional\">Profesional</option>");
                        $("#nivel").hide();
                        $("#datepicker").val("");
                        $("#datepicker").hide();
                        $("#hora").hide();
                        $("#hora").val("");
                        $("#usuarios").hide();
                        $("#usuarios").val("");
                        $("#insertarEvento").hide();
                        $("#deporte .defecto").each(function(){
                            $(this).remove(); 
                        })
                        $("#deporte :nth-child(1)").before("<option class=\"defecto\" selected disabled>--Deporte--</option>");
                        //llama a la función de paginacion
                        eventosPaginados();
                    }
                });
            }
        });
    });
    /////////////////////////////Fin de la función de click en insert///////////
});

