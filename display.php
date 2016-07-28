<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <title>PDS</title>
    <link rel="stylesheet" type="text/css" href="display.css">
    <script src="engine/jquery.min.js"></script>
    <script src='engine/idiomas.js'></script>
    <link rel="stylesheet" type="text/css" href="engine/glyph/flaticon.css">
    <script src="display.js"></script>
</head>
<body style="background-color: black">   
    
<!-- CONTENEDOR RELOJES -->
	<div class="cont-relojes">
	<!-- RENGLON1 -->
		<div class="relojes-renglon1">
			<div id="corriente" class="corriente">
					<img src="images/amperaje.svg" style="width: 120px">
			  	<div id="corriente-aguja" class="corriente-aguja">
			  		<img src="images/agujaChica.svg" style="width: 9px">
  				</div>
			  	<label id="corriente-titulo" class="corriente-titulo" tex="test_corriente">AMP</label>
			  	<label id="corriente-valor" class="corriente-valor"></label>
			</div>			
			<div id="voltaje" class="voltaje">
					<img src="images/voltaje.svg" style="width: 120px">
			  	<div id="voltaje-aguja" class="voltaje-aguja">
			  		<img src="images/agujaChica.svg" style="width: 9px">
  				</div>
			  	<label id="voltaje-titulo" class="voltaje-titulo" tex="test_voltaje">VOLT</label>
			  	<label id="voltaje-valor" class="voltaje-valor"></label>
			</div>
			<div id="bateria" class="bateria">
					<img id="bateria_graf" src="images/bateria_display_0.png" style="width: 65px">
			</div>			
		</div>
		<div class="botonera">
			<img src="images/qrWIFI.png" class="qrWifi" />
			<span class="glyph-icon flaticon-signal ico-apagado"></span>
		</div>
		<div class="cartel">
		<label id="cartel">
			<?php 
				//$host = gethostname(); 
				//echo gethostbyname($host);
				echo "http://192.168.66.1";
			?>
		</label>
		</div>		
	</div>	
</body>	