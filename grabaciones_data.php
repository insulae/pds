<?php
require('engine/base.php');

switch($_REQUEST['accion']){
	
	//traer listado de las grabaciones
	case 'traerGraba':
		$query = $db->query('
			SELECT 
				avion.patente,
				rec.id_rec,
				rec.observacion,
				rec.fyh
			FROM rec
			INNER JOIN avion USING(id_avion)
			WHERE avion.patente = "'.@$_POST['avion'].'"
			AND rec.fyh >= "'.@$_POST['fdesde'].'"
			AND rec.fyh <= "'.@$_POST['fhasta'].'"
		');
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
			WHERE id_rec = '.@$_POST['id_rec']
		);
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