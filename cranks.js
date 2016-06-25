cranksSelec = [];
cranksObservaciones = [];
function cargaJS(){
	cargaIdioma();
	//seteo fechas para datepicker
	var todayTime = new Date();
	var ano = todayTime.getFullYear();
    var mes = todayTime.getMonth()-1;
    var dia = todayTime.getDate();
	//datepicker
	$('.cranks-fecha').datepicker({
		language: idioma_cod,
		endDate: '0d',
//		defaultViewDate: { year: ano, month: mes, day: dia },
		autoclose:true,
		todayHighlight: true,
		format: 'yyyy-mm-dd'
	});
	
	$('#cranks-fdesde').val(ano+'-'+parseInt(mes+1)+'-'+dia);
	$('#cranks-fhasta').val(ano+'-'+parseInt(mes+2)+'-'+dia);
	//cargo tabla
	
	//cargo tabla
	traerCranks();
	
}
function rompoJS(){
	
}

/* traer cranks */
function traerCranks(){
	$.ajax({		
		url:   'cranks_data.php?accion=traerCranks',
	    type:  'post',
		data:{ 
			id_avion: id_avion
			,fdesde: $('#cranks-fdesde').val()
			,fhasta: $('#cranks-fhasta').val()
		},
	    success:  function (datos) {
	    	//limpio tabla
	    	$('#cranks-tabla tbody').remove();
	    	//limpio cantidad de cranks seleccionados
	    	$('#cranks_cant').text('0');
	    	$('.cranks-cant label').removeClass('cranks-cant-full');
	    	//parseo nuevos datos
	    	var crank = JSON.parse(datos);
	    	for (var i=0; i<crank.length; i++) {
	    		//calculo par impar
	    		if(i % 2 == 0) {nro = 1;}else{nro = 2;}
	    		var fila='<tr class="tr-crank">';
	    			//fila+='<td>'+crank[i].patente+'</td>';
	    			fila+='<td>'+crank[i].motor_apu+'</td>';
	    			fila+='<td>'+crank[i].fyh+'</td>';
	    			fila+='<td id="obs-crank" style="text-align:left; padding-left:10px">'+crank[i].observacion+'</td>';
	    			fila+='<td><span class="glyph-icon flaticon-close ico-eliminar"></span></td>';
	    			fila+='<td id="id-crank" class="td-hidden">'+crank[i].id_rec+'</td>';
	    			fila+='</tr>';
	    		$('#cranks-tabla').append(fila);
		    }
	    }	
	});
	 
}

/* filtro seleccion de cranks */
$('#btn-filtrar').click(function(){
	traerCranks();
});

/* seleccionar avion */
$('#cranks-tabla').on('click', '.tr-crank', function(event) {
	if($(this).hasClass('tr-crank-activo')){
		$(this).removeClass('tr-crank-activo');
		$('#cranks_cant').text(parseInt($('#cranks_cant').text())-1);
	}else{
		//controlo la cant de cranks seleccionados
		if($('#cranks_cant').text()< 5){
			//selecciono
			$(this).addClass('tr-crank-activo');
			//alert($(this).find("#id-crank").html());
			$('#cranks_cant').text(parseInt($('#cranks_cant').text())+1);
			//cambio color para marcar maximo alcanzado
			if($('#cranks_cant').text() == 5){
				$('.cranks-cant label').addClass('cranks-cant-full');
			}
		}
	}
	//$(this).addClass('tr-crank-activo').siblings().removeClass('tr-crank-activo');
});

/* eliminar Cranks */
$('#cranks-tabla').on('click', '.ico-eliminar', function(event) {
	if(loginAdmin != 1){
		$.alert('No posee permisos de administrador');
		return;
	}
	celdaActiva = $(this).parent().parent();
	celdaActiva.addClass('tr-crank-elimino');
	 crankElimino = $(this).parent().parent().find("#id-crank").html();
		$.confirm({
		    title: tex_alert_cranks_titulo,
		    confirmButton: tex_alert_confirmar,
		    cancelButton: tex_alert_cancelar,
		    content: tex_alert_cranks_contenido,
		    confirm: function(){
		    	eliminarCrank(crankElimino);
				celdaActiva.removeClass('tr-crank-elimino');
				celdaActiva.removeClass('tr-crank-activo');
		    },
			cancel: function(){
				celdaActiva.removeClass('tr-crank-elimino');
				celdaActiva.removeClass('tr-crank-activo');
			}
		});
});

function eliminarCrank(crank){
	$.ajax({		
		url:   'cranks_data.php?accion=eliminarCrank',
	    data:{
	    	id_rec: crank
	    },
	    type:  'post',
	    success:  function (resultado) {
	    	if(resultado.trim() !=""){
	    		$.alert('<b>Error Numero:<br></b>'+resultado);
	    	}
	    	traerCranks();
	    }	
	});
}

$('#btn-cranks-mostrar').click(function(){
	
	$("#cranks-tabla tr").each(function (){
		if($(this).hasClass('tr-crank-activo')){
			//VER ESTO CON ALE PARA VER SI ASI CONVIENE alert($(this).find("#id-crank").html());
			cranksSelec.push($(this).find("#id-crank").html());
			cranksObservaciones.push($(this).find("#obs-crank").html());
		}
	});
	if($('#cranks_cant').text() > 0){
		rompoJS();
		$('#pagina').load('cranks_mostrar.php');
	}else{
		$.alert(tex_alert_cranks_seleccion);
	}

});

cargaJS();
