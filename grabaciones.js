var id_rec = '';
var rec_observacion = '';
var rec_fecha = '';

function cargaJS(){
	cargaIdioma();
	//seteo fechas para datepicker
	var todayTime = new Date();
	var ano = todayTime.getFullYear();
    var mes = todayTime.getMonth()-1;
    var dia = todayTime.getDate();
	//datepicker
	$('.graba-fecha').datepicker({
		language: idioma_cod,
		endDate: '0d',
		defaultViewDate: { year: ano, month: mes, day: dia },
		autoclose:true,
		todayHighlight: true,
		format: 'yyyy-mm-dd'
	});
	
	$('#graba-fdesde').val(ano+'-'+parseInt(mes+1)+'-'+dia);
	$('#graba-fhasta').val(ano+'-'+parseInt(mes+2)+'-'+dia);
	//cargo tabla
	
	//cargo tabla
	traerGraba();
}

/* traer graba */
function traerGraba(){
	$.ajax({		
		url:   'grabaciones_data.php?accion=traerGraba',
	    type:  'post',
		data:{ 
			id_avion: id_avion
			,fdesde: $('#graba-fdesde').val()
			,fhasta: $('#graba-fhasta').val()
		},
	    success:  function (datos) {
	    	//limpio tabla
	    	$('#graba-tabla tbody').remove();
	    	//limpio cantidad de graba seleccionados
	    	$('#graba_cant').text('0');
	    	$('.graba-cant label').removeClass('graba-cant-full');
	    	//parseo nuevos datos
	    	var graba = JSON.parse(datos);
	    	for (var i=0; i<graba.length; i++) {
	    		//calculo par impar
	    		if(i % 2 == 0) {nro = 1;}else{nro = 2;}
	    		var fila='<tr class="tr-graba">';
	    			//fila+='<td>'+crank[i].patente+'</td>';
	    			fila+='<td id="fecha-graba">'+graba[i].fyh+'</td>';
	    			fila+='<td id="observacion-graba" style="text-align:left; padding-left:10px">'+graba[i].observacion+'</td>';
	    			fila+='<td><span id="graba-eliminar" class="glyph-icon flaticon-close ico-eliminar"></span></td>';
	    			fila+='<td id="id-graba" class="td-hidden">'+graba[i].id_rec+'</td>';
	    			fila+='</tr>';

	    		$('#graba-tabla').append(fila);
		    }
	    }	
	});
	 
}

/* filtro seleccion de graba */
$('#btn-filtrar').click(function(){
	traerGraba();
});


/* seleccionar grabacion */
$('#graba-tabla').on('click', '.tr-graba', function(event) {
	$(this).addClass('tr-graba-activo').siblings().removeClass('tr-graba-activo');
	id_rec = $(this).find("#id-graba").html();
	rec_observacion = $(this).find("#observacion-graba").html();
	rec_fecha = $(this).find("#fecha-graba").html();
});

/* eliminar Graba */
$('#graba-tabla').on('click', '.ico-eliminar', function(event) {
	if(loginAdmin != 1){
		$.alert('No posee permisos de administrador');
		return;
	}
	celdaActiva = $(this).parent().parent();
	celdaActiva.addClass('tr-graba-elimino');
	 grabaElimino = $(this).parent().parent().find("#id-graba").html();
		$.confirm({
		    title: tex_alert_rec_titulo,
		    confirmButton: tex_alert_confirmar,
		    cancelButton: tex_alert_cancelar,
		    content: tex_alert_rec_contenido,
		    confirm: function(){
		    	eliminarGraba(grabaElimino);
				celdaActiva.removeClass('tr-graba-elimino');
				celdaActiva.removeClass('tr-graba-activo');
		    },
			cancel: function(){
				celdaActiva.removeClass('tr-graba-elimino');
				celdaActiva.removeClass('tr-graba-activo');
			}
		});
});

function eliminarGraba(graba){
	$.ajax({		
		url:   'grabaciones_data.php?accion=eliminarGraba',
	    data:{
	    	id_rec: graba
	    },
	    type:  'post',
	    success:  function (resultado) {
	    	if(resultado.trim() !=""){
	    		$.alert('<b>Error Numero:<br></b>'+resultado);
	    	}
	    	traerGraba();
	    }	
	});
}

$('#btn-graba-mostrar').click(function(){
	if(id_rec !=""){
		rompoJS();
		$('#pagina').load('grabaciones_mostrar.php');
	}else{
		$.alert(tex_alert_rec_seleccion);
	}

});

cargaJS();