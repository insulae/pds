<?php
require('engine/base.php');
switch(@$_REQUEST['accion']){

// ################################### avion ###################################	

//TRAER USUARIOS sudo iwlist wlan0 scanning > /tmp/wifilist.txt

	case 'traerWifis':
		exec("sudo sys/vash wifi scan");
		$archivo = file('sys/wifilist.txt');
		$i=0;
		$datos=[];
		foreach ($archivo as $linea) {
			
			//saco señal
			$senal = substr(strstr($linea,'Signal level='),14,3);
			if($senal){
				$datos[$i]=new stdClass(); //creo vector
				$datos[$i]->senal=trim($senal);
			}
			//saco key on/off
			$key = substr(strstr($linea,'Encryption key:'),15,3);
			if($key){
				$datos[$i]->encriptacion=trim($key);
			}			
			//saco ESSID
			$essid = str_replace('"','',substr(strstr($linea,'ESSID:'),6)); //busco ESSID, elimino ESSID:, elimino "
			if($essid){
				$datos[$i]->nombre=trim($essid);
				$i++;
			}
		}
		echo json_encode($datos);
		
	break;
	case 'guardarWifi':
		exec("sudo sys/vash wifi set ". @$_POST['wifi_nombre']. " ".@$_POST['wifi_clave']);
		echo "listo";
	break;
}
?>