<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

//seteo el ciclo del cometa si es pantalla o no
if($_REQUEST[display] == true){
	$refresco = 900000;
}else{
	$refresco = 100000;
}

$error = 0;
while (true) {

	//$cadena = com_virtual();
	$cadena = trim(exec('head -n 1 pdsDATA'));
	//$cadena = 'ERRORADA'; // test de error


	if($cadena != "ERRORADA" && $cadena != ""){

		$registro = new stdClass();
		$sensores = Array();



/*************************************** SENSORES ********************************************/			
		list($tiempo, $amperaje, $voltaje, $xx, $xxx) = split(',', $cadena);
/*************************************** SENSORES ********************************************/		
					
					
/*************************************** CALCULO VOLTAJE ********************************************/
			$sensores[vol_puro] = $voltaje;
			$voltaje = ($voltaje*0.001268) + 0.086; //AGREGAR AQUI EL MULTIPLICADOR
			$sensores[vol] = round($voltaje,3); 
/*************************************** CALCULO VOLTAJE ********************************************/
			
			
			
/*************************************** CALCULO AMPERAJE ********************************************/
			$sensores[amp_puro] = $amperaje;
 			$amperaje = ($amperaje*0.034)-21.0522; //AGREGAR AQUI EL MUTLIPLICADOR
			$sensores[amp] = round($amperaje,1);
/*************************************** CALCULO AMPERAJE ********************************************/

			
			
			
			
			
			
/*************************************** CALCULO BATERIA ********************************************/
			if($voltaje >= 25.4){
 				$bateria = 100;
 			}else if($voltaje < 20){
 				$bateria = 0;
 			}else{
 				$bateria=($voltaje*14.07)-258;
	 			$bateria = round($bateria,1);
 			}
			$sensores[bat] = $bateria; 	
/*************************************** CALCULO BATERIA ********************************************/ 		

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
		if($error > 3){
			echo "data: " . json_encode("errorLectura"). "\n\n";	//produccio
			$error == 0;
		}else{
			$error++;
		}
	}
	
	ob_end_flush();
	flush();
	usleep($refresco);
	//usleep(100000);	
	//usleep(1000000);
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

?>s
