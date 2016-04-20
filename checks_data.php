<?php
require('engine/base.php');

if($_REQUEST['accion'] == 'traerChecks'){
	
	$filtro = "";
	if($_POST['fdesde'] != ""){
		$filtro += 'AND check.fyh >= "'.$_POST['fdesde'].'"';
	}
	if($_POST['fhasta'] != ""){
		$filtro += ' AND check.fyh <= "'.$_POST['fhasta'].'"';
	}
	//TODO agregar llave secundaria en check_sensor (id_check nr_sensor)
	$query = $db->query('
 
		select c.fyh,c.observacion,
			(select check_sensor.dato
				FROM check_sensor
				WHERE nro_sensor = 1
				AND check_sensor.id_check = c.id_check
			) AS voltaje,
			(select check_sensor.dato
				FROM check_sensor
				WHERE nro_sensor = 2
				AND check_sensor.id_check = c.id_check
			) AS amperaje
		FROM checks AS c
		INNER JOIN avion USING(id_avion)
		WHERE `avion`.patente = "'.$_POST['avion'].'"
			AND c.fyh >= "'.$_POST['fdesde'].'"
			AND c.fyh <= "'.$_POST['fhasta'].'"	
	');
	//echo mysqli_error($db);
	//$datos = queryToArray($query);
	$datos = json_encode(queryToObject($query));
	echo $datos;
}
