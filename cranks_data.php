<?php
require('engine/base.php');

switch($_REQUEST['accion']){
	case 'traerCranksbkp':
		$filtro = "";
		if(@$_POST['fdesde'] != ""){
			$filtro += 'AND crank.fyh >= "'.@$_POST['fdesde'].'"';
		}
		if(@$_POST['fhasta'] != ""){
			$filtro += ' AND crank.fyh <= "'.@$_POST['fhasta'].'"';
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
			WHERE avion.patente = "'.@$_POST['avion'].'"
			AND crank.fyh >= "'.@$_POST['fdesde'].'"
			AND crank.fyh <= "'.@$_POST['fhasta'].'"	
		');
		//$datos = queryToArray($query);
		$datos = json_encode(queryToObject($query));
		echo $datos;
	break;

	//traer listado de las grabaciones
	case 'traerCranks':
		$query = $db->query('
			SELECT
				IF(motor_apu = 0, "APU", motor_apu) AS motor_apu
				,rec.id_rec
				,rec.observacion
				,rec.fyh
			FROM rec
			INNER JOIN avion USING(id_avion)
			WHERE id_avion = "'.@$_POST['id_avion'].'"
			AND rec.fyh >= "'.@$_POST['fdesde'].'"
			AND rec.fyh <= "'.@$_POST['fhasta'].'"
			AND crank = 1
		');
		//$datos = queryToArray($query);
		$datos = json_encode(queryToObject($query));
		echo $datos;
		break;
	
	case 'traerCranksDatos':
		$res = Array();
		/*
		[
			{
				observacion: "Texto",
				puntos : [
						{x:1, y:2},
						{x:2, y:2}
				]
			},
			{
				observacion: "Texto",
				puntos : [
				{x:1, y:2},
				{x:2, y:2}
				]
			}
		]
		*/
		$qcr=$db->query('
				SELECT * FROM crank
				WHERE id_crank IN(4,5,7)
		');
		while ($rcr = $qcr->fetch_object()){
			$row = new stdClass();
			$row->observaciones = "rcr->Observacion";
			$row->id_crank = $rcr->id_crank;
			$i=1;
			
			$qcranks = $db->query('
				SELECT cis.*
				FROM crank_item_sensor AS cis
				INNER JOIN crank_item USING(id_crank_item)
				INNER JOIN crank USING(id_crank)
				INNER JOIN avion USING (id_avion)
				WHERE avion.patente = "'.@$_POST['avion'].'"
				AND nro_sensor IN('.@$_POST['sensor'].')
				AND id_crank IN('.$rcr->id_crank.')
			');
			
			$row->puntos = Array();
			while ($r = $qcranks->fetch_object()) {
				$punto = new stdClass();
				$punto->x = $i*0.25;
				$punto->y = round($r->dato);
				array_push($row->puntos,$punto);
				$i++;
			}
			array_push($res,$row);	
		}
		$datos = json_encode($res);
		echo $datos;
	break;
}