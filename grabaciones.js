id_rec = '';

function cargaJS(){
	//datepicker
	$('.graba-fecha').datepicker({
		language: 'es',
		endDate: '0d',
		autoclose:true,
		todayHighlight: true,
		format: 'yyyy-mm-dd'
	});
	
	//cargo tabla
	traerGraba();
}

/* traer graba */
function traerGraba(){
	$.ajax({		
		url:   'grabaciones_data.php?accion=traerGraba',
	    type:  'post',
		data:{ 
			avion: avion,
			fdesde: $('#graba-fdesde').val(),
			fhasta: $('#graba-fhasta').val()
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
	    			fila+='<td>'+graba[i].fyh+'</td>';
	    			fila+='<td style="text-align:left; padding-left:10px">'+graba[i].observacion+'</td>';
	    			fila+='<td><span class="glyph-icon flaticon-close icon-eliminar"></span></td>';
	    			fila+='<td id="id-graba" class="td-hidden">'+graba[i].id_rec+'</td></tr>';

	    		$('#graba-tabla').append(fila);
		    }
	    }	
	});
	 
}

/* filtro seleccion de graba */
$('#btn-filtrar').click(function(){
	traerGraba();
});

/* seleccionar avion */
$('#graba-tabla').on('click', '.tr-graba', function(event) {
	if($(this).hasClass('tr-graba-activo')){
		$(this).removeClass('tr-graba-activo');
		$('#graba_cant').text(parseInt($('#graba_cant').text())-1);
	}else{
		//cambio color para marcar maximo alcanzado
		$(this).addClass('tr-graba-activo');
		id_rec = $(this).find("#id-graba").html();
	}
	//$(this).addClass('tr-crank-activo').siblings().removeClass('tr-crank-activo');
});

$('#btn-graba-mostrar').click(function(){
	rompoJS();
	$('#pagina').load('grabaciones_mostrar.php');
	$.getScript('grabaciones_mostrar.js', function() {cargaJS();});
});