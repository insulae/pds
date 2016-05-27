function cargaJS(){
	/* carga tabla  */
	traerUsuarios();
}


/*##################################### usuario usuario ##########################*/

/* seleccionar usuario */
$('#usuarios-tabla').on('click', '.tr-usuario', function(event) {
	  $(this).addClass('tr-usuario-activo').siblings().removeClass('tr-usuario-activo');
	  usuario = $(this).find("#celda-usuario").html();
	  $('#tab-usuario').text(usuario);
	  $('#tab-test').removeClass('tabno');
	  if (loginEstado == 1){
			$('#tab-checks').removeClass("tabno");
			$('#tab-cranks').removeClass("tabno");
			$('#tab-grabaciones').removeClass("tabno");
	  }
});


/* agregar usuario  */
$('#usuario-agregar').click(function(){
	agregarUsuario();
});

/* eliminar usuario */
$('#usuarios-tabla').on('click', '.btn-accion-eliminar', function(event) {
	 usuarioEliminar = $(this).parent().parent().find("#celda-usuario").html();
	$.confirm({
	    title: 'Eliminación',
	    content: 'Esta a punto de eliminar el avión: '+ usuarioEliminar,
	    confirm: function(){
	    	eliminarUsuario(usuarioEliminar);
	    }
	});
});

$('#modalAltaUsuario').on('hidden.bs.modal', function () {
alert("ok");
});



/*###################### funcionses a base ######################*/

$('#btn-buscar').click(function(){
	traerUsuarios();
});

/* traer Usuarios  */
function traerUsuarios() {
	$.ajax({		
		url:   'configuracion_data.php?accion=traerUsuarios',
	    type:  'post',
	    success:  function (datos) {
	    	var usuario = JSON.parse(datos);
	    	//console.log(JSON.stringify(datos));
	    	//limpio tabla
	    	$('#usuarios-tabla tbody').remove();
	    	if(usuario){
		    	for (var i=0; i < usuario.length; i++) {
		    		var fila='<tr class="tr-usuario">';
		    			fila+='<td id="celda-usuario" style="font-size: 0.8em;">'+usuario[i].nombre+'</td>';
		    			fila+='<td style="padding-right:20px">'+usuario[i].usuario+'</td>';
		    			fila+='<td>'+usuario[i].tipo+'</td>';
		    			fila+='<td><span class="glyph-icon flaticon-tool-2 btn-accion-editar"></span><span class="glyph-icon flaticon-close btn-accion-eliminar"></span></td>';
		    			fila+='<td id="id-usurio" class="td-hidden">'+usuario[i].id_usuario+'</td>';
		    			fila+='</tr>';
		    			
		    		$('#usuarios-tabla').append(fila);
			    }
	    	}
	    }	
	});
}

function agregarUsuario(){
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

function eliminarUsuario(usuario){
	$.ajax({		
		url:   'inicio_data.php?accion=eliminarUsuario',
	    data:{
	    	patente: usuario
	    },
	    type:  'post',
	    success:  function (resultado) {
	    	
	    	if(resultado.trim() !=""){
	    		$.alert('<b>Error Numero:<br></b>'+resultado);
	    	}
	    	traerUsuarios();
	    }	
	});
}