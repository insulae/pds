function cargaJS(){
	/* carga tabla  */
	traerUsuarios();
}


/*##################################### AVION AVION ##########################*/

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
	agregarAvion();
});

/* eliminar Avion */
$('#aviones-tabla').on('click', '.btn-accion-eliminar', function(event) {
	 avionEliminar = $(this).parent().parent().find("#celda-avion").html();
	$.confirm({
	    title: 'Eliminación',
	    content: 'Esta a punto de eliminar el avión: '+ avionEliminar,
	    confirm: function(){
	    	eliminarAvion(avionEliminar);
	    }
	});
});

$('#modalAltaAvion').on('hidden.bs.modal', function () {
alert("ok");
});



/*###################### funcionses a base ######################*/

$('#btn-buscar').click(function(){
	traerAviones();
});

/* traer Aviones  */
function traerUsuarios() {
	$.ajax({		
		url:   'inicio_data.php?accion=traerUsuarios',
	    type:  'post',
	    success:  function (datos) {
	    	var usuario = JSON.parse(datos);
	    	console.log(JSON.stringify(datos));
	    	//limpio tabla
	    	$('#usuario-tabla tbody').remove();
	    	if(usuario){
		    	for (var i=0; i<usuario.length; i++) {	    		
		    		var fila='<tr class="tr-usuario"><td id="celda-usuario">'+usuario[i].nombre+'</td>';
		    			fila+='<td>'+usuario[i].usuario+'</td>';
		    			fila+='<td>'+usuario[i].tipo+'</td>';
		    			fila+='<td><span class="glyph-icon flaticon-tool-2 btn-accion-editar"></span><span class="glyph-icon flaticon-close btn-accion-eliminar"></span></td>';
		    			fila+='</tr>';
		    			
		    		$('#usuarios-tabla').append(fila);
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