var grafica;
var datosGrafVol=[];
var datosGrafAmp=[];
var graficaDoble;

function cargaJS(){
	//alert(JSON.stringify(dataVoltajeMostrar, "", " "));
	$("#btn-sensor").attr("sensor", 1);
	
	//selecciono grafica a mostrar
	if(cranksSelec.length == 1){
		traerDatosDoble(cranksSelec[0]);
		crearGrafDoble();
	}else{
		crearGraf();	
	}
}
function rompoJS(){
	grafica = null;
}

/* DIBUJO GRAFICA */
var colorLinea=["#fce94f","#13E2E0","#73d216", "#FA1717", "#EC96FE"];

var j = cranksSelec.length-1;
for (var i = 0; i <cranksSelec.length; i++) {
	$("#cranks-iconos").append('<span id="crank-'+i+'" class="glyph-icon flaticon-graphic cranks-iconos" style="color:'+colorLinea[i]+'">'+parseInt(i+1)+'</span>');
	$('#crank-'+[i]).attr("indice",j);
	$('#crank-'+[i]).click(function(){
		$('#crank-observacion').text(cranksObservaciones[$(this).attr("indice")]);
	});	
	j--;
}
function crearGraf(){
  	//creo la grafica
	grafica = new CanvasJS.Chart("graf-cranks",{
		theme: 'cranks',
		width:910,
		height:365,
		zoomEnabled: true,
		//zoomType: "xy",
		title:{
			text: "" 
		},
		animationEnabled: false,
		axisX:{
			//labelAngle: 30
		},
		axisY :{
			includeZero:false
		},
		ToolTip: {
			enabled: false
		},
		//hola mami
		   data: datosGrafica(colorLinea)
	});
	grafica.render();
} 
function datosGrafica(colorLinea){
	
	/* traer Cranks */
	var enviarDatos;
	$.ajax({		
		url:   'cranks_data.php?accion=traerCranksDatos',
	    type:  'post',
	    async: false,
		data:{ 
			id_avion: id_avion
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

function crearGrafDoble(){
  	//creo la grafica
	graficaDoble = new CanvasJS.Chart("graf-cranks",
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
			     dataPoints: datosGrafAmp,
			     markerSize: "0"
			    },
			    {
			     type: "spline",
			     color: "#14E900",
			     axisYType: "secondary",
			     dataPoints: datosGrafVol,
			     markerSize: "0"
			    }
			  ]	 
	});
	
} 

function traerDatosDoble(id_rec) {
	//console.log(JSON.stringify(valores, "", " "));
	$.ajax({		
		url:   'cranks_data.php?accion=traerDatosDoble',
		type:  'post',
		data: { 
			id_rec : id_rec		
		},
		success: function (datos) {
			//console.log("Se guardo Ok: " + datos); //para debug de como va el arreglo
			var datos = JSON.parse(datos);
	    	for (var i=0; i<datos.length; i++) {
	    		sensores= JSON.parse(datos[i].sensores);
	    		datosGrafVol.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.vol});
	    		datosGrafAmp.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.amp});
	    	}	
	    	graficaDoble.render();
		}
	});
}
/* DIBUJO GRAFICA */


$('#btn-sensor').click(function(){
	if($("#btn-sensor").attr("sensor") == 1){
			$("#btn-sensor").attr("sensor", 2);
			$("#btn-sensor").text('Amp');
			$("#btn-sensor").css('background-color','#13E2E0');			
			
	}else{
		$("#btn-sensor").attr("sensor", 1);
		$("#btn-sensor").text('Volt');
		$("#btn-sensor").css('background-color','#73d216');		
	}
	crearGraf();
});

cargaJS();