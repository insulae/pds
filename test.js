var regRec = [];
var regCrank = [];
var cadena = "";
var temultimo ="";
var humultimo ="";
var batultimo="";
var preultimo ="";
var esFreeze ="";
var banErrorCOM = 0;
//rec
var recActivo = 0;

//crank
var crankActivo = 0;
var guardandoCrank = 0;
var ampAnt = 0;
var contAmp = 0;
var graboCrank;

function cargaJS(){
	cargaIdioma();
	//SETEO VARIABLES DE TEXTO
	$('#observacion-graba').attr("placeholder",tex_observacion_graba);
	$('#observacion-crank').attr("placeholder",tex_observacion_crank);
	
	//creo grafica
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
//function rango(range) {
//	  var min = 0;
//	  var max = 1500;
//	  return {min: min, max: max};
//}


var datos = [new TimeSeries(), new TimeSeries()];

testCometa = new EventSource('test_cometa.php');

//traigo datos
testCometa.addEventListener('message', function(e) {
	var dataCometa = JSON.parse(e.data);
	cadena = dataCometa;
	//console.log(cadena);
	console.log(e.data); //debug de lo que viene
	//return true;
	//console.log(batultimo);
	
	
	//cargo valores a voltaje y amperaje
	if(cadena != "errorCOM"){
		if(banErrorCOM == 1){
			banErrorCOM = 0
			seteoCartel();
		}
		
		var voltaje = dataCometa.sensores.vol;
		var amperaje = dataCometa.sensores.amp;
		if(parseInt(voltaje) != 0){
			mostrarVoltaje(parseInt(voltaje));
			mostrarAmperaje(parseInt(amperaje));
			
			//dibujo lineas del grafico	
			datos[0].append(new Date().getTime(), dataCometa.sensores.vol); 
			datos[1].append(new Date().getTime(), dataCometa.sensores.amp);		
			//console.log(dataCometa.sensores.vol + "---" + dataCometa.sensores.amp);
			
		}
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
		
		//##### grabacion de REC si esta activo
		if ($("#btnRec").hasClass("RecActivo")) {
			if(parseInt(voltaje)!=0){
				regRec.push(dataCometa);	
			}
			
			$('#btnRec').text(parseInt($('#btnRec').text())-1);
			//setTimeout(function(){graboRec = false},duracionRec);
			//si el boton llego a 0 doy por finalizada la grabacion
			if(parseInt($('#btnRec').text()) == 0){
				terminoGrabacion();
			}
		}
	
		// ########### CONTROL DE ACTIVACION DE CRANK Y CREACION DE DATOS DEL CRANK ##########
		
		//controlo diferencial 3 veces para evitar ruidos y recien disparo crank
		if(parseInt(amperaje-ampAnt)>crankDif && ampAnt > 0){
			contAmp++;
		}
		if(contAmp == 0){
			ampAnt = amperaje;
		}
		
		if(contAmp > 2 && crankActivo == 0 && guardandoCrank == 0){
				//console.log("crank");
				crankActivo = 1;		//seteo que hay crank
				contAmp = 0;	
				ampAnt = 0;
				//reseteo conteo de cadenas por ruido que dispare crank
				graboCrank = true;		//seteo que grabo
				seteoCartel();
				setTimeout(function(){graboCrank = false},duracionCrank);
		}
	
		// GRABO CRANK
		if(crankActivo == 1){
			//console.log("grabo crank: "+ cadena);
			if(graboCrank){
				if(parseInt(voltaje)!=0){
					regCrank.push(cadena);	
				}
			}else{
				crankActivo = 0;
				guardandoCrank = 1;
				seteoCartel();
				//lleno combo motor
				for (var i = 1; i <= avion_motores; i++) {
				
					$('#motor-crank').append('<option value=' + i+ '>' + i+ '</option>');
				}
				if(avion_apu == 1){
					$('#motor-crank').append('<option value="0">APU</option>');
				}
				//levanto Alta Crank
				$('#modalAltaCrank').modal('show');
				$('.modal-backdrop').remove();
			}
		}		
		// ########### FIN CRANK ############
		
	}else{
		if(banErrorCOM != 1){
			mostrarVoltaje("");
			mostrarAmperaje("");
			mostrarBateria("");
			mostrarTemperatura("");
			mostrarHumedad("");
			mostrarPresion("");
			seteoCartel();
			banErrorCOM = 1;
			ampAnt = 0;
		}
	}	
}, false);


function crearGraf() {
	var chart = new SmoothieChart({
				millisPerPixel:43,
				maxValueScale:0.89,
				scaleSmoothing:0.5,
				grid:{strokeStyle:'rgba(119,119,119,0.46)',
				millisPerLine:2000,verticalSections:8},
				labels:{fontSize:8,precision:1},
				//yRangeFunction:rango,
				//timestampFormatter:SmoothieChart.timeFormatter,
				//maxValue:1500,
				minValue:0,
				horizontalLines:[
				     			{color:'#00ff00',lineWidth:0.3,value:50},
				     			]
	 			});
			
			//fillStyle:'#000000'
			interpolation:'bezier'
			
			chart.addTimeSeries(datos[0],{lineWidth:3,strokeStyle:'#00ff00'});
			chart.addTimeSeries(datos[1],{lineWidth:3,strokeStyle:'#00ffff'});

			chart.streamTo(document.getElementById("testGraf"), 1000);
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
	if(cadena == "errorCOM"){
		$('#cartel').addClass("cartel-error");
		$('#cartel').text("ERROR COM");
	}else{
		$('#cartel').removeClass("cartel-error");
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
		$('#btnRec').text(duracionRec); //seteo tiempo 240 1min
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
	$('.modal-backdrop').remove();
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
			console.log("Se guardo Ok: " + datos); //para debug de como va el arreglo
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
	$('.modal-backdrop').remove();
});
//accion inicio FREEZE
$("#btnFreeze").click(function () {
	esFreeze = 1;
	$('#modalAltaCheck').modal('show');
	$('.modal-backdrop').remove();
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
	//console.log(JSON.stringify(cadena));
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
			//console.log("Se guardo Ok: " + datos); //para debug de como va el arreglo
		}
	});
}
/* #################################################### CHECKS AND FREEZE #################################################### */


