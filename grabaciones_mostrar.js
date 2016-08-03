var grabaVoltaje = [];
var grabaAmperaje = [];
var datosGrafica="";
var datosGrafica2="";
var temaGrafica='';
var colorLinea="";

function cargaJS(){
	temaGrafica = 'voltaje';
	$('#rec-observacion').text(rec_fecha+": "+rec_observacion);
	traerDatos();
}
function rompoJS(){
	
}

$('#btn-amp').click(function(){
	if($('#btn-amp').hasClass('btn-apagado')){
		datosGrafica = grabaAmperaje;
		datosGrafica2 = grabaVoltaje;
		dibujoGrafica();
		$('#btn-amp').removeClass('btn-apagado');
	}else{
		colorLinea="#14E9FF";
		datosGrafica = grabaAmperaje;
		dibujoGraficaSola();
		$('#btn-vol').addClass('btn-apagado');
	}
});
$('#btn-vol').click(function(){
	if($('#btn-vol').hasClass('btn-apagado')){
		datosGrafica = grabaAmperaje;
		datosGrafica2 = grabaVoltaje;
		dibujoGrafica();
		$('#btn-vol').removeClass('btn-apagado');
	}else{
		colorLinea="#14E900";
		datosGrafica = grabaVoltaje;
		dibujoGraficaSola();
		$('#btn-amp').addClass('btn-apagado');
	}
});
/* DIBUJO GRAFICA */
function dibujoGrafica(){
  	//creo la grafica
	var grafica = new CanvasJS.Chart("graba-graf",
	{
		theme: 'voltaje',
		width:910,
		height:365,
		zoomEnabled: true,
		title:{
			text: "" 
		},
		animationEnabled: false,
		axisX:{
			valueFormatString: "mm:ss",
		},
		axisY :{
 			title: "AMP",
 			titleFontFamily:"lato",
 			titleFontWeight: "bold",
 			titleFontSize: 15,
			titleFontColor: "#14E9FF",
			labelFontFamily: "lato",
			labelFontWeight: "bold",
			labelFontSize: 12,
			labelFontColor: "#14E9FF",
			includeZero:false
		},
		axisY2 :{
 			title: "VOLT",
 			titleFontFamily:"lato",
 			titleFontWeight: "bold",
 			titleFontSize: 15,
			titleFontColor: "#14E900",
			labelFontFamily: "lato",
			labelFontWeight: "bold",
			labelFontSize: 12,
			labelFontColor: "#14E900",
			includeZero:false
		},		
		ToolTip: {
			enabled: false
		},
	    data: [
			    {
			     type: "spline",
			     color: "#14E9FF",
			     dataPoints: datosGrafica,
			     markerSize: "0"
			    },
			    {
			     type: "spline",
			     color: "#14E900",
			     axisYType: "secondary",
			     dataPoints: datosGrafica2,
			     markerSize: "0"
			    }
			  ]	 
	});
	
	grafica.render();
} 

function dibujoGraficaSola(){
  	//creo la grafica
	var grafica = new CanvasJS.Chart("graba-graf",
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
			 valueFormatString: "mm:ss"
		},
		axisY :{
			includeZero:false,
		},
		ToolTip: {
			enabled: false
		},
	    data: [
			    {
			     type: "spline",
			     color: colorLinea,
			     dataPoints: datosGrafica,
			     markerSize: "0"
			    }
			  ]	 
	});
	
	grafica.render();
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
	    		grabaVoltaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.vol});
	    		grabaAmperaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.amp});
	    	}
	    datosGrafica = grabaAmperaje;
	    datosGrafica2 = grabaVoltaje;
	    dibujoGrafica();	
		}
	});
}
/* DIBUJO GRAFICA */

cargaJS();