/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var customLabel = {
};

function initMap() {
    //Consigue latitud y longitud
    //
    var lat = "";
    var lng = "";
    var ciudad = $(".localidad").text();
    $.ajax({
        async: false,
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + ciudad + "&key=%20AIzaSyC5T4fsLESXq6Z0ekNO1-IR8EAaA4BLecw",
        method: "GET",
        success: function(result){                    
            lat = result.results[0].geometry.location.lat;
            lng =  result.results[0].geometry.location.lng;
            console.log(lat);
            console.log(lng);
        }
    });
    
    
    var map = new google.maps.Map(document.getElementById('map'), {
        //Cambiar esto para que lo elija dinamicamente
        center: new google.maps.LatLng(lat, lng),
        zoom: 12
    });
    var infoWindow = new google.maps.InfoWindow;
    // Change this depending on the name of your PHP or XML file
    downloadUrl('../Model/MapaXML.php', function(data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName('marker');
        Array.prototype.forEach.call(markers, function(markerElem, i) {
            var deporte = markerElem.getAttribute('deporte');
            var name = markerElem.getAttribute('name');
            var point = new google.maps.LatLng(
            parseFloat(markerElem.getAttribute('lat')),
            parseFloat(markerElem.getAttribute('lng')));
            var infowincontent = document.createElement('div');            
            var strong = document.createElement('strong');
            strong.textContent = name;
            infowincontent.appendChild(strong);
            infowincontent.appendChild(document.createElement('br'));
            var type = "";
            var icon = customLabel[type] || {};
            var marker = new google.maps.Marker({
                map: map,
                position: point,
                label: icon.label
            });
            marker.addListener('click', function() {
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker);   
                abrirInformacion(name);
            });
        });
        //MARCADORES
        var arrayMarcadores = [];
        var marcadores = xml.documentElement.getElementsByTagName('marker');
        Array.prototype.forEach.call(markers, function(markerElem, i) {
            var dataLat = markerElem.getAttribute('lat');
            var dataLng = markerElem.getAttribute('lng');
            var latLng = new google.maps.LatLng(dataLat,
            dataLng);
            var marcador = new google.maps.Marker({
                position: latLng
            });
            var marcador = new google.maps.Marker({
                position: latLng,
                map: map
            });
            arrayMarcadores.push(marcador);
        });
        var markerCluster = new MarkerClusterer(map, arrayMarcadores,
            {imagePath: '../View/img/cluster/m'}
        );
    });
}

function downloadUrl(url, callback) {
    var request = window.ActiveXObject ?
    new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };
    request.open('GET', url, true);
    request.send(null);
}

function doNothing() {}

