<?php
require('engine/base.php');

switch($_REQUEST['accion']){

	//traer listado de las grabaciones
	case 'traerCranks':
		$query = $db->query('
			SELECT
				IF(rec.motor_apu = 0, "APU", rec.motor_apu) AS motor_apu
				,rec.id_rec
				,rec.observacion
				,rec.fyh
			FROM rec
			INNER JOIN avion USING(id_avion)
			WHERE id_avion = "'.@$_POST['id_avion'].'"
			AND rec.fyh BETWEEN "'.@$_POST['fdesde'].' 00:00:00" AND "'.@$_POST['fhasta'].' 23:59:59"
			AND crank = 1
			ORDER BY rec.fyh DESC
		');
		//$datos = queryToArray($query);
		$datos = json_encode(queryToObject($query));
		echo $datos;
		break;
	
	case 'traerCranksDatos':
		$res = Array();

		$qcr=$db->query('
				SELECT * FROM rec
				WHERE id_rec IN('.implode(",",@$_POST['cranksSelec']).')
		');
		while ($rcr = $qcr->fetch_object()){
			$row = new stdClass();
			$row->observaciones = $rcr->observacion;
			$row->id_rec = $rcr->id_rec;
			$i=1;
			
			//CONCAT(fyh.".".mesg) AS fyh
			$qcranks = $db->query('
				SELECT 
					id_rec
					,sensores
					,fyh 
				FROM rec_item
				WHERE id_rec IN('.$rcr->id_rec.')
			');
			$row->puntos = Array();
			while ($r = $qcranks->fetch_object()) {
				$sensores = json_decode($r->sensores);
				if(@$_POST['sensor'] == 1){
					$sensor = $sensores->vol;
				}else if(@$_POST['sensor'] == 2){
					$sensor = $sensores->amp;
				}
				$punto = new stdClass();
				$punto->x = $i*0.25;
				$punto->y = $sensor;
				array_push($row->puntos,$punto);
				$i++;
			}
			array_push($res,$row);	
		}
		$datos = json_encode($res);
		echo $datos;
	break;
	case 'traerDatosDoble':
		$query = $db->query('
			SELECT
				sensores,
				fyh,
				mseg
			FROM rec_item
			WHERE id_rec = '.@$_POST['id_rec'].'
		');
		//echo $datos = queryToArray($query);
		$datos = json_encode(queryToObject($query));
		echo $datos;
		break;	
}