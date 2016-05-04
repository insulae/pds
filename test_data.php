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
	case "guardar":
		//echo json_encode(@$_REQUEST["registros"]); //para debug de como llega el dato
	
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
		if(!mysqli_errno($db)){
			$id_rec = mysqli_insert_id($db);
			foreach($registros as $registro){
				
				//GRABO REC_ITEM
				$query = $db->query('
					INSERT INTO rec_item(
						id_rec,
						cadena,
						fyh
					)
					VALUES (
						'.$id_rec.',
						"'.$registro->cadena.'",
						"'.$registro->fyh.'"
					)
				');
				
				if(!mysqli_errno($db)){
					$id_rec_item = mysqli_insert_id($db);
					
					//grabo voltaje
					$query = $db->query('
						INSERT INTO rec_item_sensor(
							id_rec_item,
							nro_sensor,
							dato
						)
						VALUES (
							'.$id_rec_item.',
							1,
							"'.$registro->sensores->vol.'"
						)
					');
					//grabo amperaje
					$query = $db->query('
						INSERT INTO rec_item_sensor(
							id_rec_item,
							nro_sensor,
							dato
						)
						VALUES (
							'.$id_rec_item.',
							2,
							"'.$registro->sensores->amp.'"
						)
					');
				}
			}
		}else{
			echo mysqli_error($db);
		}
		//TODO AGREGAR CONTROL VER QUE CONVIENE
		
	break;
/* #################################################### GRABACION #################################################### */
	
}
?>