function abrirInformacion(name){   
    if($(window).width()<500){
       $(".tablaEventosCercanos").dialog({
            autoOpen: false,
            closeOnEscape: true,
            modal: true,
            title: name,
            maxHeight: 300,
            minWidth: 200
        });
    } else {
        $(".tablaEventosCercanos").dialog({
            autoOpen: false,
            closeOnEscape: true,
            modal: true,
            title: name,
            maxHeight: 300,
            minWidth: 500
        });
    }
    $(window).resize(function() {
        $("#dialog").dialog("option", "position", "center");
    });
    $( ".tablaEventosCercanos" ).dialog( "open" );
    $.ajax({
        async: false,
        url: "../../Controller/gestionaEventos.php",
        data: "eventosInstalacion=true&instalacion=" + name,
        method: "GET",
        success: function(result){  
            var output =JSON.parse(result);
            var str = "";
            var linea = "";     
            for(var x = 0; x<output.length; x++){
                    //Controla si esta apuntado o no al evento
                    var apuntado = false;
                    $.ajax({
                        async: false,
                        url: "../../Controller/gestionaParticipacion.php",
                        data: "esApuntado=true&codEven=" + output[x][5],
                        method: "GET",
                        success: function(res){                             
                            var output2 =JSON.parse(res);
                            if(parseInt(output2[0])>0){
                                apuntado = true;
                            }
                        }
                    });
                //Una vez que ya sabe si esta apuntado genera la tabla
                var str = "<tr name=\"evento" + output[x][5] + "\">" ;
                for(var i = 0; i<(output[x].length-1); i++){
                    var clase = "";
                    if(i===0){
                        clase = "class=\"deporte\"";
                    }
                    if(i===1){
                        clase = "class=\"fecha\"";
                    }
                    if(i===2){
                        clase = "class=\"hora\"";
                    }
                    if(i===3){
                        clase = "class=\"nivel\"";
                    }
                    if(i===4){
                        clase = "class=\"plazas\"";
                    }
                    str = str + "<td " + clase +">" + output[x][i] + "</td>";                    
                }
                if(apuntado){
                    str = str + "<td class=\"opcionDialog\"><span class=\"apuntarse apuntado\" title=\"Desapuntarme del evento\" name=\"" + output[x][5] +"\"></span></td><td class=\"hiddenInstalacion\">" + name +"</td></tr>" ;
                } else {
                    str = str + "<td class=\"opcionDialog\"><span class=\"apuntarse noapuntado\" title=\"Apuntarme al evento\" name=\" " + output[x][5] +"\"></span></td><td class=\"hiddenInstalacion\">" + name +"</td></tr>" ;
                }
                linea = linea + str;
            }
            var tabla = "<table><tr><th>Deporte</th><th>Fecha</th><th>Hora</th><th>Nivel</th><th>Plazas</th><th></th></tr>" + linea + "</table>";
            $( ".tablaEventosCercanos" ).html(tabla);
            $( ".noapuntado" ).css("background-image","url('../View/img/apuntado2.png')");
            $( ".apuntado" ).css("background-image","url('../View/img/apuntado1.png')");
        }
    }); 
}
$(document).on('click', '.apuntado', function() { 
            $(this).css("background-image","url('../View/img/apuntado2.png')");
            $(this).removeClass("apuntado");
            $(this).addClass("noapuntado");
            var codeven = parseInt($(this).attr("name"));
            var plazas = $("tr[name=evento" + codeven + "] .plazas").text();
            $("tr[name=evento" + codeven + "] .plazas").text(parseInt(plazas)+1);
            $(".participacionAbiertaEventos[name=" + codeven + "]").remove();
            $.ajax({
                url: "../../Controller/gestionaParticipacion.php",
                method: "GET",
                data: "borrar=true&codEven=" + codeven,
                success: function(result){
                    $.ajax({
                        url: "../../Controller/gestionaEventos.php",
                        method: "GET",
                        data: "borrarUsuario=true&codEven=" + codeven,
                        success: function(result){
                            $("#audio2").get(0).play();                            
                        }
                    });
                }
            });       
    });
    
    
    $(document).on('click', '.noapuntado', function() {
            $(this).css("background-image","url('../View/img/apuntado1.png')");
            $(this).removeClass("noapuntado");
            $(this).addClass("apuntado");
            var codeven = parseInt($(this).attr("name"));
            var fecha = $("tr[name=evento" + codeven + "] .fecha").text();
            var hora = $("tr[name=evento" + codeven + "] .hora").text();
            var deporte = $("tr[name=evento" + codeven + "] .deporte").text();
            var instalacion = $("tr[name=evento" + codeven + "] .hiddenInstalacion").text();
            var nivel = $("tr[name=evento" + codeven + "] .nivel").text();
            var plazas = $("tr[name=evento" + codeven + "] .plazas").text();
            var fila = "<div class=\"participacionAbiertaEventos\" name=\"" + codeven + "\"><span>" + fecha + "</span><span>" + hora + "</span><span>" + deporte  + "</span><span>" + instalacion + "</span><span>" + nivel + "</span><span class=\"estadoEvento abierto\" title=\"Estado del evento\">Faltan " + (parseInt(plazas)-1)  + " participantes</span></div>";
            $("tr[name=evento" + codeven + "] .plazas").text(parseInt(plazas)-1);
            //Pone una fila mas en proximos eventos
            $(".eventosAbiertosBody").append(fila);                     
            colocaListeners();
            $.ajax({
                  url: "../../Controller/gestionaParticipacion.php",
                  method: "GET",
                  data: "nuevaParticipacion=true&codEven=" + codeven,
                  success: function(output){
                      $.ajax({
                            url: "../../Controller/gestionaEventos.php",
                            method: "GET",
                            data: "sumarUsuario=true&codEven=" + codeven,
                            success: function(result){
                            }
                        });                       
                        $("#audio").get(0).play();                         
                  }
              });
            
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



