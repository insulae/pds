<?php
require('engine/base.php');

if($_REQUEST['accion'] == 'traerGraba'){
	$query = $db->query('
		SELECT 
			avion.patente,
			rec.id_rec,
			rec.observacion,
			rec.fyh
		FROM rec
		INNER JOIN avion USING(id_avion)
		WHERE avion.patente = "'.$_POST['avion'].'"
		AND rec.fyh >= "'.$_POST['fdesde'].'"
		AND rec.fyh <= "'.$_POST['fhasta'].'"	
	');
	//$datos = queryToArray($query);
	$datos = json_encode(queryToObject($query));
	echo $datos;
}