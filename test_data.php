<?php
require("engine/base.php");
/*
$q = $db->query("
SELECT * FROM avion
");

if (mysql_error()) die(mysql_error());
while ($r = $q->fetch_object()) {
	echo $r->patente . "<br />";
}

24] => stdClass Object
        (
            [cadena] => 000106090609050605060608070105
            [fyh] => 2016-05-04 02:49:41
            [sensores] => stdClass Object
                (
                    [vol] => 2310
                    [amp] => 2309
                    [bat] => 1541
                    [tem] => 1542
                    [hum] => 2055
                    [pre] => 261
				)
		)

*/


switch ($_REQUEST["accion"]) {
	
/* #################################################### GRABACION #################################################### */
	case "guardarGrabacion":
		$registros = json_decode(stripslashes($_POST['registros']));
		
		//GRABO REC
		$query = $db->query('
			INSERT INTO rec(
				id_avion,
				observacion
			)
			VALUES (
				'.@$_POST['id_avion'].',
				"'.@$_POST['observacion'].'"
			)
		');
		if(!$db->errno){
			$id_rec = $db->insert_id;
			foreach($registros as $registro){
				//GRABO REC_ITEM
				$query = $db->query('
					INSERT INTO rec_item(
						id_rec,
						sensores,
						fyh
					)
					VALUES (
						'.$id_rec.',
						"'.$db->real_escape_string(json_encode($registro->sensores)).'",
						"'.$registro->fyh.'"
					)
				');
				echo $db->error;
			}
		}
		
	break;
		//TODO AGREGAR CONTROL VER QUE CONVIENE
/* #################################################### GRABACION #################################################### */
	
}
?>
