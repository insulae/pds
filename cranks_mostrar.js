function cargaJS(){
	//alert(JSON.stringify(dataVoltajeMostrar, "", " "));
	$("#btn-sensor").attr("sensor", 1);
	crearGraf();
}
function rompoJS(){
	
}

/* DIBUJO GRAFICA */
var colorLinea=["#fce94f","#13E2E0","#73d216", "#FA1717", "#EC96FE"];

var j = cranksSelec.length-1;
for (var i = 0; i <cranksSelec.length; i++) {
	$("#cranks-iconos").append('<span id="crank-'+i+'" class="glyph-icon flaticon-graphic cranks-iconos" style="color:'+colorLinea[i]+'">'+parseInt(i+1)+'</span>');
	$('#crank-'+[i]).attr("indice",j);
	$('#crank-'+[i]).click(function(){
		$('#crank-observacion').text(cranksObservaciones[$(this).attr("indice")]);
		console.log($(this).attr("indice"));
	});	
	j--;
}
function crearGraf(){
  	//creo la grafica
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
			avion: avion
			,sensor: $("#btn-sensor").attr("sensor")
			,cranksSelec: cranksSelec
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
