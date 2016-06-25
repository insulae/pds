<?php
require('engine/base.php');

switch($_REQUEST['accion']){
	
	//traer listado de las grabaciones
	case 'traerGraba':
		$query = $db->query('
			SELECT 
				rec.id_rec
				,rec.observacion
				,rec.fyh
			FROM rec
			INNER JOIN avion USING(id_avion)
			WHERE id_avion = '.@$_POST['id_avion'].'
			AND rec.fyh BETWEEN "'.@$_POST['fdesde'].' 00:00:00" AND "'.@$_POST['fhasta'].' 23:59:59"
			AND crank = 0
			ORDER BY fyh DESC					
		');
		if($db->errno) echo $db->error;
		//$datos = queryToArray($query);
		$datos = json_encode(queryToObject($query));
		echo $datos;
		
	break;
	
	//traer datos de la grabacion
	case 'traerDatos':
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
	
	//ELIMINAR Graba
	case 'eliminarGraba':
		$query = $db->query('
			DELETE rec,rec_item FROM rec
			LEFT JOIN rec_item USING(id_rec)
			WHERE id_rec = '.@$_POST['id_rec']
		);
		if(mysqli_errno($db)){
			echo mysqli_errno($db);
		}
		break;	
}