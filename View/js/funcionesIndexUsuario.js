/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
    //esconde elementos
    $(".editarFoto").hide();
    $("#audio").hide();
    //Hace desaparecer los inputs y selects de crear evento
    $("#instalacion").hide();
    $("#pista").hide();
    $("#nivel").hide();
    $("#datepicker").hide();
    $("#hora").hide();
    $("#usuarios").hide();
    $("#insertarEvento").hide();
    //Inicializa las preferencias
    $.ajax({
        url: "../../Controller/gestionaPreferencias.php",
        method: "GET",
        data: "preferencias=true",
        success: function(result){
            var output =JSON.parse(result);
            var x = 0;
            for(x = 0; x < output.length; x++){
                $("div[name='" + output[x] + "']").children().css("background-image", "url('../View/img/like2.png')");
                $("div[name='" + output[x] + "']").children().addClass("selected");
            }
        }
    });
    
    //Inicializa los eventos proximos
    $(".participacionAbiertaEventos").each(function(){
        var codEven = $(this).attr("name");
        var str = "";
        $.ajax({
            url: "../../Controller/gestionaEventos.php",
            method: "GET",
            data: "evento=" + codEven,
            success: function(result){
                var output =JSON.parse(result);
                if(parseInt(output["UsuariosFaltantes"])>0){
                    //$(".participacionAbiertaEventos[name=" + codEven + "]").css("background-color", "rgba(0, 77, 0, 0.6)");
                    str = "<span>" + output["FechEven"] + "</span><span>" + output["HoraEven"] + "</span><span>" + output["NomDep"] + "</span><span>" + output["NomInst"] + "</span><span>" + output["NivelEven"] + "</span><span class=\"estadoEvento abierto\" title=\"Estado del evento\">Faltan " + output["UsuariosFaltantes"]  + " participantes</span>";
                } else {
                    $(".participacionAbiertaEventos[name=" + codEven + "]").css("background-color", "rgba(77, 0, 0, 0.6)");
                    str = "<span>" + output["FechEven"] + "</span><span>" + output["HoraEven"] + "</span><span>" + output["NomDep"] + "</span><span>" + output["NomInst"] + "</span><span>" + output["NivelEven"] + "</span><span class=\"estadoEvento cerrado\" title=\"Estado del evento\">Evento cerrado!</span>";
                }
                $(".participacionAbiertaEventos[name=" + codEven + "]").html(str);
            }
        });    
    });
    
    //Inicializa los eventos historicos
    $(".participacionEventos").each(function(){
        var codEven = $(this).attr("name");
        var str = "";
        $.ajax({
            url: "../../Controller/gestionaEventos.php",
            method: "GET",
            data: "evento=" + codEven,
            success: function(result){
                var output =JSON.parse(result);
                if(output["Valoracion"]==1){
                    str = "<span>" + output["FechEven"] + "</span><span>" + output["HoraEven"] + "</span><span>" + output["NomDep"] + "</span><span>" + output["NomInst"] + "</span><span>" + output["NivelEven"] + "</span><span class=\"califica\" title=\"Califica tu experiencia\"><span class=\"estrella selectedStar\" name=\"1\"></span><span class=\"estrella\" name=\"2\"></span><span class=\"estrella\" name=\"3\"></span><span class=\"estrella\" name=\"4\"></span><span class=\"estrella\" name=\"5\"></span></span>";
                } else if(output["Valoracion"]==2){
                    str = "<span>" + output["FechEven"] + "</span><span>" + output["HoraEven"] + "</span><span>" + output["NomDep"] + "</span><span>" + output["NomInst"] + "</span><span>" + output["NivelEven"] + "</span><span class=\"califica\" title=\"Califica tu experiencia\"><span class=\"estrella selectedStar\" name=\"1\"></span><span class=\"estrella selectedStar\" name=\"2\"></span><span class=\"estrella\" name=\"3\"></span><span class=\"estrella\" name=\"4\"></span><span class=\"estrella\" name=\"5\"></span></span>";
                } else if(output["Valoracion"]==3){
                    str = "<span>" + output["FechEven"] + "</span><span>" + output["HoraEven"] + "</span><span>" + output["NomDep"] + "</span><span>" + output["NomInst"] + "</span><span>" + output["NivelEven"] + "</span><span class=\"califica\" title=\"Califica tu experiencia\"><span class=\"estrella selectedStar\" name=\"1\"></span><span class=\"estrella selectedStar\" name=\"2\"></span><span class=\"estrella selectedStar\" name=\"3\"></span><span class=\"estrella\" name=\"4\"></span><span class=\"estrella\" name=\"5\"></span></span>";
                } else if(output["Valoracion"]==4){
                    str = "<span>" + output["FechEven"] + "</span><span>" + output["HoraEven"] + "</span><span>" + output["NomDep"] + "</span><span>" + output["NomInst"] + "</span><span>" + output["NivelEven"] + "</span><span class=\"califica\" title=\"Califica tu experiencia\"><span class=\"estrella selectedStar\" name=\"1\"></span><span class=\"estrella selectedStar\" name=\"2\"></span><span class=\"estrella selectedStar\" name=\"3\"></span><span class=\"estrella selectedStar\" name=\"4\"></span><span class=\"estrella\" name=\"5\"></span></span>";
                } else if(output["Valoracion"]==5){
                    str = "<span>" + output["FechEven"] + "</span><span>" + output["HoraEven"] + "</span><span>" + output["NomDep"] + "</span><span>" + output["NomInst"] + "</span><span>" + output["NivelEven"] + "</span><span class=\"califica\" title=\"Califica tu experiencia\"><span class=\"estrella selectedStar\" name=\"1\"></span><span class=\"estrella selectedStar\" name=\"2\"></span><span class=\"estrella selectedStar\" name=\"3\"></span><span class=\"estrella selectedStar\" name=\"4\"></span><span class=\"estrella selectedStar\" name=\"5\"></span></span>";
                } else {
                    str = "<span>" + output["FechEven"] + "</span><span>" + output["HoraEven"] + "</span><span>" + output["NomDep"] + "</span><span>" + output["NomInst"] + "</span><span>" + output["NivelEven"] + "</span><span class=\"califica\" title=\"Califica tu experiencia\"><span class=\"estrella\" name=\"1\"></span><span class=\"estrella\" name=\"2\"></span><span class=\"estrella\" name=\"3\"></span><span class=\"estrella\" name=\"4\"></span><span class=\"estrella\" name=\"5\"></span></span>";
                }
                $(".participacionEventos[name=" + codEven + "]").html(str);
            }
        });    
    });
    
    
    //Cambia el background de favoritos    
    $(".deporte").click(function(){
        var codDep = $(this).attr("name");
        if($(this).children().hasClass("selected")){
            $(this).children().css("background-image", "url('../View/img/like1.png')");
            $(this).children().removeClass("selected");
            $.ajax({
                    url: "../../Controller/gestionaPreferencias.php",
                    method: "GET",
                    data: "removePreferencia=" + codDep
                });
        } else {
            var codDep = $(this).attr("name");
            $(this).children().css("background-image", "url('../View/img/like2.png')");
            $(this).children().addClass("selected");
            $.ajax({
                    url: "../../Controller/gestionaPreferencias.php",
                    method: "GET",
                    data: "addPreferencia=" + codDep
                });
        }
    });
    
    //Califica la experiencia del usuario en los eventos
    $(document).on("click", ".estrella", function() {
        var numero = $(this).attr("name");
        var evento = $(this).parent().parent().attr("name");
        if(!$(this).hasClass("selectedStar")){
            if(numero==1){   
                $(this).addClass("selectedStar");
               //Actualiza la bbdd
               $.ajax({
                    url: "../../Controller/valoraParticipacion.php",
                    method: "GET",
                    data: "valoracion=" + numero + "&codEven=" + evento,
                    success: function(result){                        
                    }
                });
            }
            if(numero==2){
               $(this).addClass("selectedStar");
               $(this).parent().children(".estrella[name=1]").addClass("selectedStar");
               //Actualiza la bbdd
               $.ajax({
                    url: "../../Controller/valoraParticipacion.php",
                    method: "GET",
                    data: "valoracion=" + numero + "&codEven=" + evento,
                    success: function(result){                        
                    }
                });
               
            }
            if(numero==3){
               $(this).addClass("selectedStar");
               $(this).parent().children(".estrella[name=1]").addClass("selectedStar");
               $(this).parent().children(".estrella[name=2]").addClass("selectedStar");
               //Actualiza la bbdd
               $.ajax({
                    url: "../../Controller/valoraParticipacion.php",
                    method: "GET",
                    data: "valoracion=" + numero + "&codEven=" + evento,
                    success: function(result){                        
                    }
                });
            }
            if(numero==4){
               $(this).addClass("selectedStar");
               $(this).parent().children(".estrella[name=1]").addClass("selectedStar");
               $(this).parent().children(".estrella[name=2]").addClass("selectedStar");
               $(this).parent().children(".estrella[name=3]").addClass("selectedStar");
               //Actualiza la bbdd
               $.ajax({
                    url: "../../Controller/valoraParticipacion.php",
                    method: "GET",
                    data: "valoracion=" + numero + "&codEven=" + evento,
                    success: function(result){                        
                    }
                });
            }
            if(numero==5){
               $(this).addClass("selectedStar");
               $(this).parent().children(".estrella[name=1]").addClass("selectedStar");
               $(this).parent().children(".estrella[name=2]").addClass("selectedStar");
               $(this).parent().children(".estrella[name=3]").addClass("selectedStar");
               $(this).parent().children(".estrella[name=4]").addClass("selectedStar");
               //Actualiza la bbdd
               $.ajax({
                    url: "../../Controller/valoraParticipacion.php",
                    method: "GET",
                    data: "valoracion=" + numero + "&codEven=" + evento,
                    success: function(result){                        
                    }
                });
            }
        } else {
            if(numero==1){
               $(this).parent().children(".estrella[name=2]").removeClass("selectedStar");
               $(this).parent().children(".estrella[name=3]").removeClass("selectedStar");
               $(this).parent().children(".estrella[name=4]").removeClass("selectedStar");
               $(this).parent().children(".estrella[name=5]").removeClass("selectedStar");
               //Actualiza la bbdd
               $.ajax({
                    url: "../../Controller/valoraParticipacion.php",
                    method: "GET",
                    data: "valoracion=" + numero + "&codEven=" + evento,
                    success: function(result){                        
                    }
                });
            }
            if(numero==2){
               $(this).parent().children(".estrella[name=3]").removeClass("selectedStar");
               $(this).parent().children(".estrella[name=4]").removeClass("selectedStar");
               $(this).parent().children(".estrella[name=5]").removeClass("selectedStar");
               //Actualiza la bbdd
               $.ajax({
                    url: "../../Controller/valoraParticipacion.php",
                    method: "GET",
                    data: "valoracion=" + numero + "&codEven=" + evento,
                    success: function(result){                        
                    }
                });
            }
            if(numero==3){
               $(this).parent().children(".estrella[name=4]").removeClass("selectedStar");
               $(this).parent().children(".estrella[name=5]").removeClass("selectedStar");
               //Actualiza la bbdd
               $.ajax({
                    url: "../../Controller/valoraParticipacion.php",
                    method: "GET",
                    data: "valoracion=" + numero + "&codEven=" + evento,
                    success: function(result){                        
                    }
                });
            }
            if(numero==4){
               $(this).parent().children(".estrella[name=5]").removeClass("selectedStar");
               //Actualiza la bbdd
               $.ajax({
                    url: "../../Controller/valoraParticipacion.php",
                    method: "GET",
                    data: "valoracion=" + numero + "&codEven=" + evento,
                    success: function(result){                        
                    }
                });
            }
        }
    });
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
                    $(".iconos").hide();
                }
            }
        });
    });
