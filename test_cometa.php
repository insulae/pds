<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

require ("sys/com/sensores.php");

/* $usb = 'ttyUSB0';
`stty -F /dev/$usb 9600`;
`stty -F /dev/$usb -parity`;
`stty -F /dev/$usb cs8`;
`stty -F /dev/$usb -cstopb`;
$f = fopen("/dev/$usb", "r+");
if(!$f) {
	echo "error opening file\n";
	exit;
} */

//$i=0;
 while (true) {
	$cadena = com_virtual();
	//$cadena = trim(fgets($f, 31)); //cadena real fgets
	//$cadena = exec("python3 sys/com/serialpy.py");
	//echo "data: " . $cadena . "\n\n";

 	
	$registro = new stdClass(); 
	$sensores = Array();
		//$sensores[$sensor1] = $i++;
		
		//python
		$sensores[$sensor1] = hexdec(substr($cadena,8,4));
		$sensores[$sensor2] = hexdec(substr($cadena,12,4));
		$sensores[$sensor3] = hexdec(substr($cadena,16,4));
		$sensores[$sensor4] = hexdec(substr($cadena,20,4));
		$sensores[$sensor5] = hexdec(substr($cadena,24,4));
		$sensores[$sensor6] = hexdec(substr($cadena,28,4));
		
		//fgets
// 		$sensores[$sensor1] = hexdec(substr($cadena,6,4));
// 		$sensores[$sensor2] = hexdec(substr($cadena,10,4));
// 		$sensores[$sensor3] = hexdec(substr($cadena,14,4));
// 		$sensores[$sensor4] = hexdec(substr($cadena,18,4));
// 		$sensores[$sensor5] = hexdec(substr($cadena,22,4));
// 		$sensores[$sensor6] = hexdec(substr($cadena,26,4));
		
	
	
	//ALTER TABLE rec_item MODIFY fyh DATETIME(3); <--- para que tome milisegundos

	$t = microtime(true);
	$micro = sprintf("%06d", ($t - floor($t)) * 1000000);
	
	//con micro segundos
	//$d = new DateTime(date('Y-m-d H:i:s.' . $micro, $t));
	//$registro->fyh = $d->format("Y-m-d H:i:s.u");
	
	$d = new DateTime(date('Y-m-d H:i:s'));
	$registro->fyh = $d->format("Y-m-d H:i:s");
	$registro->mseg = substr($micro,0,3);
	$registro->sensores = $sensores;
	//$registro->cadena = $cadena;

	echo "data: " . json_encode($registro). "\n\n";
	
	
	ob_end_flush();
	flush();
	//usleep(250000);
	usleep(1000000);
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

cadena ??? fyh???
voltaje, amperaje
bateria, temperatura, presion
*/
?>
