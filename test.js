var registros = [];
var cadena = "";

function cargaJS(){	
	crearGraf();
	//cometa();
}

function rompoJS(){
	//limpio testCometa
	//if(testCometa){
	//	testCometa.close();
	//	testCometa = null;
	//}
}

/* #################################################### DIBUJO GRAFICA #################################################### */
function rango(range) {
	  var min = 0;
	  var max = 1500;
	  return {min: min, max: max};
}

var datos = [new TimeSeries(), new TimeSeries()];

//alert("Entro");
//var datos = new TimeSeries();
if(testCometa){
	testCometa.close();
	testCometa = null;
}
testCometa = new EventSource('test_cometa.php');

testCometa.addEventListener('message', function(e) {
	var dataCometa = JSON.parse(e.data);
	cadena = dataCometa;
	console.log(e.data); //debug de lo que viene
	//return true;
	mostrarVoltaje(parseInt(dataCometa.sensores.vol));
	mostrarAmperaje(parseInt(dataCometa.sensores.amp));
	mostrarBateria(parseInt(dataCometa.sensores.bat));
	mostrarTemperatura(parseInt(dataCometa.sensores.tem));
	mostrarHumedad(parseInt(dataCometa.sensores.hum));
	mostrarPresion(parseInt(dataCometa.sensores.pre));
	datos[0].append(new Date().getTime(), dataCometa.sensores.vol*37.5); //62.5 es para que se equipare a 2500 de amperaje // 37.5 para 1500
	datos[1].append(new Date().getTime(), dataCometa.sensores.amp);
	if ($("#btnRec").hasClass("RecActivo")) {
		registros.push(dataCometa);
		$('#btnRec').text(parseInt($('#btnRec').text())-1);
		//si el boton llego a 0 doy por finalizada la grabacion
		if(parseInt($('#btnRec').text()) == 0){
			terminoGrabacion();
		}
	}
}, false);


function crearGraf() {
	var chart = new SmoothieChart({
				millisPerPixel:43,
				maxValueScale:0.89,
				scaleSmoothing:0.274,
				grid:{strokeStyle:'rgba(119,119,119,0.46)',
				millisPerLine:2000,verticalSections:8},
				labels:{fontSize:8,precision:1},
				//timestampFormatter:SmoothieChart.timeFormatter,
				//maxValue:0, minValue y max se remplasan con funcion rango
				//minValue:800,
				yRangeFunction:rango,
				horizontalLines:[
				     			{color:'#ffffff',lineWidth:1,value:0},
				     			{color:'#880000',lineWidth:2,value:3333},
				     			{color:'#880000',lineWidth:2,value:-3333}
				     			]
	 			});
			
			//fillStyle:'#000000'
			
			chart.addTimeSeries(datos[0],{lineWidth:3,strokeStyle:'#00ff00'});
			chart.addTimeSeries(datos[1],{lineWidth:3,strokeStyle:'#00ffff'});

			chart.streamTo(document.getElementById("graf1200"), 1000);
}
/* #################################################### DIBUJO GRAFICA #################################################### */


/* #################################################### GRABACION #################################################### */ 

//accion inicio grabacion
$("#btnRec").click(function () {
	if ($("#btnRec").hasClass("RecActivo")) {
		$("#btnRec").removeClass("RecActivo");
		//grabacion frenada por usuario
		terminoGrabacion();
		$('#btnRec').text("Rec");
		$('#cartel').text("Test Mode");
		$('#cartel').removeClass("cartel-rec");
		
	} else {
		$("#btnRec").addClass("RecActivo");
		$('#btnRec').text("24"); //seteo tiempo 240 1min
		$('#cartel').text("Grabando");
		$('#cartel').addClass("cartel-rec");
	}
});

//accion al terminar grabacion
function terminoGrabacion(){
	//vuelvo boton a estado normal
	$("#btnRec").removeClass("RecActivo");
	$('#btnRec').text("Rec");
	$('#cartel').text("Test Mode");
	$('#cartel').removeClass("cartel-rec");
	$('#modalAltaGraba').modal('show');
}

//accion de eliminar todo tipo de test (cierro modal)
$('#descartar-graba').click(function(){
	$('#modalAltaGraba').modal('hide');
});

//accion de guardar todo tipo de test (cierro modal)
$('#guardar-graba').click(function(){
	guardarGrabacion();
	$('#modalAltaGraba').modal('hide');
});

//guardo grabacion en base
function guardarGrabacion() {
	//console.log(JSON.stringify(registros));
	$.ajax({		
		url:   'test_data.php?accion=guardarGrabacion',
		type:  'post',
		data: { 
			registros : JSON.stringify(registros),
			id_avion: id_avion,			
			observacion: $('#observacion-graba').val()
		},
		success: function (datos) {
			//console.log("Se guardo Ok: " + datos); //para debug de como va el arreglo
			registros = [];
		}
	});
}

/* #################################################### GRABACION #################################################### */


/* #################################################### CHECKS #################################################### */

//accion inicio grabacion
$("#btnCheck").click(function () {

});

//guardo grabacion en base
function guardarCheck() {
	//console.log(JSON.stringify(registros));
	$.ajax({		
		url:   'test_data.php?accion=guardarCheck',
		type:  'post',
		data: { 
			cadena : JSON.stringify(cadena),
			id_avion: id_avion,			
			observacion: $('#observacion-graba').val()
		},
		success: function (datos) {
			//console.log("Se guardo Ok: " + datos); //para debug de como va el arreglo
			registros = [];
		}
	});
}
/* #################################################### CHECKS #################################################### */