/////////////////////////////Fin del change de instalaciones////////////////
    $("#insertarEvento").click(function(){
      var codUs = $("#codUs").attr("name");
      var deporte = $("#deporte").children(":selected").text();
      var instalacion = $("#instalacion").children(":selected").text();
      var pista = $("#pista").children(":selected").val();
      var fecha = $("#datepicker").val();
      var hora = $("#hora").val();
      var nivel = $("#nivel").children(":selected").val();
      var usuarios = $("#usuarios").val();
      //Validación
      if(pista=="--Pistas--"){
          $("#pista").focus();
      } else if(nivel==""){
          $("#nivel").focus();
      } else if(fecha==""){
          $("#datepicker").focus();
      } else if(hora==""){
          $("#hora").focus();
      } else if(usuarios==""){
          $("#usuarios").focus();
      } else {      
        $.ajax({
          url: "../../Controller/gestionaEventos.php",
          method: "GET",
          data: "crearEvento=true&codUs=" + codUs + "&pistaEvento=" + pista + "&fechEven=" + fecha + "&horaEven=" + hora + "&nivel=" + nivel + "&usuariosFaltantes=" + usuarios,
          success: function(result){
              var ultimoId = result;
              $.ajax({
                  url: "../../Controller/gestionaParticipacion.php",
                  method: "GET",
                  data: "nuevaParticipacion=true&codUs=" + codUs + "&codEven=" + ultimoId,
                  success: function(output){
                      //Pone una fila mas en proximos eventos
                      var str = str = "<div class=\"participacionAbiertaEventos\" name=\"" + ultimoId + "\"><span>" + fecha + "</span><span>" + hora + "</span><span>" + deporte  + "</span><span>" + instalacion + "</span><span>" + nivel + "</span><span class=\"estadoEvento abierto\" title=\"Estado del evento\">Faltan " + usuarios  + " participantes</span></div>";
                      $(".eventosAbiertosBody").append(str);
                      //$(".participacionAbiertaEventos[name=" + ultimoId + "]").css("background-color", "rgba(0, 77, 0, 0.6)");
                      
                      //Esconde todo el formulario
                      $("#instalacion").hide();
                      $("#pista").hide();
                      $("#nivel option").each(function(){
                          $(this).remove();
                      });
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
                      });
                      $("#deporte :nth-child(1)").before("<option class=\"defecto\" selected disabled>--Deporte--</option>");
                      $("#audio").get(0).play(); 
                      $(".iconos").show();
                      colocaListeners();
                  }
              });     
          }
      });
     }
    });
    //Hover sobre los proximos eventos
    $(".participacionAbiertaEventos").hover(
            function(){
                    $(this).css("justify-content", "center");
                    $(this).children().hide();
                    $(this).css("background-color", "rgba(0, 0, 0, 0.3)");
                    $(this).append("<span class=\"opciones borrar\" title=\"Cancelar participación\"></span>");
               }, 
				
            function () {
                    $(this).css("justify-content", "space-between");
                    $(this).children().show();
                    $(this).css("background-color", "rgba(245,245,245, 0.9)");
                    $(this).children(".opciones").remove();
               }
      
    );
    //Cancelar participàcion
    $( ".dialogEliminarEvento" ).hide();
    $(document).on("click", ".borrar", function(){
        var codEven = $(this).parent().attr("name");
        var opt = {
            title: 'Borrar participación',
            buttons : [
                {
                    text:"Borrar",
                    click:function() {
                        $.ajax({
                            url: "../../Controller/gestionaParticipacion.php",
                            method: "GET",
                            data: "borrar=true&codEven=" + codEven,
                            success: function(result){
                                $.ajax({
                                    url: "../../Controller/gestionaEventos.php",
                                    method: "GET",
                                    data: "borrarUsuario=true&codEven=" + codEven,
                                    success: function(result){
                                        $("#audio2").get(0).play();
                                        $( ".dialogEliminarEvento" ).dialog( "close" );
                                        $(".participacionAbiertaEventos[name='" + codEven +"']").css("justify-content", "space-between");
                                        $(".participacionAbiertaEventos[name='" + codEven +"']").children().show();
                                        $(".participacionAbiertaEventos[name='" + codEven +"']").css("background-color", "rgba(245,245,245, 0.9)");
                                        $(".participacionAbiertaEventos[name='" + codEven +"']").children(".opciones").remove();                                       
                                        $(".participacionAbiertaEventos[name='" + codEven +"']").fadeOut(1000);
                                    }
                                });
                            }
                        });
                    } 
                },
                {
                    text:"Cancelar",
                    click: function(){$( ".dialogEliminarEvento" ).dialog( "close" )}
                }]
            };
        $( ".dialogEliminarEvento" ).dialog(opt, {});
        $( ".dialogEliminarEvento" ).dialog( "open" );
    });
    
    
    //Hover sobre la foto del usuario
    $(".contendorSpanEditarFoto").hover(
            function(){
                    $(this).css("background-color", "rgba(0, 0, 0, 0.3)");
                    $(".editarFoto").show();
                  /*  $(this).children().hide();
                    $(this).css("background-color", "rgba(0, 0, 0, 0.3)");
                    $(this).append("<span class=\"opciones borrar\" title=\"Cancelar participación\"></span>");*/
               }, 
				
            function () {
                $(this).css("background-color", "transparent");
                $(".editarFoto").hide();
                   /* $(this).css("justify-content", "space-between");
                    $(this).children().show();
                    
                    $(".opciones").hide();*/
               }
      
    );
    //dialogo de cambiar foto
     $( function() {
        $( "#dialog-form" ).dialog({
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
                title: "Cambiar foto de Usuario"
        });         
    } );
    
    
    //dialogo de la modificacion de la imagen de usuario
     $( function() {
        $( "#dialog-form" ).dialog({
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
                title: "Cambiar foto de Usuario"
        });         
    } );
    //Opener del dialog
    $(".opener").on("click", function() {
        $( "#dialog-form" ).dialog( "option", "buttons",{

            });
        $( "#dialog-form" ).dialog( "open" );
    });
    
    //Funciones para modificar datos de usuario
    $("#nombreDeUsuario, #fechaNacimiento, #lugarUsuario, #descripcionUsuario").click(function(){
       $(this).hide();
       $(this).next().show();       
       $(".modificarDatos").show();
    });
    
    $("#lugarUsuario").click(function(){
       $(this).hide();
       $(this).next().show();       
       $(".modificarDatos").show();
       var zip = "";
       var localidad = $("#localidad").text();
        console.log(localidad);
        $.ajax({
            async: false,
            url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + localidad,
            method: "GET",
            success: function(result){                    
                zip = result.results[0].address_components[4].long_name;
                console.log(zip);
                $(".lugarUsuario").val(zip);
            }
        });
    });
    //datepicker del usuario
    $( ".datepickerUsuario" ).datepicker({
        altFormat: "dd-mm-yy",
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        maxDate: "-18Y",
        changeYear: true,
        defaultDate: "-18Y -11m"
    }); 
    
    $(".modificarDatos").click(function(){
        if($(".nombreDeUsuario").val()!=""){      
            var nom = $(".nombreDeUsuario").val();
        } else {
            var nom = $("#nombreDeUsuario").text();
        }
        $("#nombreDeUsuario").text(nom);
        $(".nombreDeUsuario").hide();
        if($(".datepickerUsuario").val()!=""){      
            var fecha = $(".datepickerUsuario").val(); 
        } else {
            var fecha = $("#fechaNacimiento").text(); 
        }
        $("#fechaNacimiento").text(fecha);
        $(".datepickerUsuario").hide();
        if($(".lugarUsuario").val()!=""){      
            var lugar = $(".lugarUsuario").val();
        } else {
            var lugar = $("#lugarUsuario").text();
        }
        $("#lugarUsuario").text(lugar);
        $(".lugarUsuario").hide();
        if($(".descripcionUsuario").val()!=""){      
            var desc = $(".descripcionUsuario").val();
        } else {
            var desc = $("#descripcionUsuario").text();
        }
        $("#descripcionUsuario").text(desc);
        $(".descripcionUsuario").hide();
        $("#nombreDeUsuario").show();
        $("#fechaNacimiento").show();
        $("#lugarUsuario").show();
        $("#descripcionUsuario").show();
        $(this).hide();
        if($(".lugarUsuario").val()!=""){
            //Convierte el codigo postal en provincia y ciudad
            var ciudad = null;
            var provincia = null;
            var client = new XMLHttpRequest();
            var latitud;
            var longitud;        
            client.open("GET", "http://api.zippopotam.us/es/" + lugar, true);
            client.onreadystatechange = function() {
                if(client.readyState == 4) {
                    var respuesta = jQuery.parseJSON(client.responseText);
                        ////////////////////////////////////Con esto obtengo la latitud y la longitud
                        latitud = respuesta.places[0]["latitude"];
                        longitud = respuesta.places[0]["longitude"];
                        $.ajax({
                            async: false,
                            url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitud + "," + longitud + "&key=%20AIzaSyC5T4fsLESXq6Z0ekNO1-IR8EAaA4BLecw",
                            method: "GET",
                            success: function(result){                    
                                ciudad = result.results[0].address_components[2].long_name;
                                provincia =  result.results[0].address_components[3].long_name;
                                //Modifico la bbdd
                                $.ajax({
                                    async: false,
                                    url: "../../Controller/gestionaUsuario.php",
                                    data: "modificarUsuario=true&nombre=" + nom + "&fecha=" + fecha + "&local=" + ciudad + "&desc=" + desc + "&prov=" + provincia,
                                    method: "GET",
                                    success: function(result){
                                            $("#lugarUsuario").text(provincia + ", " + ciudad);
                                            $("#localidad").text(ciudad);
                                    }
                                });
                            }
                        });
                };
            };
            client.send();
        } else {
            //Modifico la bbdd
            $.ajax({
                async: false,
                url: "../../Controller/gestionaUsuario.php",
                data: "modificarUsuario=true&nombre=" + nom + "&fecha=" + fecha  + "&desc=" + desc,
                method: "GET",
                success: function(result){
                    //
                }
            });
        }
    });
    
    
    
    
    function colocaListeners(){
        $(document).on('mouseenter', '.participacionAbiertaEventos', function() {
            $(this).css("justify-content", "center");
            $(this).children().hide();
            $(this).css("background-color", "rgba(0, 0, 0, 0.3)");
            $(this).append("<span class=\"opciones borrar\" title=\"Cancelar participación\"></span>");
        });
        $(document).on('mouseleave', '.participacionAbiertaEventos', function() {
            $(this).css("justify-content", "space-between");
            $(this).children().show();
            $(this).css("background-color", "transparent");
            $(".opciones").hide();
        });    
    }   
    
});

