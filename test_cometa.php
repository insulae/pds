<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

require ("sys/com/sensores.php");


//seteo el ciclo del cometa si es pantalla o no
if($_REQUEST[display] == true){
	$refresco = 900000;
}else{
	$refresco = 100000;
}

$errorCom = 0;
while (true) {
	
	//$cadena = com_virtual();
	$cadena = exec('head -n 1 pdsDATA');
	//$cadena = 'ERROR'; // test de error
	
	//controlo checksum
	$errorXor = getXor($cadena);
	
	
	if($cadena != "errorCOM" || $cadena == "" || $errorXor = 1){
		$registro = new stdClass(); 


			//GENERO SENSORES
			$sensores = Array();
			
			
			// CALCULO VOLTAJE
			$voltaje = (hexdec(substr($cadena,6,4)))*0.0333377; //voltaje es *0.03...
			$sensores[$sensor1] = round($voltaje,3);

			// CALCULO AMPERAJE
 			$sensores[$sensor2] = ((hexdec(substr($cadena,10,4)))*2.605)-1344; //mantener aqui ultimo valor
			$sensores[$sensor2] = round($sensores[$sensor2],1);

			// CALCULO BATERIA
			if($voltaje >= 25.4){
 				$bateria = 100;
 			}else if($voltaje < 20){
 				$bateria = 0;
 			}else{
 				$bateria=($voltaje*14.07)-258;
	 			$bateria = round($bateria,1);
 			}
			$sensores[$sensor3] = $bateria; 	
 			//$sensores[$sensor3] = hexdec(substr($cadena,14,4));
			//$sensores[$sensor4] = hexdec(substr($cadena,20,4));
			//$sensores[$sensor5] = hexdec(substr($cadena,24,4));
			//$sensores[$sensor6] = hexdec(substr($cadena,28,4));
 		

			//genero y cargo fecha
			$d = new DateTime(date('Y-m-d H:i:s'));
			$registro->fyh = $d->format("Y-m-d H:i:s");
		
			//genero y cargo microsegundos
			$t = microtime(true);
			$micro = sprintf("%06d", ($t - floor($t)) * 1000000);	
			$registro->mseg = substr($micro,0,3);
	
			//cargo sensores
			$registro->sensores = $sensores;

			//echo "data: " . $cadena . "\n\n"; //debug
			echo "data: " . json_encode($registro). "\n\n";	//produccion
			
	}else{
		if($errorCom > 3){
			echo "data: " . json_encode("errorCOM"). "\n\n";	//produccio
			$errorCom == 0;
		}else{
			$errorCom++;
		}
	}
	
	ob_end_flush();
	flush();
	usleep($refresco);
	//usleep(100000);	
	//usleep(1000000);
}
//xor
function getXOR($cadena) {
	$xorLocal = 0;
	$datos = substr($cadena,17,-2);
	$xorArduino = substr($cadena,17,2);
	
	for ($i=0; $i<strlen($datos); $i++) {
		$xorLocal = $xorLocal ^ $datos[$i];
	}
	
	if($xorLocal != $xorArduino){
		return 1;
	}else{
		return 0;
	}
}
	

function com_virtual(){
		return "'b000106"
		."0".rand(0,5).rand(0,9).rand(0,9) //random desde diez para que no rompa el formato de la cadena
		."00".rand(1,2).rand(1,8)
		."00".rand(0,6).rand(0,4)
		."00".rand(0,3).rand(0,9)
		."00".rand(5,6).rand(0,4)
		."00".rand(0,6).rand(0,4);
}

/*
observacion
fyh_inicio
id_avion
[
voltaje
amperaje
temperatura
humedad
presion
	cadena : 000106050506060707080809090A0A,
	fecha : date("Y-m-d"),
	sensores : {
		voltaje: 0505,
		amperaje: 0606,
		bateria: 0707,
		temperatura: 0808,
		presion: 0909,
		humedad: 0A0A
	}
]
*/
?>
