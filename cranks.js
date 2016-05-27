function cargaJS(){
	//datepicker
	$('.cranks-fecha').datepicker({
		language: 'es',
		endDate: '0d',
		autoclose:true,
		todayHighlight: true,
		format: 'yyyy-mm-dd'
	});
	
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
	    			fila+='<td style="text-align:left; padding-left:10px">'+crank[i].observacion+'</td>';
	    			fila+='<td><span class="glyph-icon flaticon-close icon-eliminar"></span></td>';
	    			fila+='<td id="id-crank" class="td-hidden">'+crank[i].id_crank+'</td>';
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

$('#btn-cranks-mostrar').click(function(){
	
	$("#cranks-tabla tr").each(function (){
		if($(this).hasClass('tr-crank-activo')){
			//VER ESTO CON ALE PARA VER SI ASI CONVIENE
			//http://jsfiddle.net/UZzd5/ EL DATO A GUARDAR //alert($(this).find("#id-crank").html());
		}
	});
	rompoJS();
	$('#pagina').load('cranks_mostrar.php');
	$('#pagina').ready(function() {
		$.getScript('cranks_mostrar.js', function() {cargaJS();});
	});
});