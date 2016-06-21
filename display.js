var cadena = "";
var banErrorCOM = 0;

//rec
var recActivo = 0;

//crank
var crankDif = 0;
var crankActivo = 0;
var ampAnt = 0;

/* #################################################### DIBUJO GRAFICA #################################################### */

testCometa = new EventSource('test_cometa.php');

//traigo datos
testCometa.addEventListener('message', function(e) {
	var dataCometa = JSON.parse(e.data);
	cadena = dataCometa;
	//console.log(cadena);
	//console.log(e.data); //debug de lo que viene
	//return true;
	//console.log(batultimo);
	
	//cargo valores a voltaje y amperaje
	if(cadena != "errorCOM"){
		if(banErrorCOM == 1){
			banErrorCOM = 0
			seteoCartel();
		}
		mostrarVoltaje(parseInt(dataCometa.sensores.vol));
		var amperaje = dataCometa.sensores.amp;
		mostrarAmperaje(parseInt(amperaje));
			
		// ########### CONTROL DE ACTIVACION DE CRANK Y CREACION DE DATOS DEL CRANK ##########
		if(parseInt(amperaje-ampAnt)>crankDif && ampAnt > 0 && crankActivo == 0){
				crankActivo = 1;
				seteoCartel();
		}
		ampAnt = amperaje;
	
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
		$("#voltaje-valor").css("left", "35px");
		$("#voltaje-valor").text("0"+dato);
	}else if(dato > 40){
		$("#voltaje-valor").text("O.F.");
		$("#voltaje-valor").css("left", "26px");
		dato = 40;
	//reseteo a inicial
	}else{
		$("#voltaje-valor").css("left", "40px");
	}

	//calculo el grado a mover
	var grado;
	if(dato >= 20){
		grado = parseInt(dato-20)* 6.65;  //para lograr 130º 130/40 = 3.25 //135 137/20 =
	}else if(dato < 20){
		grado = parseInt(20-dato)* -6.75;
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
		$("#corriente-valor").css("left", "27px");
		dato = 1500;
	//reseteo a inicial
	}else if(dato >= 1000){
		$("#corriente-valor").css("left", "17px");
	}else if(dato > 99 && dato < 1000){
		$("#corriente-valor").css("left", "26px");
	}else if(dato > 0 && dato < 10){
		$("#corriente-valor").text("0"+dato);
		$("#corriente-valor").css("left", "40px");
	}else{
		$("#corriente-valor").css("left", "35px");
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

