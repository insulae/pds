//creo los array para la data de la grafica	
var checksVoltaje = [];
var checksAmperaje = [];
var dataVoltajeMostrar = [];
var dataAmperajeMostrar = [];
	

function cargaJS(){
	
	//datepicker
	$('.checks-fecha').datepicker({
		language: 'es',
		endDate: '0d',
		autoclose:true,
		todayHighlight: true,
		format: 'yyyy-mm-dd'
	});
	
	//cargo tabla
	traerChecks();
	
}
function rompoJS(){
	
}

/* traer checks */
function traerChecks(){
	$.ajax({		
		url:   'checks_data.php?accion=traerChecks',
	    type:  'post',
		data:{ 
			avion: avion,
			fdesde: $('#checks-fdesde').val(),
			fhasta: $('#checks-fhasta').val()
		},
	    success:  function (datos) {
	    	
	    	//limpio tabla y arrays
	    	$('#checks-tabla tbody').remove();	
	    	checksVoltaje = [];
	    	checksAmperaje = [];
	    	dataVoltajeMostrar = [];
	    	dataAmperajeMostrar = [];
	    		

	    	//parseo nuevos datos
	    	var check = JSON.parse(datos);
    		
	    	for (var i=0; i<check.length; i++) {
	    		var fila='<tr class="tr-check">';
    			//fila+='<td>'+check[i].patente+'</td>';
    			fila+='<td>'+check[i].fyh+'</td>';
    			fila+='<td>'+check[i].voltaje+'</td>';
    			fila+='<td>'+check[i].amperaje+'</td>';
    			fila+='<td style="text-align:left; padding-left:10px">'+check[i].observacion+'</td>';
    			fila+='<td><span class="glyph-icon flaticon-close ico-eliminar"></span></td>';
    			fila+='<td id="id-check" class="td-hidden">'+check[i].id_check+'</td></tr>';

	    		$('#checks-tabla').append(fila);
	    		
	    		//construyo la data para la grafica
	    			checksVoltaje.push({x: new Date(check[i].fyh), y: check[i].voltaje });
	    			checksAmperaje.push({x: new Date(check[i].fyh), y: check[i].amperaje});
		    }
	    	//armo data de voltaje para enviar a grafica
	    	dataAmperajeMostrar=[
	    	                   	{
	    	                   		label: '',
	    	                   		strokeColor: '#8ae234',
	    	                   		pointStrokeColor: "#8ae234",
	    	                   		data: checksAmperaje
	    	                   	}		
	    	                   ];
	    	//armo data de voltaje para enviar a grafica  
	    	dataVoltajeMostrar=[
	        	                   	{
	        	                   		label: '',
	        	                   		strokeColor: '#00ffff',
	        	                   		pointStrokeColor: "#00ffff",
	        	                   		data: checksVoltaje
	        	                   	}		
	        	                   ];
	    }	
	});
	 
}

/* eliminar Check */
$('#checks-tabla').on('click', '.ico-eliminar', function(event) {
	celdaActiva = $(this).parent().parent();
	celdaActiva.addClass('tr-check-activo');
	 checkElimino = $(this).parent().parent().find("#id-check").html();
		$.confirm({
		    title: 'Eliminación',
		    content: 'Esta a punto de eliminar el avión: '+ avion,
		    confirm: function(){
		    	eliminarAvion(avion);
				celdaActiva.removeClass('tr-check-activo');
		    },
			cancel: function(){
				celdaActiva.removeClass('tr-check-activo');
			}
		});
});

/* filtro seleccion de checks */
$('#btn-filtrar').click(function(){
	traerChecks();
});


$('#btn-checks-mostrar').click(function(){
	rompoJS();
	$('#pagina').load('checks_mostrar.php');
	$.getScript('checks_mostrar.js', function() {cargaJS();});
});