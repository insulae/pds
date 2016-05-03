<?php
require('engine/base.php');
session_start();
switch(@$_REQUEST['accion']){


// ################################### avion ###################################	

//TRAER AVIONES
	case 'traerAviones':
	
	if(@$_POST['patente'] !=""){
		$filtro = 'AND patente LIKE "%'.@$_POST['patente'].'%"';
	}else{
		$filtro=' ';
	}
		
	$query = $db->query('
		SELECT 
			*
		FROM avion
		WHERE estado = "A" '
		.$filtro.
		' ORDER BY patente ASC
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
		


// ################################### login ###################################
	
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
			@$_SESSION['id_usuario'] = $datos[0]->id_usuario;			
			@$_SESSION['usuario'] = $datos[0]->usuario;
			@$_SESSION['tipo'] = $datos[0]->tipo;
		}
	break;
	
	
//DESLOGIN	
	case 'des_login':
		@$_SESSION['id_usuario'] = '';
		
	break;
		
	
//LOGIN CHEQUEO	
	case 'login_chequeo':
		if (@$_SESSION['id_usuario']){
			$datos = new stdClass();
			$datos->id_usuario = @$_SESSION['id_usuario'];
			$datos->usuario = @$_SESSION['usuario'];
			$datos->tipo = @$_SESSION['tipo'];
			echo json_encode($datos);
		}else{
			echo false;
		}
	break;
		
}

