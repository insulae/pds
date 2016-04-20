<?php
switch ($_GET['data']) {
	case 'corriente':
		echo rand(0, 800);
		break;
		
	case 'temp':
		echo rand(20, 60);
	break;
	
	case 'presion':
		echo rand(80, 100);
	break;
	
	case 'bateria':
		echo rand(0, 100);
	break;
			
	case 'oscilacion':
		echo rand(-134,134);
		break;	
}