var regRec = [];
var regCrank = [];
var cadena = "";
var temultimo ="";
var humultimo ="";
var batultimo="";
var preultimo ="";
var esFreeze ="";

//rec
var recActivo = 0;
//crank
var crankActivo = 0;
var guardandoCrank = 0;
var ampAnt = 0;
var graboCrank;

function cargaJS(){	
	crearGraf();
	//cometa();
}

function rompoJS(){
	//mato testCometa si es que hay una instancia al abrir TEST
	if(testCometa){
		testCometa.close();
		testCometa = null;
	}
}

/* #################################################### DIBUJO GRAFICA #################################################### */

//mato testCometa si es que hay una instancia al abrir TEST
//if(testCometa){
//	testCometa.close();
//	testCometa = null;
//}


//ver si aplicamos para el autorango
function rango(range) {
	  var min = 0;
	  var max = 1500;
	  return {min: min, max: max};
}


var datos = [new TimeSeries(), new TimeSeries()];

testCometa = new EventSource('test_cometa.php');

//bandera para primer amperaje
var ampBan = 0;

//traigo datos
testCometa.addEventListener('message', function(e) {
	var dataCometa = JSON.parse(e.data);
	cadena = dataCometa;
	//console.log(e.data); //debug de lo que viene
	//return true;
	//console.log(batultimo);
	
	//cargo valores a voltaje y amperaje
	mostrarVoltaje(parseInt(dataCometa.sensores.vol));
	var amperaje = dataCometa.sensores.amp;
	mostrarAmperaje(parseInt(amperaje));
	
	//cambio gauges si hay cambio
	if(batultimo != dataCometa.sensores.bat){
		mostrarBateria(parseInt(dataCometa.sensores.bat));
		batultimo = dataCometa.sensores.bat;
	}
	if(temultimo != dataCometa.sensores.tem){
		mostrarTemperatura(parseInt(dataCometa.sensores.tem));
		temultimo = dataCometa.sensores.tem;
	}	
	if(preultimo != dataCometa.sensores.pre){
		mostrarPresion(parseInt(dataCometa.sensores.pre));
		preultimo = dataCometa.sensores.pre;
	}	
	if(humultimo != dataCometa.sensores.hum){
		mostrarHumedad(parseInt(dataCometa.sensores.hum));
		humultimo = dataCometa.sensores.hum;
	}
	
	//dibujo lineas del grafico
	datos[0].append(new Date().getTime(), dataCometa.sensores.vol*37.5); //62.5 es para que se equipare a 2500 de amperaje // 37.5 para 1500
	datos[1].append(new Date().getTime(), dataCometa.sensores.amp);
	
	
	//##### grabacion de REC si esta activo
	if ($("#btnRec").hasClass("RecActivo")) {
		regRec.push(dataCometa);
		$('#btnRec').text(parseInt($('#btnRec').text())-1);
		//si el boton llego a 0 doy por finalizada la grabacion
		if(parseInt($('#btnRec').text()) == 0){
			terminoGrabacion();
		}
	}
	
	// ########### CONTROL DE ACTIVACION DE CRANK Y CREACION DE DATOS DEL CRANK ##########
	if(parseInt(amperaje-ampAnt)>crankDif && ampAnt > 0 && crankActivo == 0 && guardandoCrank ==0){
			crankActivo = 1;
			graboCrank = true;
			seteoCartel();
			setTimeout(function(){graboCrank = false},duracionCrank);
	}
	ampAnt = amperaje;
	
	// GRABO CRANK
	if(crankActivo == 1){
		//console.log("grabo crank: "+ cadena);
		if(graboCrank){
			regCrank.push(cadena);	
		}else{
			crankActivo = 0;
			guardandoCrank = 1;
			seteoCartel()
			//lleno combo motor
			for (var i = 1; i <= avion_motores; i++) {
				
				$('#motor-crank').append('<option value=' + i+ '>' + i+ '</option>');
			}
			if(avion_apu == 1){
				$('#motor-crank').append('<option value="0">APU</option>');
			}
			//levanto Alta Crank
			$('#modalAltaCrank').modal('show');
		}
	}		
	// ########### FIN CRANK ############
	
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



/* #################################################### CRANK #################################################### */

//accion de eliminar todo tipo de test (cierro modal)
$('#descartar-crank').click(function(){
	guardandoCrank= 0;	
	$('#modalAltaCrank').modal('hide');
});

//accion de guardar todo tipo de test (cierro modal)
$('#guardar-crank').click(function(){
	guardarGrabacion(1,regCrank); //0 indica que no es crank
	guardandoCrank = 0;	
	$('#modalAltaCrank').modal('hide');
});
/* #################################################### CRANK #################################################### */






/* #################################################### GRABACION #################################################### */ 


//seteo cartel para crank y rec
function seteoCartel(){
	
	//hay crank y rec
	if(crankActivo==1 && recActivo ==1){
		$('#cartel').text(tex_cartel_rec_crank);
		$('#cartel').addClass("cartel-rec");
		
	//hay solo crank		
	}else if(crankActivo==1 && recActivo ==0){
		$('#cartel').text(tex_cartel_soloCrank);
		$('#cartel').addClass("cartel-rec");
		
	//hay solo rec
	}else if(crankActivo==0 && recActivo ==1){
		$('#cartel').text(tex_cartel_soloRec);
		$('#cartel').addClass("cartel-rec");
	
	//no hay nada
	}else if(crankActivo==0 && recActivo ==0){
		$('#cartel').text(tex_cartel);
		$('#cartel').removeClass("cartel-rec");		
	}
}

//accion inicio grabacion
$("#btnRec").click(function () {
	if ($("#btnRec").hasClass("RecActivo")) {
		$("#btnRec").removeClass("RecActivo");
		//grabacion frenada por usuario
		terminoGrabacion();
		$('#btnRec').text("Rec");
		recActivo = 0;
		seteoCartel();
	} else {
		$("#btnRec").addClass("RecActivo");
		$('#btnRec').text("24"); //seteo tiempo 240 1min
		recActivo = 1;
		seteoCartel();
	}
});

//accion al terminar grabacion
function terminoGrabacion(){
	//vuelvo boton a estado normal
	$("#btnRec").removeClass("RecActivo");
	$('#btnRec').text("Rec");
	recActivo = 0;
	seteoCartel();
	$('#modalAltaGraba').modal('show');
}

//accion de eliminar todo tipo de test (cierro modal)
$('#descartar-graba').click(function(){
	$('#modalAltaGraba').modal('hide');
});

//accion de guardar todo tipo de test (cierro modal)
$('#guardar-graba').click(function(){
	guardarGrabacion(0,regRec); //0 indica que no es crank
	$('#modalAltaGraba').modal('hide');
});

//guardo grabacion en base
function guardarGrabacion(tipo,registros) {
	if(tipo == 0){
		observacion = $('#observacion-graba').val();
		motor_apu = 0;
	}else if(tipo == 1){
		observacion = $('#observacion-crank').val();
		motor_apu = $('#motor-crank').val();
	}
	//console.log(JSON.stringify(registros));
	$.ajax({		
		url:   'test_data.php?accion=guardarGrabacion'
		,type:  'post'
		,data: { 
			registros : JSON.stringify(registros)
			,id_avion: id_avion			
			,observacion: observacion
			,crank:	tipo //0 = grabacion, 1 = crank
			,motor_apu: motor_apu
		},
		success: function (datos) {
			//console.log("Se guardo Ok: " + datos); //para debug de como va el arreglo
			if(tipo == 0){
				regRec = [];	
			}else if(tipo == 1){
				regCrank = [];	
			}
		}
	});
}

/* #################################################### GRABACION #################################################### */



/* #################################################### CHECKS & FREEZE #################################################### */

//accion inicio CHECK
$("#btnCheck").click(function () {
	esFreeze = 0;
	$('#modalAltaCheck').modal('show');
});
//accion inicio FREEZE
$("#btnFreeze").click(function () {
	esFreeze = 1;
	$('#modalAltaCheck').modal('show');
});

//accion de eliminar CHECK/FREEZE (cierro modal)
$('#descartar-check').click(function(){
	$('#modalAltaCheck').modal('hide');
});

//accion de guardar CHECK/FREEZE(cierro modal)
$('#guardar-check').click(function(){
	var cadenaCheck = cadena;
	guardarCheck(cadenaCheck, esFreeze);
	$('#modalAltaCheck').modal('hide');
});

//guardo check/freeze en base
function guardarCheck(cadena, esFreeze) {
	console.log(JSON.stringify(cadena));
	$.ajax({		
		url:   'test_data.php?accion=guardarCheck',
		type:  'post',
		data: { 
			cadena : JSON.stringify(cadena)
			,id_avion: id_avion			
			,observacion: $('#observacion-check').val()
			,freeze: esFreeze
		},
		success: function (datos) {
			console.log("Se guardo Ok: " + datos); //para debug de como va el arreglo
		}
	});
}
/* #################################################### CHECKS AND FREEZE #################################################### */


/* ###################### VOLTAJE GAUGE ################## */
function mostrarVoltaje(dato){
	var grado;
	if(dato >= 20){
		grado = parseInt(dato-20)* 6.50;  //para lograr 130º 130/40 = 3.25
	}else if(dato < 20){
		grado = parseInt(20-dato)* -6.50;
	}
	$("#voltaje-aguja").css("transform", "rotate("+grado+"deg)");
	if( (dato >= 0 && dato < 20) || (dato >= 30 && dato <= 40)){
		$("#voltaje-valor").css("color", "red");
	}
	else if( (dato >= 20 && dato < 24) || (dato >= 29 && dato < 30)){
		$("#voltaje-valor").css("color", "yellow");
	}
	else if(dato >= 24 && dato <=29){
		$("#voltaje-valor").css("color", "#00ff00");
	}
	$("#voltaje-valor").text(dato);
	if(dato == 0){
		$("#voltaje-valor").text("00");
	}
}

/* ###################### AMPERAJE GAUGE ################## */
function mostrarAmperaje(dato){
	//dato = 1000;
	var grado;
	if(dato >= 750){
		grado = parseInt(dato-750)*0.17333; //para lograr 130º 130/1500 = 
	}else if(dato < 750){
		grado = parseInt(750-dato)*-0.17333;
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

	cienxcien = 170/100; //calcularlo sacando la propiedad width del objeto 170 es 170px
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
	
	cienxcien = 130/100; //calcularlo sacando la propiedad width del objeto 170 es 170px (en este caso 100 positivo y 70 negativo)
	valor=carga*cienxcien;
	$("#temperatura-carga").css("height", valor+"px"); //aplico el nuevo relleno
	$("#temperatura-valor").text(carga);
			
	if(carga >= 60 || carga < -20){
		$("#temperatura-carga").css("background", "red"); //aplico color rojo
	}
	else if((carga >= 40 && carga <= 60) || (carga >= -20 && carga < 10)){
		$("#temperatura-carga").css("background", "yellow"); //aplico color amarillo
	}
	else if(carga >= 10 && carga < 40){
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
	 			
	cienxcien = 156/100; //calcularlo sacando la propiedad width del objeto 30px
	valor=carga*cienxcien;
	
	$("#presion").css("width", valor+"px"); //aplico el nuevo relleno
	$("#presion-valor").text(carga+"%"); //aplico el nuevo relleno
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
