<?php
require('engine/base.php');

if($_REQUEST['accion'] == 'traerGraba'){
	
	$filtro = "";
	if($_POST['fdesde'] != ""){
		$filtro += 'AND graba.fyh >= "'.$_POST['fdesde'].'"';
	}
	if($_POST['fhasta'] != ""){
		$filtro += ' AND graba.fyh <= "'.$_POST['fhasta'].'"';
	}
	$query = $db->query('
		SELECT 
			avion.patente,
			crank.id_crank,
			crank.motor_apu,
			crank.observacion,
			crank.fyh
		FROM crank
		INNER JOIN avion USING(id_avion)
		WHERE avion.patente = "'.$_POST['avion'].'"
		AND crank.fyh >= "'.$_POST['fdesde'].'"
		AND crank.fyh <= "'.$_POST['fhasta'].'"	
	');
	//$datos = queryToArray($query);
	$datos = json_encode(queryToObject($query));
	echo $datos;
}