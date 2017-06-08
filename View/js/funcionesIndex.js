/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    /*$( document ).on("scroll", function() {
        console.log($("html, body").scrollTop());
    });*/
    $( window ).resize(function() {
        if($(window).width()>870){
            $("#formularioLoginMovil").css("display", "none");
            $("#formularioRegistroMovil").css("display", "none");
        }
    });
    //Esta funcion hace aparecer el formulario de login
    $("#less").hide();
    $( "#login" ).click(function() {
        if($(window).width()<870){
            $("#formularioLoginMovil").css("display", "flex");
            $(".abajo").hide();            
        }else{
            $("body").css("overflow", "hidden");
            $(".slide li span").css("filter", "blur(10px)");
            $("#formularioLogin").css("display", "flex");
            $("#nav").css("filter", "blur(2px)");
            $("#logo").css("filter", "blur(4px)");
            $("#slogan").css("filter", "blur(3px)");
            $("#cover").css("filter", "blur(3px)");
            $("body").css("overflow", "hidden");
            $("#emailUsuario").attr("disabled", false);
            $("#passUsuario").attr("disabled", true);
            $("#emailUsuario").val("");
            $("#passUsuario").val("");
            $(".email").css("background-image", "none");
            $(".password").css("background-image", "none");
            $(".botonLogin").hide();
            $("#emailUsuario").focus();
            $(".botonLogin").val("");
            $(".abajo").hide();         
        }
    });
    //Esta funcion elimina el formulario de login
    $(".cerrarFormularioLogin").click(function(){
        $("body").css("overflow", "initial");
        $(".slide li span").css("filter", "blur(0px)");
        $("#formularioLogin").css("display", "none");
        $("#nav").css("filter", "none");
        $("#logo").css("filter", "none");
        $("#slogan").css("filter", "none");
        $("#cover").css("filter", "none");
        $("body").css("overflow", "auto");
        $(".abajo").show(); 
    });
    $(".botonLoginMovilCerrar").click(function(){
        $(".abajo").show(); 
        $("#formularioLoginMovil").css("display", "none");
        $("#formularioLoginMovil #contenedorFormularioLoginMovil .contenedorInput input").val("");
    });
    //Esta funcion hace aparecer el formulario de Registro
    $( "#registrarse" ).click(function() {
        if($(window).width()<870){
            $("#formularioRegistroMovil").css("display", "flex");
            $(".abajo").hide();               
        }else{
            $("body").css("overflow", "hidden");
            $("#loader").hide();
            $(".mandarDatos").hide();
            $(".slide li span").css("filter", "blur(10px)");
            $("#contenedorFormularioRegistro").show();
            $("#formularioRegistro").css("display", "flex");
            $("#nav").css("filter", "blur(2px)");
            $("#logo").css("filter", "blur(4px)");
            $("#slogan").css("filter", "blur(3px)");
            $("#cover").css("filter", "blur(3px)");
            $("body").css("overflow", "hidden");       
            $("input").val("");
            $(".emailRegistro").css("background-image", "none");
            $(".nombreRegistro").css("background-image", "none");
            $(".passwordRegistro").css("background-image", "none");
            $(".passwordRegistroRepetir").css("background-image", "none");
            $(".fechNacRegistro").css("background-image", "none");
            $(".codigoPostal").css("background-image", "none");
            $(".segundo").css("display", "none");
            $("#emailUsuarioRegistro").attr("disabled", false);
            $("#nomUsuarioRegistro").attr("disabled", true);
            $("#passUsuarioRegistro").attr("disabled", true);
            $("#passUsuarioRepetirRegistro").attr("disabled", true);
            $("#datepicker").attr("disabled", true);
            $("#codigoPostal").attr("disabled", true);
            $("#emailUsuarioRegistro").focus();
            $(".abajo").hide();          
        }
    });
    //Muestra el datepicker
    $( "#datepicker2" ).datepicker({
        altFormat: "dd-mm-yy",
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        maxDate: "-18Y",
        changeYear: true,
        defaultDate: "-18Y -11m"
    }); 
    //Esta funcion elimina el formulario de Registro
    $(".cerrarFormularioRegistro").click(function(){
        //Borra todo lo que hubiera antes
        $("body").css("overflow", "initial");
        $(".slide li span").css("filter", "blur(0px)");
        $("#formularioRegistro").css("display", "none");
        $("#nav").css("filter", "none");
        $("#logo").css("filter", "none");
        $("#slogan").css("filter", "none");
        $("#cover").css("filter", "none");
        $("body").css("overflow", "auto");
        $(".abajo").show(); 
    });
    $(".botonRegistroMovilCerrar").click(function(){
        //Borra todo lo que hubiera antes
        $("#formularioRegistroMovil").hide();
        $(".abajo").show(); 
        $("#formularioRegistroMovil #contenedorFormularioRegistroMovil .contenedorInput input").val("");
        $("#formularioRegistroMovil #contenedorFormularioRegistroMovil .contenedorInput input").focusout();
    });
    
    
   //Esta función sirve hace que suba el scroll cuando ser pulsa + 
    $( "#more, #less" ).click(function() {
        console.log($(this).children());
        console.log($(window).height());
        if($(this).children().text()==="+"){
            $("html, body").animate({ scrollTop: ($(window).height()/1.5) }, 1000, function(){
                $("#more").hide();
                $("#less").show();
            });            
        } else {
            $("html, body").animate({ scrollTop: 0 }, 1000, function(){
                $("#more").show();
                $("#less").hide();
            });            
        }
    });
    
    //Esta función cambia el contenido de more dependiendo de la posición del scroll
    $(document).scroll(function(){
        if($(this).children().text()==="+"){
            $("#more span").text("-");
        } else {
            $("#more span").text("+");
        }
    });
    
    //Ajax para el login(email)
    $("#emailUsuario").focusout(function(){
        var email = $("#emailUsuario").val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(email===""){
            $(".email").css("background-image", "none");
        } else {            
            if(regex.test(email)){
                $.ajax({
                    url: "../Controller/consultasLogin.php",
                    method: "GET",
                    data: "emailUsuario=" + email,
                    success: function(result){
                        if(result==="false"){
                            $(".email").css("background-image", "url('../View/img/wrong.png')");
                            $("#emailUsuario").focus();
                        } else {
                            $(".email").css("background-image", "url('../View/img/check.png')");
                            $("#passUsuario").attr("disabled", false);
                            $("#passUsuario").focus();
                        }
                    }
                });
            } else {
                $(".email").css("background-image", "url('../View/img/wrong.png')");
                $("#passUsuario").attr("disabled", true);
                $("#emailUsuario").focus();
            }
        }
    });
    
    //Ajax para el login(password)
    $("#passUsuario").focusout(function(){
        var passUs = $("#passUsuario").val();
        var email = $("#emailUsuario").val();
        if(email===""){
            $(".nombre").css("background-image", "none");
        } else {
            $.ajax({
                url: "../Controller/consultasLogin.php",
                method: "GET",
                data: "emailUsuario=" + email + "&passUsuario=" + passUs,
                success: function(result){
                    if(result==="true"){
                        $(".password").css("background-image", "url('../View/img/check.png')");
                        $(".botonLogin").show();
                    } else {
                        $(".password").css("background-image", "url('../View/img/wrong.png')");
                    }
                }
            });
        }
    });
    
    //Borra los mensajes de error de la comprobación del login
    $("#nomUsuario").keyup(function(){
        if($("#nomUsuario").val()==""){
            $(".nombre").css("background-image", "none");
        }
    });
    $("#passUsuario").keyup(function(){
        if($("#passUsuario").val()==""){
            $(".password").css("background-image", "none");
        }
    });
    
    
    //Muestra el datepicker
    $( "#datepicker" ).datepicker({
        altFormat: "dd-mm-yy",
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        maxDate: "-18Y",
        changeYear: true,
        defaultDate: "-18Y -11m"
    }); 
    
    
    //Funciones para el Registro(email)
    $("#emailUsuarioRegistro").focusout(function(){
        var email = $("#emailUsuarioRegistro").val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(email===""){
            $(".email").css("background-image", "none");
        } else {            
            if(regex.test(email)){
                $.ajax({
                    url: "../Controller/consultasLogin.php",
                    method: "GET",
                    data: "emailUsuario=" + email,
                    success: function(result){
                        if(result==="true"){
                            $(".emailRegistro").css("background-image", "url('../View/img/wrong.png')");
                            $("#nomUsuarioRegistro").attr("disabled", true);
                            $("#passUsuarioRegistro").attr("disabled", true);
                            $("#passUsuarioRepetirRegistro").attr("disabled", true);
                            $("#datepicker").attr("disabled", true);
                            $("#codigoPostal").attr("disabled", true);
                            $("#datepicker").attr("disabled", true);
                            $("#codigoPostal").attr("disabled", true);
                            $("#emailUsuarioRegistro").focus();
                        } else {
                            $(".emailRegistro").css("background-image", "url('../View/img/check.png')");
                            $("#nomUsuarioRegistro").attr("disabled", false);
                            $("#nomUsuarioRegistro").focus();
                        }
                    }
                });
            } else {
                $(".emailRegistro").css("background-image", "url('../View/img/wrong.png')");
                $("#nomUsuarioRegistro").attr("disabled", true);
                $("#passUsuarioRegistro").attr("disabled", true);
                $("#passUsuarioRepetirRegistro").attr("disabled", true);
                $("#enviarFormulario").attr("disabled", true);
                $("#datepicker").attr("disabled", true);
                $("#codigoPostal").attr("disabled", true);
                $("#emailUsuarioRegistro").focus();
            }
        }       
    });
    //Funciones para el Registro(nombre)
    $("#nomUsuarioRegistro").focusout(function(){
        var nomUsRegistro = $("#nomUsuarioRegistro").val();
        if(nomUsRegistro===""){
            $(".nombreRegistro").css("background-image", "url('../View/img/wrong.png')");
            $("#passUsuarioRegistro").attr("disabled", true);
            $("#passUsuarioRepetirRegistro").attr("disabled", true);
            $("#siguiente").attr("disabled", true);
            $("#datepicker").attr("disabled", true);
            $("#codigoPostal").attr("disabled", true);
            $("#nomUsuarioRegistro").focus();
        } else {
            $(".nombreRegistro").css("background-image", "url('../View/img/check.png')");
            $("#passUsuarioRegistro").attr("disabled", false);
            $("#passUsuarioRegistro").focus();
        }
    });
    //Funciones para el Registro(password)
    $("#passUsuarioRegistro").focusout(function(){
        var passUsRegistro = $("#passUsuarioRegistro").val();
        if(passUsRegistro===""){
            $(".passwordRegistro").css("background-image", "url('../View/img/wrong.png')");
            $("#passUsuarioRepetirRegistro").val("");
            $(".passwordRegistroRepetir").css("background-image", "none");
            $("#passUsuarioRepetirRegistro").attr("disabled", true);
            $("#datepicker").attr("disabled", true);
            $("#codigoPostal").attr("disabled", true);
            $("#passUsuarioRegistro").focus();
        } else {
            $(".passwordRegistro").css("background-image", "url('../View/img/check.png')");
            $("#passUsuarioRepetirRegistro").attr("disabled", false);
            $("#passUsuarioRepetirRegistro").focus();
        }
    });
    
    //Funciones para el Registro(confirmarPassword)
    $("#passUsuarioRepetirRegistro").focusout(function(){
        var pass = $("#passUsuarioRegistro").val();
        var passRepetirUsRegistro = $("#passUsuarioRepetirRegistro").val();
        if(passRepetirUsRegistro!==pass){
            $(".passwordRegistroRepetir").css("background-image", "url('../View/img/wrong.png')");
            $("#datepicker").attr("disabled", true);
            $("#codigoPostal").attr("disabled", true);
            $("#passUsuarioRepetirRegistro").focus();
        } else {
            $(".passwordRegistroRepetir").css("background-image", "url('../View/img/check.png')");
            $("#codigoPostal").attr("disabled", false);
            $("#codigoPostal").focus();
        }
    });
    //Funciones para el Registro(confirmarPassword)
    $("#passUsuarioRepetirRegistro2").focusout(function(){
        var pass = $("#passUsuarioRegistro2").val();
        var passRepetirUsRegistro = $("#passUsuarioRepetirRegistro2").val();
        if(passRepetirUsRegistro!==pass){
             $("#passUsuarioRepetirRegistro2").val("");
            $("#passUsuarioRepetirRegistro2").focus();
        }
    });
    
    //Funciones para recoger la ciudad y la provincia a partir del código postal
    var ciudad = null;
    var provincia = null;
    $("#codigoPostal").focusout(function(){
        $(".fechNacRegistro").css("background-image", "none"); 
        $("#datepicker ~ .ui-datepicker").hide();
        var codPos = $("#codigoPostal").val();
        var client = new XMLHttpRequest();
        var latitud;
        var longitud;        
        client.open("GET", "http://api.zippopotam.us/es/" + codPos, true);
        client.onreadystatechange = function() {
            if(client.readyState == 4) {
                var respuesta = jQuery.parseJSON(client.responseText);
                if(typeof respuesta.places ==='undefined'){
                    $(".codigoPostal").css("background-image", "url('../View/img/wrong.png')");
                    $("#datepicker").attr("disabled", true);
                    $("#codigoPostal").focus();
                    $("#enviarFormulario").hide();
                } else {
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
                            $(".codigoPostal").css("background-image", "url('../View/img/check.png')");
                            $("#datepicker").attr("disabled", false);
                            $("#datepicker").focus();
                            $("#datepicker ~ .ui-datepicker").show();
                        }
                    });
                }
            };
        };
        client.send();
    });  
    
    //Funciones para recoger la ciudad y la provincia a partir del código postal
    var ciudad = null;
    var provincia = null;
    $("#codigoPostal2").focusout(function(){
        var codPos = $("#codigoPostal2").val();
        var client = new XMLHttpRequest();
        var latitud;
        var longitud;        
        client.open("GET", "http://api.zippopotam.us/es/" + codPos, true);
        client.onreadystatechange = function() {
            if(client.readyState == 4) {
                var respuesta = jQuery.parseJSON(client.responseText);
                if(typeof respuesta.places ==='undefined'){
                    $("#codigoPostal2").focus();
                } else {
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
                            $("input[name='provincia']").val(provincia);
                            $("input[name='localidad']").val(ciudad);
                        }
                    });
                }
            };
        };
        client.send();
    });  
    //Funciones sobre el datepicker
    $("#datepicker").focusout(function(){
           $(".fechNacRegistro").css("background-image", "url('../View/img/check.png')"); 
           $(".mandarDatos").css("display", "block");
           $("#datepicker").attr("disabled", true);
    });
    
    //Inserta usuario en la base de datos
    $(".mandarDatos").click(function(){
        var email = $("#emailUsuarioRegistro").val();
        var nombre = $("#nomUsuarioRegistro").val();
        var pass = $("#passUsuarioRegistro").val();
        var fecha = $("#datepicker").val();
        if((email=="")){
            $("#emailUsuarioRegistro").focus();
        } else if(nombre==""){
            $("#nomUsuarioRegistro").focus();
        } else if(pass=""){
            $("#passUsuarioRegistro").val();
        } else if(fecha==""){
            $("#datepicker").val();
        } else{     
            $("#contenedorFormularioRegistro").hide();
            $("#loader").show();
            setTimeout(function() {
                $.ajax({
                    async: false,
                    url: "../Controller/registrarUsuario.php",
                    method: "GET",
                    data: "emailUsuarioRegistro="+email+"&nomUsuarioRegistro="+nombre+"&passUsuarioRegistro="+pass+"&fechNac="+fecha+"&provincia="+provincia+"&localidad="+ciudad,
                    success: function(result){                    
                        console.log("Usuario insertado");
                        $(".slide li span").css("filter", "blur(0px)");
                        $("#formularioRegistro").css("display", "none");
                        $("#nav").css("filter", "none");
                        $("#logo").css("filter", "none");
                        $("#slogan").css("filter", "none");
                        $("#cover").css("filter", "none");
                        $("body").css("overflow", "auto");
                        //Toast
                        $("#toast").addClass("show");
                        setTimeout(function(){ $("#toast").removeClass("show"); }, 3000);}
                });
            }, 3000);
        }
    });
    
    
    //Hace aparecer el explorar
    $("#explorar").click(function(){
       generaListaEventos();
       $("body").css("overflow", "hidden");
       $(".slide li span").css("filter", "blur(10px)");
       $("#explorarFormulario").show();
       $("#searchBar").val("");
       $("#searchBar").css("background-image", "url('../View/img/search.png')");
       $("#nav").css("filter", "blur(2px)");
       $("#logo").css("filter", "blur(4px)");
       $("#slogan").css("filter", "blur(3px)");
       $("#cover").css("filter", "blur(3px)");
       $("body").css("overflow", "hidden");       
       $("input").val(""); 
       $("#searchBar").focus();
        $("#explorarEventosTabla").hide();
        $(".abajo").hide(); 
    });
    function generaListaEventos(){
        var str="";
        for(var x = 0; x < listaEventos.length; x++){
            var linea =  "<tr><td class=\"nombreDeporte\">" + listaEventos[x]['NomDep'] + "</td><td>" + listaEventos[x]['NomInst'] + "</td><td>" + listaEventos[x]['FechEven'] +"</td><td>"+ listaEventos[x]['HoraEven'] +"</td><td>" + listaEventos[x]['NivelEven']  +"</td><td>" + listaEventos[x]['UsuariosFaltantes']  +"</td></tr>";
            str = str + linea;
        }
        $("#explorarEventosTabla").append(str);
    }
    var listaEventos;
    $.ajax({
            url: "../Controller/gestionaEventos.php",
            method: "GET",
            data: "busqueda=" + true,
            success: function(result){
                var output =JSON.parse(result);
                listaEventos = output;
            }
        });
        
    $("#searchBar").keyup(function(){        
        if($("#searchBar").val()===""){
            $("#searchBar").css("background-image", "url('../View/img/search.png')");
            $("#explorarEventosTabla").hide();
            $(".nombreDeporte").parent().show();
        } else {
            $("#searchBar").css("background-image", "none");
            var valor = $("#searchBar").val();
            $("#explorarEventosTabla").show();
            $(".nombreDeporte").each(function(){
                var str = $(this).html().toUpperCase();
                if(str.includes($("#searchBar").val().toUpperCase())){
                    $(this).parent().show();
                } else {
                    $(this).parent().hide();
                }
            });
            
        }
    });
    $(".cerrarExplorar").click(function(){
        $("body").css("overflow", "initial");
        $(".slide li span").css("filter", "blur(0px)");
        $("#explorarFormulario").hide();
        $("#nav").css("filter", "none");
        $("#logo").css("filter", "none");
        $("#slogan").css("filter", "none");
        $("#cover").css("filter", "none");
        $("body").css("overflow", "auto");
        $(".abajo").show(); 
    });
    
    //Hace aparecer el goTeam
    $("#goTeam").click(function(){
       $("body").css("overflow", "hidden");
       $(".slide li span").css("filter", "blur(10px)");
       $("#contenedorGoTeam").css("display", "flex");
       $("#nav").css("filter", "blur(2px)");
       $("#logo").css("filter", "blur(4px)");
       $("#slogan").css("filter", "blur(3px)");
       $("#cover").css("filter", "blur(3px)");
       $("body").css("overflow", "hidden");   
       $(".abajo").show();           
    });
    //Esta funcion elimina el goteam
    $(".cerrarGoTeam").click(function(){
        $("body").css("overflow", "initial");
        //Borra todo lo que hubiera antes
        $(".slide li span").css("filter", "blur(0px)");
        $("#contenedorGoTeam").css("display", "none");
        $("#nav").css("filter", "none");
        $("#logo").css("filter", "none");
        $("#slogan").css("filter", "none");
        $("#cover").css("filter", "none");
        $("body").css("overflow", "auto");
        $("#video").each(function () { this.pause(); });
        $(".abajo").show(); 
    });
});