/* ###################### VOLTAJE GAUGE ################## */
function mostrarVoltaje(dato){
	var grado
	if(dato >= 20){
		grado = dato * 3.25;  //para lograr 130º 130/40 = 3.25
	}else{
		grado = dato * -3.25;
	}
	$("#voltaje-aguja").css("transform", "rotate("+grado+"deg)");
	if( (dato >= 0 && dato < 20) || (dato >= 30 && dato < 40)){
		$("#voltaje-valor").css("color", "red");
	}
	else if( (dato >= 20 && dato < 24) || (dato >= 29 && dato < 30)){
		$("#voltaje-valor").css("color", "yellow");
	}
	else if(dato >= 24 && dato <=29){
		$("#voltaje-valor").css("color", "#00ff00");
	}
	$("#voltaje-valor").text(dato);
}

/* ###################### AMPERAJE GAUGE ################## */
function mostrarAmperaje(dato){
	//dato = 1000;
	var grado
	if(dato >= 750){
		grado = dato * 0.08666; //para lograr 130º 130/1500 = 
	}else{
		grado = dato * -0.08666;
	}
	$("#corriente-aguja").css("transform", "rotate("+grado+"deg)");
	if(dato >= 0 && dato < 600){
		$("#corriente-valor").css("color", "#00ff00");
	}
	else if(dato >= 600 && dato < 800){
		$("#corriente-valor").css("color", "yellow");
	}
	else if(dato >= 800 && dato <=1500){
		$("#corriente-valor").css("color", "red");		
	}
	if(dato >= 1000){
		$("#corriente-valor").css("left", "20px");
	}else{
		$("#corriente-valor").css("left", "30px");
	}
	$("#corriente-valor").text(dato);
}


/* ###################### BATERIA GAUGE ################## */
function mostrarBateria(carga){
	//carga= $("#valormanual").val();

	cienxcien = 150/100; //calcularlo sacando la propiedad width del objeto 170 es 170px
	valor=carga*cienxcien;
	$("#bateria-carga").css("height", valor+"px"); //aplico el nuevo relleno
	$("#bateria-valor").text(carga);
			
	if(carga <= 50){
		$("#bateria-carga").css("background", "red"); //aplico color rojo
	}else if(carga <= 80){
		$("#bateria-carga").css("background", "yellow"); //aplico color amarillo
	}else if(carga <= 100){
		$("#bateria-carga").css("background", "green"); //aplico color verde
	}
	if(carga >= 100){
		$("#bateria-valor").css("left", "5px");
	}else if(carga < 10){
		$("#bateria-valor").css("left", "25px");
	}else{
		$("#bateria-valor").css("left", "15px");
	}
}

/* ###################### TEMPERATURA GAUGE ################## */
function mostrarTemperatura(carga){
	//carga= $("#valormanual").val();
	
	cienxcien = 150/100; //calcularlo sacando la propiedad width del objeto 170 es 170px
	valor=carga*cienxcien;
	$("#temperatura-carga").css("height", valor+"px"); //aplico el nuevo relleno
	$("#temperatura-valor").text(carga);
			
	if(carga <= 50){
		$("#temperatura-carga").css("background", "red"); //aplico color rojo
	}
	else if(carga <= 80){
		$("#temperatura-carga").css("background", "yellow"); //aplico color amarillo
	}
	else if(carga <= 100){
		$("#temperatura-carga").css("background", "green"); //aplico color verde
	}
	if(carga >= 100){
		$("#temperatura-valor").css("left", "5px");
	}else if(carga < 10){
		$("#temperatura-valor").css("left", "25px");
	}else{
		$("#temperatura-valor").css("left", "15px");
	}
}

/* ###################### HUMEDAD GAUGE ################## */
function mostrarHumedad(carga){
	//carga= $("#valormanual").val();
	
	cienxcien = 150/100; //calcularlo sacando la propiedad width del objeto 170 es 170px
	valor=carga*cienxcien;
	$("#humedad-carga").css("height", valor+"px"); //aplico el nuevo relleno
	$("#humedad-valor").text(carga);
			
	if(carga <= 50){
		$("#humedad-carga").css("background", "red"); //aplico color rojo
	}
	else if(carga <= 80){
		$("#humedad-carga").css("background", "yellow"); //aplico color amarillo
	}
	else if(carga <= 100){
		$("#humedad-carga").css("background", "green"); //aplico color verde
	}	
	if(carga >= 100){
		$("#humedad-valor").css("left", "5px");
	}else if(carga < 10){
		$("#humedad-valor").css("left", "25px");
	}else{
		$("#humedad-valor").css("left", "15px");
	}	
}

/* ###################### PRESION GAUGE ################## */
function mostrarPresion(carga){
	//var valor = $("#valormanual").val(); //saco valor a rellenar
	 			
	var diezpor100 = '15'; //seteo el 10% equivalente al 10% de los pixeles del svg
	//para ajax var valor = Math.floor((Math.random()*10)); //saco valor a rellenar
	porciento = 10 / diezpor100;
	
	$("#presion").css("width", carga*diezpor100+"px"); //aplico el nuevo relleno
	$("#presion-valor").text(carga*10+"%"); //aplico el nuevo relleno
	//aplico color dependiendo porcentaje
	//alert(porciento);
	if(carga <= 5){
		$("#presion").css("background", "#d9534f"); //aplico color rojo
	}
	else if(carga <= 8){
		$("#presion").css("background", "#f0ad4e"); //aplico color amarillo
	}
	else if(carga <= 10){
		$("#presion").css("background", "#5cb85c"); //aplico color verde
	}
}
