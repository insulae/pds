function cargaJS(){
	//alert(JSON.stringify(dataVoltajeMostrar, "", " "));
	$("#btn-sensor").attr("sensor", 1);
	crearGraf();
}
function rompoJS(){
	
}

/* DIBUJO GRAFICA */
function crearGraf(){
  	//creo la grafica
	var colorLinea=["red","blue","yellow"];
	var chart = new CanvasJS.Chart("graf-cranks",
	{
		theme: 'cranks',
		width:910,
		zoomEnabled: true,
		//zoomType: "xy",
		title:{
			text: "" 
		},
		animationEnabled: false,
		axisX:{
			labelAngle: 30
		},
		axisY :{
			includeZero:false
		},
		ToolTip: {
			enabled: false
		},
		   data: datosGrafica(colorLinea)
	});
	chart.render();
} 

function datosGrafica(colorLinea){

		
	/* traer Cranks */
	var enviarDatos;
	$.ajax({		
		url:   'cranks_data.php?accion=traerCranksDatos',
	    type:  'post',
	    async: false,
		data:{ 
			avion: avion,
			sensor: $("#btn-sensor").attr("sensor")
		},
	    success:  function (datos) {	    	
	    	//parseo nuevos datos
	    	var crank = JSON.parse(datos);

	    	vector=[];
	    	for (var i=0; i<crank.length; i++) {
	    	    	var crank = JSON.parse(datos);
	    	    	for (var i=0; i<crank.length; i++) {
	    	    			puntos = crank[i].puntos;
	    	    			datos={};
			    			datos.type="spline";
			    			datos.markerSize=0,
			    			datos.lineThickness=1.5;
			    			datos.dataPoints= puntos;
			    			datos.color=colorLinea[i];
			    			vector.push(datos);
	    	    	}		
	    	 }
			vector.push(datos);
			enviarDatos= vector;

	    }
		
	});
	return enviarDatos;
}
/* DIBUJO GRAFICA */

$('#btn-sensor').click(function(){
	if($("#btn-sensor").attr("sensor") == 1){
			$("#btn-sensor").attr("sensor", 2);
			$("#btn-sensor").text('Amp');
			$("#btn-sensor").css('background-color','#bb3fbf');			
			
	}else{
		$("#btn-sensor").attr("sensor", 1);
		$("#btn-sensor").text('Volt');
		$("#btn-sensor").css('background-color','#ff0000');		
	}
	crearGraf();
});
