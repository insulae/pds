<?php
require('engine/base.php');
session_start();
switch(@$_REQUEST['accion']){

	
//TRAER AVIONES
	case 'traerAviones':
	$query = $db->query('
		SELECT 
			*
		FROM avion
		WHERE estado = "A"
		ORDER BY patente ASC
	');
	//$datos = queryToArray($query);
	$datos = json_encode(queryToObject($query));
	echo $datos;
	break;

//AGREGAR AVION
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
	
//LOGIN
	case 'login':
		//si la consulta esta ok
		$query = $db->query('
			SELECT *
			FROM usuario
			WHERE usuario = "'.@$_POST['usuario'].'"
			and clave = "'.@$_POST['clave'].'"
		');
		$datos = queryToObject($query);
		if(@$datos[0]->usuario){
			echo @$_SESSION['usuario'] = $datos[0]->usuario;
			@$_SESSION['id_usuario'] = $datos[0]->id_usuario;
		}
	break;
	
	
//DESLOGIN	
	case 'des_login':
		@$_SESSION['id_usuario'] = '';
		
	break;
		
	
//LOGIN CHEQUEO	
	case 'login_chequeo':
		if (@$_SESSION['id_usuario']){
			echo @$_SESSION['usuario'];
		}else{
			echo false;
		}
	break;
		
}

