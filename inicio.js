function cargaJS(){

	//ejecuto comprobacion de logeo al cargar
	loginChequeo();
	/* ################ LOGIN ################ */
	
	
	/* carga tabla  */
	traerAviones();
}

/* ################ LOGIN ################ */

//login
function loginInicio(){
	$.ajax({		
		url:   'inicio_data.php?accion=login',
	    type:  'post',
		data:{ 
			usuario: $('#login-usuario').val(),
			clave: $('#login-clave').val()
			},
		success: function(usuario){
			usuario = usuario.trim();
				if(usuario != ""){
					loginEstado = 1;
				}	
				else{
					$('#login-error').css('visibility','visible');
				}
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
	    success:  function (usuario) {
	    	usuario = usuario.trim();
	    	if(usuario != ""){
				//escondo
				$('#login-error').css('visibility','hidden');
				$('#btn-login').css('visibility','hidden');
				$('#login-usuario').css('visibility','hidden');
				$('#login-clave').css('visibility','hidden');

				//muestro
				$('#login-label').text('Bievenido '+usuario);
				$('#btn-deslogin').css('visibility','visible');
				loginEstado = 1;
				//cambio tabs si hay avion seleccionado
				if(avion != ""){
					$('#tab-checks').removeClass("tabno");
					$('#tab-cranks').removeClass("tabno");
					$('#tab-grabaciones').removeClass("tabno");					
				}				
	    	}else{
				$('#login-label').text('Admin Login');
				$('#btn-login').css('visibility','visible');
				$('#login-usuario').css('visibility','visible');
				$('#login-clave').css('visibility','visible');
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
			$('#login-label').text('Admin Login');
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


/* traer Aviones  */
function traerAviones() {
	$.ajax({		
		url:   'inicio_data.php?accion=traerAviones',
	    type:  'post',
	    success:  function (datos) {
	    	var crank = JSON.parse(datos);
	    	
	    	//limpio tabla
	    	$('#aviones-tabla tbody').remove();
	    	for (var i=0; i<crank.length; i++) {	    		
	    		//me fijo si tiene apu para concatenar con motor
	    		var motores = crank[i].motores;
	    		if(crank[i].apu == 1){
	    			motores = motores+"<small><small>+APU</small></small>";
	    		}
	    		var fila='<tr class="tr-avion"><td id="celda-avion">'+crank[i].patente+'</td>';
	    		fila+='<td>'+motores+'</td>';
	    		fila+='<td><span class="glyph-icon flaticon-close btn-accion-eliminar"></span><span class="glyph-icon flaticon-tool-2 btn-accion-editar"></span></td></tr>';
	    		$('#aviones-tabla').append(fila);
		    }
	    }	
	});
}


/* seleccionar avion */
$('#aviones-tabla').on('click', '.tr-avion', function(event) {
	  $(this).addClass('tr-avion-activo').siblings().removeClass('tr-avion-activo');
	  avion = $(this).find("#celda-avion").html();
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
	$.ajax({		
		url:   'inicio_data.php?accion=agregarAvion',
	    type:  'post',
		data:{ 
			patente: $('#alta-avion-patente').val(),
			motores: $('#alta-avion-motores').val(),
			apu: $('#alta-avion-apu').val(),
			observaciones: $('#alta-avion-observaiones').val()
			}
		}).done(function(resp) {
			resp = resp.trim();
			if(resp == "0"){
				traerAviones();
				$('#modalAltaAvion').modal('toggle');
			}	
			else{
				alert(resp);
			}
		});
});
