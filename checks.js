//creo los array para la data de la grafica	
var checksVoltaje = [];
var checksAmperaje = [];
var datosGrafica="";
var temaGrafica='';

function cargaJS(){
	
	//seteo fechas para datepicker
	var todayTime = new Date();
	var ano = todayTime.getFullYear();
    var mes = todayTime.getMonth()-1;
    var dia = todayTime.getDate();
	//datepicker
	$('.checks-fecha').datepicker({
		language: idioma_cod,
		endDate: '0d',
		defaultViewDate: { year: ano, month: mes, day: dia },
		autoclose:true,
		todayHighlight: true,
		format: 'yyyy-mm-dd'
	});
	
	$('#checks-fdesde').val(ano+'-'+parseInt(mes+1)+'-'+dia);
	$('#checks-fhasta').val(ano+'-'+parseInt(mes+2)+'-'+dia);
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
			id_avion: id_avion,
			fdesde: $('#checks-fdesde').val(),
			fhasta: $('#checks-fhasta').val()
		},
	    success:  function (datos) {
	    	
	    	//limpio tabla y arrays
	    	$('#checks-tabla tbody').remove();	
	    	checksVoltaje = [];
	    	checksAmperaje = [];

	    	//parseo nuevos datos
	    	var check = JSON.parse(datos);
    		
	    	for (var i=0; i<check.length; i++) {
	    		var sensores = JSON.parse(check[i].sensores);
	    		var fila='<tr class="tr-check">';
    			//fila+='<td>'+check[i].patente+'</td>';
    			fila+='<td>'+check[i].fyh+'</td>';
    			fila+='<td>'+sensores.vol+'</td>';
    			fila+='<td>'+sensores.amp+'</td>';
    			fila+='<td style="text-align:left; padding-left:10px">'+check[i].observacion+'</td>';
    			fila+='<td><span class="glyph-icon flaticon-close ico-eliminar"></span></td>';
    			fila+='<td id="id-check" class="td-hidden">'+check[i].id_check+'</td></tr>';

	    		$('#checks-tabla').append(fila);
	    		//construyo la data para la grafica
	    			checksVoltaje.push({label:"BAT: "+sensores.bat + "\nTEM: "+sensores.tem , x: new Date(check[i].fyh), y: parseInt(sensores.vol) });
	    			checksAmperaje.push({label:"BAT: "+sensores.bat + "\nTEM: "+sensores.tem , x: new Date(check[i].fyh), y: parseInt(sensores.amp)});
		    }
	    }	
	});
}

/* eliminar Check */
$('#checks-tabla').on('click', '.ico-eliminar', function(event) {
	if(loginAdmin != 1){
		$.alert('No posee permisos de administrador');
		return;
	}
	celdaActiva = $(this).parent().parent();
	celdaActiva.addClass('tr-check-elimino');
	 checkElimino = $(this).parent().parent().find("#id-check").html();
		$.confirm({
		    	title: tex_alert_checks_titulo,
		    	confirmButton: tex_alert_confirmar,
		    	cancelButton: tex_alert_cancelar,
		    	content: tex_alert_checks_contenido,
		    	confirm: function(){
		    	eliminarCheck(checkElimino);
				celdaActiva.removeClass('tr-check-activo');
		    },
			cancel: function(){
				celdaActiva.removeClass('tr-check-activo');
			}
		});
});

function eliminarCheck(check){
	$.ajax({		
		url:   'checks_data.php?accion=eliminarCheck',
	    data:{
	    	id_check: check
	    },
	    type:  'post',
	    success:  function (resultado) {
	    	if(resultado.trim() !=""){
	    		$.alert('<b>Error Numero:<br></b>'+resultado);
	    	}
	    	traerChecks();
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
	$('#pagina').ready(function() {
		$.getScript('checks_mostrar.js', function() {cargaJS();});
	});
});
