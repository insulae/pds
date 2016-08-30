<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <title>PDS</title>
   <!--  <meta name="viewport" content="width=device-width, initial-scale=1">-->
   <meta name="viewport" content="width=device-width" />
   
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="stylesheet" type="text/css" href="engine/bootstrap.css" media="screen">
    <link rel="stylesheet" type="text/css" href="engine/jquery-confirm.css" media="screen">
    <link rel="stylesheet" type="text/css" href="engine/glyph/flaticon.css">
    <link rel="stylesheet" type="text/css" href="index.css">
	<link href="engine/datepicker/bootstrap-datepicker3.min.css" rel="stylesheet">

    <script src="engine/jquery.min.js"></script>
    <script src='engine/idiomas.js'></script>
    <script src='engine/jquery-confirm.js'></script>
    <script src="engine/bootstrap.min.js"></script>
	<script src='engine/GrafPan.js'></script>
	<script src="engine/datepicker/bootstrap-datepicker.min.js"></script>
	<script src="engine/datepicker/bootstrap-datepicker-lang.js"></script>    
	
    
</head>   
  
<body id="body" style="background-color: #000;">

	<div id="contenedor" class="contenedor">
		<div id="tabs" class="tabs">
			<div class="menu-tabs">
				<button id="tab-inicio" type="button" class="tab tabactivo"><label tex="inicio"></label></button>
				<button id="tab-test" type="button" class="tab tabno"><label tex="test"></label></button>
			    <button id="tab-checks" type="button" class="tab tabno"><label tex="checks"></label></button>
			    <button id="tab-cranks" type="button" class="tab tabno"><label tex="cranks"></label></button>
			    <button id="tab-grabaciones" type="button" class="tab tabno"><label tex="grabaciones"></label></button>
			    <div id="tab-avion" type="button" class="tabavion"></div>
				<span id="configuracion" class="glyph-icon flaticon-cogwheel ico-conf"></span>	
			</div>
		</div>
		<div id="pagina" class="pagina">
		</div>
	</div>    	 
</body>
<script src="index.js"></script>
</html>

<?php 
//TODO pedir logo en alta calidad
//TODO la apk no debe permitir apagar la pantalla, por lo menos cuando este grabando, el "cometa" muere?

//TODO CONFIG agregar a /etc/rc.local:
//TODO CONFIG /bin/sh /var/www/html/pds/sys/seteos.sh
//TODO CONFIG /bin/sh /var/www/html/pds/sys/APup.sh

//TODO CONFIG agregar en .config/openbox/autostart:
//TODO CONFIG usr/bin/python /var/www/html/pds/sys/com/serialGet.py &
//TODO CONFIGepiphany-browser -a --profile ~/.config http://localhost/pds/display.php --display=:0 &


//TODO CONFIG agregar en rc.xml:
//TODO CONFIG <application name="epiphany-browser"><decor>no</decor></application>


?>