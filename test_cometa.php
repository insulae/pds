<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

include("engine/sensores.php");
 while (true) {
	$cadena = com_virtual();
	$registro = new stdClass(); 
	$sensores = Array();
		$sensores[$sensor1] = hexdec(substr($cadena,6,4));
		$sensores[$sensor2] = hexdec(substr($cadena,10,4));
		$sensores[$sensor3] = hexdec(substr($cadena,14,4));
		$sensores[$sensor4] = hexdec(substr($cadena,18,4));
		$sensores[$sensor5] = hexdec(substr($cadena,22,4));
		$sensores[$sensor6] = hexdec(substr($cadena,26,4));
	
	$registro->cadena = $cadena;
	$registro->fyh = date("Y-m-d H:i:s");
	$registro->sensores = $sensores;

	echo "data: " . json_encode($registro). "\n\n";
	
// 	echo "data: [" . rand(1, 600) . "\n";
// 	echo "data: ," . rand(200, 250) . "\n";
// 	echo "data: ]\n\n";
	ob_end_flush();
	flush();
	usleep(250000);
	//usleep(1000000);
 }
function com_virtual(){
		return "000106"
		."0".rand(1,9)."0".rand(1,9)
		."0".rand(1,9)."0".rand(1,9)
		."0".rand(1,9)."0".rand(1,9)
		."0".rand(1,9)."0".rand(1,9)
		."0".rand(1,9)."0".rand(1,9)
		."0".rand(1,9)."0".rand(1,9);
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

cadena ??? fyh???
voltaje, amperaje
bateria, temperatura, presion
*/
?>