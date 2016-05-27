var grabaVoltaje = [];
var grabaAmperaje = [];
var datosGrafica="";
var temaGrafica='';
function cargaJS(){
	$('#btn-volt').addClass('btn-activo');
	$('#ico-volt').addClass('ico-activo');
	temaGrafica = 'voltaje';
	
	traerDatos();
}
function rompoJS(){
	
}

$('#btn-amp').click(function(){
	datosGrafica = grabaAmperaje;
	dibujoGrafica();
	$('#ico-amp').addClass('ico-activo');
	$('#btn-amp').addClass('btn-activo');
	$('#ico-volt').removeClass('ico-activo');
	$('#btn-volt').removeClass('btn-activo');
	temaGrafica = 'amperaje';
});
$('#btn-volt').click(function(){
	datosGrafica = grabaVoltaje;
	dibujoGrafica();
	$('#ico-volt').addClass('ico-activo');
	$('#btn-volt').addClass('btn-activo');
	$('#ico-amp').removeClass('ico-activo');
	$('#btn-amp').removeClass('btn-activo');
	temaGrafica = 'voltaje';
});

/* DIBUJO GRAFICA */
function dibujoGrafica(){
  	//creo la grafica
	var chart = new CanvasJS.Chart("graba-graf",
	{
		theme: 'voltaje',
		width:910,
		zoomEnabled: true,
		title:{
			text: "" 
		},
		animationEnabled: false,
		axisX:{
			labelAngle: 30,
			 valueFormatString: "mm:ss.ff"
		},
		axisY :{
			includeZero:false
		},
		ToolTip: {
			enabled: false
		},
	    data: [
			    {
			     type: "spline",
			     color: "#14E9FF",
			     dataPoints: datosGrafica
		}]	 
	});
	
	chart.render();
} 

function traerDatos() {
	//console.log(JSON.stringify(valores, "", " "));
	$.ajax({		
		url:   'grabaciones_data.php?accion=traerDatos',
		type:  'post',
		data: { 
			id_rec : id_rec		
		},
		success: function (datos) {
			//console.log("Se guardo Ok: " + datos); //para debug de como va el arreglo
			var datos = JSON.parse(datos);
	    	for (var i=0; i<datos.length; i++) {
	    		sensores= JSON.parse(datos[i].sensores);
	    		grabaVoltaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: parseInt(sensores.vol) });
	    		grabaAmperaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: parseInt(sensores.amp)});
	    	}
	    datosGrafica = grabaVoltaje;
	    dibujoGrafica();	
		}
	});
}
/* DIBUJO GRAFICA */

