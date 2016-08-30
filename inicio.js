function cargaJS(){
	cargaIdioma();
	//SETEO VARIABLES DE TEXTO
	$('#patente').attr("placeholder",tex_patente);
	$('#login-usuario').attr("placeholder",tex_login_usuario);
	$('#login-clave').attr("placeholder",tex_login_clave);
	$('#alta-avion-patente').attr("placeholder",tex_alta_avion_patente);
	$('#alta-avion-motores').attr("placeholder",tex_alta_avion_motores);
	$('#alta-avion-observacion').attr("placeholder",tex_alta_avion_observacion);
	
	//ejecuto comprobacion de logeo al cargar
	loginChequeo();
	
	/* carga tabla  */
	traerAviones();
	
}



/*############################ LOGIN ##########################*/

//login
function loginInicio(){
	$.ajax({		
		url:   'inicio_data.php?accion=login',
	    type:  'post',
		data:{ 
			usuario: $('#login-usuario').val(),
			clave: $('#login-clave').val()
		}
	});	
}

//enter login
$(document).keypress(function(e) {
  if(e.which == 13) {
  	loginInicio();
  	loginChequeo();
  }
});

//click login
$('#btn-login').click(function(){
	loginInicio();
	loginChequeo();
});



/* logeo chequeo */
function loginChequeo(){
	$.ajax({		
		url:   'inicio_data.php?accion=login_chequeo',
	    type:  'post',
	    success:  function (datos) {
	    	if(datos.trim()){
		    	datos = JSON.parse(datos);
		    	id_usuario = datos.id_usuario;
		    	if(parseInt(id_usuario) > 0){
					//escondo
					$('#login-error').css('visibility','hidden');
					$('#btn-login').css('visibility','hidden');
					$('#login-usuario').css('visibility','hidden');
					$('#login-clave').css('visibility','hidden');
	
					//muestro
					$('#login-label').text(tex_bienvenido+' '+datos.usuario);
					$('#btn-deslogin').css('visibility','visible');
					$('#configuracion').css('visibility','visible');
					
					loginEstado = 1;
					if(parseInt(datos.tipo)== 1){
						loginAdmin = 1;
					}
					//cambio tabs si hay avion seleccionado
					if(avion != ""){
						$('#tab-checks').removeClass("tabno");
						$('#tab-cranks').removeClass("tabno");
						$('#tab-grabaciones').removeClass("tabno");					
					}				
		    	}
	    	}else{
				$('#login-label').text(tex_admin_login);
				$('#btn-login').css('visibility','visible');
				$('#login-usuario').css('visibility','visible');
				$('#login-clave').css('visibility','visible');
				$('#configuracion').css('visibility','hidden');
				loginEstado = 0;				
	    	}
	    }	
	});
}	

// LOGIN
$('#btn-deslogin').click(function(){
	$.ajax({		
		url:   'inicio_data.php?accion=des_login',
	    type:  'post',
	    success:  function () {
			$('#login-label').text(tex_admin_login);
			$('#configuracion').css('visibility','hidden');
			$('#btn-deslogin').css('visibility','hidden');
			$('#btn-login').css('visibility','visible');
			$('#login-usuario').css('visibility','visible');
			$('#login-clave').css('visibility','visible');
			
			
			//cambio tabs
			$('#tab-checks').addClass("tabno");
			$('#tab-cranks').addClass("tabno");
			$('#tab-grabaciones').addClass("tabno");
			loginEstado = 0;
	    }	
	});
});
/*############################ LOGIN ##########################*/



/*##################################### AVION AVION ##########################*/

/* seleccionar avion */
$('#aviones-tabla').on('click', '.tr-avion', function(event) {
	  $(this).addClass('tr-avion-activo').siblings().removeClass('tr-avion-activo');
	  avion = $(this).find("#celda-avion").html();
	  id_avion = $(this).find("#id-avion").html();
	  avion_motores = $(this).find("#avion_motores").html();
	  avion_apu = $(this).find("#avion_apu").html();
	  $('#tab-avion').text(avion);
	  $('#tab-test').removeClass('tabno');
	  if (loginEstado == 1){
			$('#tab-checks').removeClass("tabno");
			$('#tab-cranks').removeClass("tabno");
			$('#tab-grabaciones').removeClass("tabno");
	  }
});


/* agregar Avion  */
$('#avion-agregar').click(function(){
	agregarAvion();
});

/* eliminar Avion */
$('#aviones-tabla').on('click', '.btn-accion-eliminar', function(event) {
	 avionEliminar = $(this).parent().parent().find("#celda-avion").html();
	$.confirm({
	    title: tex_eliminar_avion_tit,
	    content: tex_eliminar_avion_msg+' '+ avionEliminar,
	    confirm: function(){
	    	eliminarAvion(avionEliminar);
	    }
	});
});

$('#modalAltaAvion').on('hidden.bs.modal', function () {
console.log("ok");
});



/*###################### funcionses a base ######################*/

$('#btn-buscar').click(function(){
	traerAviones();
});

/* traer Aviones  */
function traerAviones() {
	$.ajax({		
		url:   'inicio_data.php?accion=traerAviones',
	    type:  'post',
	    data: {
	    	patente: $('#patente').val()
	    },
	    success:  function (datos) {
	    	var datos = JSON.parse(datos);
	    	
	    	//limpio tabla
	    	$('#aviones-tabla tbody').remove();
	    	if(datos){
		    	for (var i=0; i<datos.length; i++) {	    		
		    		//me fijo si tiene apu para concatenar con motor		    		
		    		var motores = datos[i].motores;
		    		if(datos[i].apu == 1){
		    			motores = motores+"<small><small>+APU</small></small>";
		    		}
		    		var fila='<tr class="tr-avion"><td id="celda-avion">'+datos[i].patente+'</td>';
		    			fila+='<td>'+motores+'</td>';
		    			fila+='<td><span class="glyph-icon flaticon-close btn-accion-eliminar"></span></td>'; //ico editar: <span class="glyph-icon flaticon-tool-2 btn-accion-editar"></span>
		    			fila+='<td id="id-avion" class="td-hidden">'+datos[i].id_avion+'</td>';
		    			fila+='<td id="avion_motores" class="td-hidden">'+datos[i].motores+'</td>';
		    			fila+='<td id="avion_apu" class="td-hidden">'+datos[i].apu+'</td>';
		    			fila+='</tr>';
		    			
		    		$('#aviones-tabla').append(fila);
			    }
	    	}
	    }	
	});
}

function agregarAvion(){
	$.ajax({		
		url:   'inicio_data.php?accion=agregarAvion',
	    type:  'post',
		data:{ 
			patente: $('#alta-avion-patente').val(),
			motores: $('#alta-avion-motores').val(),
			apu: $('#alta-avion-apu').val(),
			observaciones: $('#alta-avion-observaiones').val()
			},
		success: function(resp) {
			resp = resp.trim();
			if(resp == "0"){
				traerAviones();
				$('#modalAltaAvion').modal('toggle');
			}	
		}
		});
}

function eliminarAvion(avion){
	$.ajax({		
		url:   'inicio_data.php?accion=eliminarAvion',
	    data:{
	    	patente: avion
	    },
	    type:  'post',
	    success:  function (resultado) {
	    	
	    	if(resultado.trim() !=""){
	    		$.alert('<b>Error Numero:<br></b>'+resultado);
	    	}
	    	traerAviones();
	    }	
	});
}

cargaJS();