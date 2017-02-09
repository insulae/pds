function cargaJS() {
	/* carga tabla  */
	cargaIdioma();
	traerWifis();
}

var reloj;
var conReloj = 0;


/*##################################### wifi wifi ##########################*/

/* seleccionar wifi */
$('#wificonf-tabla').on('click', '.tr-wifi', function(event) {
	  $(this).addClass('tr-wifi-activo').siblings().removeClass('tr-wifi-activo');
	  wifi = $(this).find("#celda-wifi").html();
	  $('#wifi-nombre').attr('value',wifi);
	  $('#wifi-conectar').removeClass('disabled');
});

/* guardar wifi */
$('#wifi-conectar').on('click', function() {
	guardarWifi();
	relojConectando();
});

$('#refresca-wifi').click(function(){
	$('#wificonf-tabla tbody').remove();
	$('#estado-wifi').css('visibility','visible');
	traerWifis();
});

function relojConectando(){
	reloj = setInterval(function () {
		$('#reloj').toggleClass('conectando');
		conReloj++;
		if(conReloj > 20){
			clearInterval(reloj);
			$('#wifi-conectar').addClass('disabled');
			$('#reloj').removeClass('conectando');
		}
	}, 700)
}

/*###################### funciones a base ######################*/

/* traer Usuarios  */
function traerWifis() {
	$.ajax({		
		url:   'wificonf_data.php?accion=traerWifis',
	    type:  'post',
	    success:  function (datos) {
	    	var wifi = JSON.parse(datos);
	    	//console.log(JSON.stringify(datos));
	    	//limpio tabla
	    	$('#wificonf-tabla tbody').remove();
	    	if(wifi) {
		    	for (var i=0; i < wifi.length; i++) {
		    		if(wifi[i].encriptacion == "on"){
		    			wifi[i].encriptacion = '<span class="glyph-icon flaticon-candado-cerrado icon-acciones"></span>';
		    		}else{
		    			wifi[i].encriptacion = '<span class="glyph-icon flaticon-candado-abierto icon-acciones"></span>';
		    		}
		    		var senal = parseInt(wifi[i].senal);
		    		if(senal > 95){
		    			wifi[i].senal = '<span class="glyph-icon flaticon-wifi-5 icon-acciones"></span>';
		    		}else if(senal > 80){
		    			wifi[i].senal = '<span class="glyph-icon flaticon-wifi-4 icon-acciones"></span>';
		    		}else if(senal > 60){
		    			wifi[i].senal = '<span class="glyph-icon flaticon-wifi-3 icon-acciones"></span>';
		    		}else if(senal > 40){
		    			wifi[i].senal = '<span class="glyph-icon flaticon-wifi-2 icon-acciones"></span>';
		    		}else if(senal > 20){
		    			wifi[i].senal = '<span class="glyph-icon flaticon-wifi-1 icon-acciones"></span>';
		    		}else{
		    			wifi[i].senal = '<span class="glyph-icon flaticon-wifi-0 icon-acciones"></span>';
		    		}
		    		var fila='<tr class="tr-wifi">';
		    			fila+='<td id="celda-wifi" style="font-size: 0.8em;">'+wifi[i].nombre+'</td>';
		    			fila+='<td style="padding-right:20px">'+wifi[i].encriptacion+'</td>';
		    			fila+='<td>'+wifi[i].senal+'</td>';
		    			fila+='<td></td>';
		    			fila+='<td id="id-wifi" class="td-hidden">'+wifi[i].nombre+'</td>';
		    			fila+='</tr>';
		    			
		    		$('#wificonf-tabla').append(fila);
			    }
	    	}
			$('#estado-wifi').css('visibility','hidden');
	    }	
	});
}
/* guardar wifi  */
function guardarWifi() {
	$.ajax({		
		url:   'wificonf_data.php?accion=guardarWifi',
	    type:  'post',
	    data: {
	    	wifi_nombre:$('#wifi-nombre').val(),
	    	wifi_clave:$('#wifi-clave').val()
	    },
	    success:  function () {
	    	//console.log(JSON.stringify(datos));
	    	//limpio tabla
            if(pdsDevel == 0){
                conectarWifi();
            }
	    }
	});
}
function conectarWifi(){
    $.ajax({
		url:   'wificonf_data.php?accion=conectarWifi',
	    type:  'post',
	    success:  function () {
	    	//TODO chequear que conecta y dar mensaje
            alert("todo");
	    }	
	});
}
cargaJS();