/* ###################### VOLTAJE GAUGE ################## */
function mostrarVoltaje(dato){
	if( (dato >= 0 && dato < 20) || (dato >= 30)){
		$("#voltaje-valor").css("color", "red");
	}
	else if( (dato >= 20 && dato < 24) || (dato >= 29 && dato < 30)){
		$("#voltaje-valor").css("color", "yellow");
	}
	else if(dato >= 24 && dato <=29){
		$("#voltaje-valor").css("color", "#00ff00");
	}
	$("#voltaje-valor").text(dato);
	
	//controlo vacio y overflow
	if(dato <= 0){
		$("#voltaje-valor").css("left", "47px");
		$("#voltaje-valor").text("--");
		dato = 0;
	//overflow
	}else if(dato > 0 && dato < 10){
		$("#voltaje-valor").css("left", "40px");
		$("#voltaje-valor").text("0"+dato);
	}else if(dato > 40){
		$("#voltaje-valor").text("O.F.");
		$("#voltaje-valor").css("left", "30px");
		dato = 40;
	//reseteo a inicial
	}else{
		$("#voltaje-valor").css("left", "35px");
	}
	
	//calculo el grado a mover
	var grado;
	if(dato >= 20){
		grado = parseInt(dato-20)* 6.80;  //para lograr 130º 130/40 = 3.25 //135 137/20 =
	}else if(dato < 20){
		grado = parseInt(20-dato)* -6.80;
	}		
	$("#voltaje-aguja").css("transform", "rotate("+grado+"deg)");
}

/* ###################### AMPERAJE GAUGE ################## */
function mostrarAmperaje(dato){
	//console.log(dato);
	if(dato > 0 && dato < 600){
		$("#corriente-valor").css("color", "#00ff00");
	}
	else if(dato >= 600 && dato < 800){
		$("#corriente-valor").css("color", "yellow");
	}
	else if(dato >= 800){
		$("#corriente-valor").css("color", "red");		
	}
	//muestro los cambios
	$("#corriente-valor").text(dato);
	
	//controlo vacio y overflow
	if(dato <= 0){
		dato = 0;
		$("#corriente-valor").css("left", "47px");
		$("#corriente-valor").text("--");
	//overflow
	}else if(dato > 1500){
		$("#corriente-valor").text("O.F.");
		$("#corriente-valor").css("left", "30px");
		dato = 1500;
	//reseteo a inicial
	}else if(dato >= 1000){
		$("#corriente-valor").css("left", "20px");
	}else if(dato > 99 && dato < 1000){
		$("#corriente-valor").css("left", "30px");
	}else if(dato > 0 && dato < 10){
		$("#corriente-valor").text("0"+dato);
		$("#corriente-valor").css("left", "40px");
	}else{
		$("#corriente-valor").css("left", "40px");
	}

	//calculo el grado a mover
	var grado;
	if(dato >= 750){
		grado = parseInt(dato-750)*0.18266; //para lograr 130º 130/1500 //137/750=
	}else if(dato < 750){
		grado = parseInt(750-dato)*-0.18266;
	}	
	
	//muestro los cambios
	$("#corriente-aguja").css("transform", "rotate("+grado+"deg)");
}


/* ###################### BATERIA GAUGE ################## */
function mostrarBateria(carga){
	//carga= $("#valormanual").val();
	if(isNaN(carga)){
		$("#bateria-valor").text("--");
	}else{
		cienxcien = 170/100; //calcularlo sacando la propiedad width del objeto 170 es 170px
		valor=carga*cienxcien;
		$("#bateria-carga").css("height", valor+"px"); //aplico el nuevo relleno
		$("#bateria-valor").text(carga);
	}

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
	if(isNaN(carga)){
		$("#temperatura-valor").text("--");
	}else{
		cienxcien = 130/100; //calcularlo sacando la propiedad width del objeto 170 es 170px (en este caso 100 positivo y 70 negativo)
		valor=carga*cienxcien;
		$("#temperatura-carga").css("height", valor+"px"); //aplico el nuevo relleno
		$("#temperatura-valor").text(carga);
	}
			
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
	if(isNaN(carga)){
		$("#humedad-valor").text("--");
	}else{
	cienxcien = 150/100; //calcularlo sacando la propiedad width del objeto 170 es 170px
	valor=carga*cienxcien;
	$("#humedad-carga").css("height", valor+"px"); //aplico el nuevo relleno
	$("#humedad-valor").text(carga);
	}
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
	if(isNaN(carga)){
		$("#temperatura-valor").text("--");
		$("#presion").css("width", "0px"); //aplico el nuevo relleno
	}else{	
		cienxcien = 156/100; //calcularlo sacando la propiedad width del objeto 30px
		valor=carga*cienxcien;
		$("#presion").css("width", valor+"px"); //aplico el nuevo relleno
		$("#presion-valor").text(carga+"%"); //aplico el nuevo relleno
		$("#presion").css("background", "red"); //aplico color rojo
	}
}
cargaJS();