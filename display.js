var cadena = "";
var banErrorCOM = 0;

//rec
var recActivo = 0;

//crank
var crankDif = 0;
var crankActivo = 0;
var ampAnt = 0;

/* #################################################### DIBUJO GRAFICA #################################################### */

testCometa = new EventSource('test_cometa.php?display=true');

//traigo datos
testCometa.addEventListener('message', function(e) {
	var dataCometa = JSON.parse(e.data);
	cadena = dataCometa;
	//console.log(cadena);
	//console.log(e.data); //debug de lo que viene
	//return true;
	//console.log(batultimo);
	
	//cargo valores a voltaje y amperaje
	if(cadena != "errorLectura"){
		if(banErrorCOM == 1){
			banErrorCOM = 0
			seteoCartel();	
		}
		
			var	voltaje = dataCometa.sensores.vol;
			mostrarVoltaje(voltaje);

			
			var amperaje = dataCometa.sensores.amp;
			if(amperaje > -1 && amperaje < 2){
				amperaje = 0;
			}
			mostrarAmperaje(parseInt(amperaje));
			
			mostrarBateria(dataCometa.sensores.bat);			
			
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
			seteoCartel();
			banErrorCOM = 1;
			ampAnt = 0;
		}
	}	
}, false);

/* ###################### VOLTAJE GAUGE ################## */
function mostrarVoltaje(dato){
	//armado de decimal
	var decimal = parseInt(Math.round((dato - parseInt(dato))*10));
	if(decimal == 10){
		decimal = 9;
	}
	decimal = "."+decimal;
	dato = parseInt(dato);
	//seteo color
	if( (dato >= 0 && dato < 20) || (dato >= 30)){
		$("#voltaje-valor").css("color", "red");
		$("#voltaje-valor-dec").css("color", "red");
	}
	else if( (dato >= 20 && dato <= 24) || (dato >= 29 && dato < 30)){
		$("#voltaje-valor").css("color", "yellow");
		$("#voltaje-valor-dec").css("color", "yellow");
	}
	else if(dato > 24 && dato <=29){
		$("#voltaje-valor").css("color", "#00ff00");
		$("#voltaje-valor-dec").css("color", "#00ff00");
	}
	
	//muestro los cambios
	$("#voltaje-valor").text(dato);
	$("#voltaje-valor-dec").text(decimal);
	
	//controlo vacio y overflow
	if(dato <= 0){
		dato = 0;
		$("#voltaje-valor").css("left", "45px"); //int37
		$("#voltaje-valor").text("0");
	//overflow
	}else if(dato > 0 && dato < 10){
		$("#voltaje-valor").css("left", "50px"); //int30
		$("#voltaje-valor").text(dato);
		$("#voltaje-valor-dec").css("left", "70px"); //int30
		$("#voltaje-valor-dec").text(decimal);
	}else if(dato > 10 && dato < 40){
		$("#voltaje-valor").text(dato);
		$("#voltaje-valor").css("left", "30px"); //int30
		$("#voltaje-valor-dec").text(decimal);
		$("#voltaje-valor-dec").css("left", "70px"); //int30		
	}else if(dato > 40){
		$("#voltaje-valor").css("left", "30px"); //int30
		$("#voltaje-valor").text("O.F.");
		$("#voltaje-valor-dec").text("");
		dato = 40;
	//reseteo a inicial
	}else{
		$("#voltaje-valor").text("0");
		$("#voltaje-valor-dec").text(".0");		
	
		$("#voltaje-valor").css("left", "50px"); //int35
		$("#voltaje-valor-dec").css("left", "70px"); //int35
		$("#voltaje-valor").css("color", "red");
		$("#voltaje-valor-dec").css("color", "red");
	}
}
	
function mostrarVoltaje2(dato){
	if( (dato >= 0 && dato < 20) || (dato >= 30)){
		$("#voltaje-valor").css("color", "red");
	}
	else if( (dato >= 20 && dato <= 24) || (dato >= 29 && dato < 30)){
		$("#voltaje-valor").css("color", "yellow");
	}
	else if(dato > 24 && dato <=29){
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
		$("#voltaje-valor").css("left", "45px");
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
	if(dato >= 0 && dato < 600){
		$("#corriente-valor").css("color", "#00ff00");
	}
	else if(dato >= 600 && dato < 800){
		$("#corriente-valor").css("color", "yellow");
	}
	else if(dato >= 800){
		$("#corriente-valor").css("color", "red");		
	}
	else{
		$("#corriente-valor").css("color", "#00ff00");
		dato = "00";
	}
	
	//muestro los cambios
	$("#corriente-valor").text(dato);
	
	//controlo vacio y overflow
	if(dato <= 0){
		dato = 0;
		$("#corriente-valor").css("left", "50px");
		$("#corriente-valor").text("0");
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
	
	//muevo aguja
	$("#corriente-aguja").css("transform", "rotate("+grado+"deg)");
}

function mostrarAmperaje2(dato){
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
		$("#corriente-valor").css("left", "45px");
		$("#corriente-valor").text("0");
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

/* ###################### BATERIA GAUGE ################## */
function mostrarBateria(dato){
	if(dato == 100){
		$("#bateria_graf").attr("src", "images/bateria_display_6.png");
	}else if(dato > 80){
		$("#bateria_graf").attr("src", "images/bateria_display_5.png");
	}else if(dato > 60){
		$("#bateria_graf").attr("src", "images/bateria_display_4.png");
	}else if(dato > 40){
		$("#bateria_graf").attr("src", "images/bateria_display_3.png");
	}else if(dato > 20){
		$("#bateria_graf").attr("src", "images/bateria_display_2.png");
	}else if(dato > 5){
		$("#bateria_graf").attr("src", "images/bateria_display_1.png");		
	}else if(dato > 0){
		$("#bateria_graf").attr("src", "images/bateria_display_0.png");	
	}
}

function seteoCartel(){
/*	if(cadena == "errorCOM"){
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
	}*/
}

