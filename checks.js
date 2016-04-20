//creo los array para la data de la grafica	
var checksVoltajeMal = [];
var checksVoltajeBien = [];
var checksAmperajeMal = [];
var checksAmperajeBien = [];
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
	    	//limpio tabla
	    	$('#checks-tabla tbody').remove();

	    	//parseo nuevos datos
	    	var check = JSON.parse(datos);
    		
	    	for (var i=0; i<check.length; i++) {
	    		var fila='<tr class="tr-check">';
    			//fila+='<td>'+check[i].patente+'</td>';
    			fila+='<td>'+check[i].fyh+'</td>';
    			fila+='<td>'+check[i].voltaje+'</td>';
    			fila+='<td>'+check[i].amperaje+'</td>';
    			fila+='<td style="text-align:left; padding-left:10px">'+check[i].observacion+'</td>';
    			fila+='<td><span class="glyph-icon flaticon-close icon-eliminar"></span></td>';
    			fila+='<td id="id-check" class="td-hidden">'+check[i].id_check+'</td></tr>';

	    		$('#checks-tabla').append(fila);
	    		
	    		//construyo la data para la grafica
	    		if(check[i].voltaje < 10 || check[i].voltaje > 20){
	    			checksVoltajeMal.push({x: new Date(check[i].fyh), y: check[i].voltaje });
	    		}else{
	    			checksVoltajeBien.push({x: new Date(check[i].fyh), y: check[i].voltaje });
	    		}
	    		if(check[i].amperaje < 10 || check[i].amperaje > 20){
	    			checksAmperajeMal.push({x: new Date(check[i].fyh), y: check[i].amperaje});
	    		}else{
	    			checksAmperajeBien.push({x: new Date(check[i].fyh), y: check[i].amperaje});
	    		}	
		    }
	    	//armo data de voltaje para enviar a grafica
	    	dataAmperajeMostrar=[
	    	                   	{
	    	                   		label: 'MAL',
	    	                   		strokeColor: '#FF2A0D',
	    	                   		pointStrokeColor: "#FF2A0D",
	    	                   		data: checksAmperajeMal
	    	                   	},		
	    	                   		{
	    	                   			label: 'BIEN',
	    	                   			strokeColor: '#78FE0E',
	    	                   			pointStrokeColor: "#78FE0E",
	    	                   			data: checksAmperajeBien
	    	                   		}		
	    	                   ];
	    	//armo data de voltaje para enviar a grafica  
	    	dataVoltajeMostrar=[
	        	                   	{
	        	                   		label: 'MAL',
	        	                   		strokeColor: '#FF2A0D',
	        	                   		pointStrokeColor: "#FF2A0D",
	        	                   		data: checksVoltajeMal
	        	                   	},		
	        	                   		{
	        	                   			label: 'BIEN',
	        	                   			strokeColor: '#78FE0E',
	        	                   			pointStrokeColor: "#78FE0E",
	        	                   			data: checksVoltajeBien
	        	                   		}		
	        	                   ];
	    }	
	});
	 
}

/* filtro seleccion de checks */
$('#btn-filtrar').click(function(){
	traerChecks();
});


$('#btn-checks-mostrar').click(function(){
	rompoJS();
	$('#pagina').load('checks_mostrar.php');
	$.getScript('checks_mostrar.js', function() {cargaJS();});
});