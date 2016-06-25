<?php
require('engine/base.php');

switch ($_REQUEST['accion']) {

	case 'traerChecks':
		$filtro = "";
		if($_POST['fdesde'] != ""){
			$filtro += 'AND check.fyh >= "'.$_POST['fdesde'].'"';
		}
		if($_POST['fhasta'] != ""){
			$filtro += ' AND check.fyh <= "'.$_POST['fhasta'].'"';
		}
		
		$query = $db->query('
			SELECT
				id_check
				, observacion
				, sensores
				, fyh
			FROM checks
			WHERE id_avion = '.$_POST['id_avion'].'
				AND fyh BETWEEN "'.@$_POST['fdesde'].' 00:00:00" AND "'.@$_POST['fhasta'].' 23:59:59"
			ORDER BY fyh DESC
		');
	
		//echo $datos = queryToArray($query);
		$datos = json_encode(queryToObject($query));
		echo $datos;
	break;
		
	//ELIMINAR Check	
	case 'eliminarCheck':
		$query = $db->query('
			DELETE checks FROM checks
			WHERE id_check = '.@$_POST['id_check']
		);
		if(mysqli_errno($db)){
			echo mysqli_errno($db);
		}
	break;
}
