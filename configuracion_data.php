<?php

require('engine/base.php');
switch(@$_REQUEST['accion']){


// ################################### avion ###################################	

//TRAER USUARIOS
	case 'traerUsuarios':
		$query = $db->query('
			SELECT *
			FROM usuario
		');
		$datos = json_encode(queryToObject($query));
		echo $datos;
	break;

//AGREGAR USUARIO
	case 'agregarAvion':
		$query = $db->query('
			INSERT INTO avion(
				patente, 
				motores,
				apu,
				observacion
			) 
			VALUES (
				"'.@$_POST['patente'].'", 
				'.@$_POST['motores'].', 
				'.@$_POST['apu'].', 
				"'.@$_POST['observacion'].'"
			);
		');
		if(mysqli_error($db)){
			echo mysqli_error($db);
		}
		else{
			echo 0;
		}
		//TODO AGREGAR CONTROL VER QUE CONVIENE
	break;
	
//ELIMINAR AVION
	case 'eliminarAvion':
		$query = $db->query('
			UPDATE avion
			SET estado = "B"
			WHERE patente = "'.@$_POST['patente'].'"
		');
		if(mysqli_errno($db)){
			echo mysqli_errno($db);
		}
		break;
		
	//HACER BACKUP
	case 'backup':
		$query = $db->query('
			SELECT *
			FROM configuracion
		');
		$datos = queryToObject($query);	
		$pds = $datos[0]->nro_pds;
		$respuesta = exec('sys/backup.sh ' .$pds);
		echo $respuesta;
		break;
		
	//ULTIMO BACKUP
	case 'ultimo_backup':
		$respuesta = exec('cd sys/backups/ ; ls pds*');
		echo $respuesta;
		break;
}


function traerConfiguracion(){
	$query = $db->query('
			SELECT *
			FROM configuracion
		');
	$datos = json_encode(queryToObject($query));
	return 7;
}
?>
