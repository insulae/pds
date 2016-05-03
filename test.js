var registros = [];

function cargaJS(){
	
	crearGraf();
	otrosValores();
	
	}
function rompoJS(){
	//limpio testSource
	if(testCometa){
		testCometa.close();
		testCometa = null;
	}
	
	//limpio gauges truchos
	clearInterval(cargaValores);
}

$("#btnRec").click(function () {
	if ($("#btnRec").hasClass("RecActivo")) {
		$("#btnRec").removeClass("RecActivo");
		guardarValores();
		$('#btnRec').text("Rec");
		$('#cartel').text("Test Mode");
		$('#cartel').removeClass("cartel-rec");
		
	} else {
		$("#btnRec").addClass("RecActivo");
		$('#btnRec').text("600");
		$('#cartel').text("Grabando");
		$('#cartel').addClass("cartel-rec");
		window.setTimeout(function () {
			//alert("OK");
			$("#btnRec").removeClass("RecActivo");
			guardarValores();
		}, 10000);
	}
});


function guardarValores () {
	//console.log(JSON.stringify(valores, "", " "));
	$.ajax({		
		url:   'test_data.php?accion=guardar',
		type:  'post',
		data: { 
			registros : JSON.stringify(registros)
		},
		success: function (datos) {
			console.log("Se guardo Ok: " + datos);
		}
	});
}

function rango(range) {
  // TODO implement your calculation using range.min and range.max
  var min = 0;
  var max = 2500;
  return {min: min, max: max};
}

/* DIBUJO GRAFICA */
var datos = [new TimeSeries(), new TimeSeries()];
//var datos = new TimeSeries();
testCometa = new EventSource('test_cometa.php');

testCometa.addEventListener('message', function(e) {
	var dataCometa = JSON.parse(e.data);
	console.log(dataCometa);
	datos[0].append(new Date().getTime(), dataCometa.sensores.voltaje);
	datos[1].append(new Date().getTime(), dataCometa.sensores.amperaje);
	if ($("#btnRec").hasClass("RecActivo")) {
		registros.push(dataCometa);
		$('#btnRec').text(parseInt($('#btnRec').text())-1);
	}
}, false);
/*
setInterval(function() {
  getData.append(new Date().getTime(), valor);
}, 500);
*/
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
/* DIBUJO GRAFICA */


function otrosValores(){
	cargaValores = setInterval(function() {
		/*########### simulacion corriente #############*/
		var corriente = $.ajax({
			url:   'getData.php?data=corriente',
		    type:  'post',
		    success:  function (carga) {
			   // alert(response);
				cienxcien = 115/800; //calcularlo sacando la propiedad width del objeto 170 es 170px
				valor=carga*cienxcien;
				$("#corriente-carga").css("height", valor+"px"); //aplico el nuevo relleno
				$("#corriente-valor").text(carga);
						
				if(carga <= 200){
					$("#corriente-carga").css("background", "#2b63dd"); //aplico color rojo
				}
				else if(carga <= 800){
					$("#corriente-carga").css("background", "#2bd7dd"); //aplico color amarillo
				}
			}
		});
		/*########### simulacion bateria #############*/
		var valorbat = 80;
		if($("#valorobjeto").val() == "bateria" || valorbat != "" ){
			//carga= $("#valormanual").val();
			carga=valorbat;
		
			cienxcien = 150/100; //calcularlo sacando la propiedad width del objeto 170 es 170px
			valor=carga*cienxcien;
			$("#bateria-carga").css("height", valor+"px"); //aplico el nuevo relleno
			$("#bateria-valor").text(carga);
					
			if(carga <= 50){
				$("#bateria-carga").css("background", "red"); //aplico color rojo
			}
			else if(carga <= 80){
				$("#bateria-carga").css("background", "yellow"); //aplico color amarillo
			}
			else if(carga <= 100){
				$("#bateria-carga").css("background", "green"); //aplico color verde
			}
		}

		/*########### simulacion temperatura #############*/

		var valortem = 30;
		if($("#valorobjeto").val() == "temperatura" || valortem != "" ){
			//carga= $("#valormanual").val();
			carga = valortem;
		
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
		}

		/*########### simulacion humedad #############*/

		var valorhum = 90;
		if($("#valorobjeto").val() == "humedad" || valorhum != "" ){
			//carga= $("#valormanual").val();
			carga = valorhum;
			
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
		}

		/*########### presion #############*/
		
		var valorpre = 8;
		if($("#valorobjeto").val() == "presion" || valorpre != "" ){
			//var valor = $("#valormanual").val(); //saco valor a rellenar
			valor = valorpre;
			 			
			var diezpor100 = '15'; //seteo el 10% equivalente al 10% de los pixeles del svg
			//para ajax var valor = Math.floor((Math.random()*10)); //saco valor a rellenar
			porciento = valor / diezpor100;
			
			$("#presion").css("width", valor*diezpor100+"px"); //aplico el nuevo relleno
			$("#presion-valor").text(valor*10+"%"); //aplico el nuevo relleno
			//aplico color dependiendo porcentaje
			//alert(porciento);
			if(valor <= 5){
				$("#presion").css("background", "#d9534f"); //aplico color rojo
			}
			else if(valor <= 8){
				$("#presion").css("background", "#f0ad4e"); //aplico color amarillo
			}
			else if(valor <= 10){
				$("#presion").css("background", "#5cb85c"); //aplico color verde
			}
			}
	//Simulación para reloj voltaje
	$.ajax({
		url:   'getData.php?data=oscilacion',
	    type:  'post',
	    success:  function (response) {
	    	$("#voltaje-aguja").css("transform", "rotate("+response+"deg)");
	    	if(response == 0){
	    		$("#voltaje-valor").css("color", "yellow");
	    	}
	    	else if(response > 0){
	    		$("#voltaje-valor").css("color", "green");
	    	}
	    	else if(response < 0){
	    		$("#voltaje-valor").css("color", "red");
	    	}
	    	$("#voltaje-valor").text(response);
	    }	
	});
	}, 3000);
	
}
