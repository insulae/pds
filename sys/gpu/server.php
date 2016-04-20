<?php
// error_reporting(E_ALL | E_STRICT);

// $socket = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
// socket_bind($socket, '127.0.0.1', 8888);

// $from = '127.0.0.1';
// $port = 8888;
// socket_recvfrom($socket, $buf, 12, 0, $from, $port);

// echo "Se recibió $buf desde la dirección remota $from y el puerto remoto $port" . PHP_EOL;




//Receive some data
// $remote_ip = "127.0.0.1";
// $remote_port = "8888"; 
// $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
// $r = socket_recvfrom($sock, $buf, 12, 0, $remote_ip, $remote_port);
// //Convert to array of decimal values
// $array = unpack("c*chars", $buf);
// //Convert decimal values to ASCII characters:
// $chr_array = array();
// for ($i = 0; $i < count($array); $i++)
// {
// 	$chr_array[] = chr($array[$i]);
// }


error_reporting(E_ALL);

echo "<h2>Conexión TCP/IP</h2>\n";

/* Obtener el puerto del servicio WWW. */
$service_port = getservbyname('www', 'udp');

/* Obtener la dirección IP del host objetivo. */
$address = gethostbyname('127.0.0.1');

/* Crear un socket TCP/IP. */
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_UDP);
if ($socket === false) {
	echo "socket_create() falló: razón: " . socket_strerror(socket_last_error()) . "\n";
} else {
	echo "OK.\n";
}

echo "Intentando conectar a '$address' en el puerto '$service_port'...";
$result = socket_connect($socket, $address, $service_port);
if ($result === false) {
	echo "socket_connect() falló.\nRazón: ($result) " . socket_strerror(socket_last_error($socket)) . "\n";
} else {
echo "OK.\n";
}

$in = "HEAD / HTTP/1.1\r\n";
$in .= "Host: www.example.com\r\n";
$in .= "Connection: Close\r\n\r\n";
$out = '';

echo "Enviando petición HTTP HEAD...";
socket_write($socket, $in, strlen($in));
echo "OK.\n";

echo "Leyendo la respuesta:\n\n";
$buf = 'Este es mi buffer.';
if (false !== ($bytes = socket_recv($socket, $buf, 512, MSG_WAITALL))) {
echo "Leídos $bytes bytes desde socket_recv(). Cerrando el socket...";
} else {
echo "socket_recv() falló; razón: " . socket_strerror(socket_last_error($socket)) . "\n";
}
socket_close($socket);

echo $buf . "\n";
echo "OK.\n\n";
?>

?>