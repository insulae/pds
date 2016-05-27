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
			INSERT INTO rec SET
				id_avion = '.@$_POST['id_avion'].'
				, observacion = "'.@$_POST['observacion'].'"
				, crank = 0
			');
		if(!$db->errno){
			$id_rec = $db->insert_id;
			foreach($registros as $registro){
				//GRABO REC_ITEM
				$query = $db->query('
					INSERT INTO rec_item SET
						id_rec = '.$id_rec.'
						, sensores = "'.$db->real_escape_string(json_encode($registro->sensores)).'" 
						, fyh = "'.$registro->fyh.'"
						, mseg = "'.str_pad($registro->mseg,3,0,STR_PAD_LEFT).'"
					');
				echo $db->error;
			}
		}
		
	break;
	//TODO AGREGAR CONTROL VER QUE CONVIENE
/* #################################################### GRABACION #################################################### */

/* #################################################### GRABACION #################################################### */
	case "guardarCheck":
		$cadena = json_decode(stripslashes($_POST['cadena']));
	
		//GRABO REC
		$query = $db->query('
			INSERT INTO checks SET
				id_avion = '.@$_POST['id_avion'].'
				, observacion = "'.@$_POST['observacion'].'"
				, sensores = "'.$db->real_escape_string(json_encode($cadena->sensores)).'"
				, fyh = "'.$cadena->fyh.'"
				, freeze = '.@$_POST['freeze'].'
			');
		echo $db->error;	
	break;
	//TODO AGREGAR CONTROL VER QUE CONVIENE
/* #################################################### GRABACION #################################################### */
	

	
}
?>
