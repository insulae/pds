<?php session_start(); ?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
    <title>PDS</title>
   <!--  <meta name="viewport" content="width=device-width, initial-scale=1"> -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="stylesheet" type="text/css" href="engine/bootstrap.css" media="screen">
    <link rel="stylesheet" type="text/css" href="engine/jquery-confirm.css" media="screen">
    <link rel="stylesheet" type="text/css" href="engine/glyph/flaticon.css">
    <link rel="stylesheet" type="text/css" href="index.css">

    <script src="engine/jquery.min.js"></script>
    <script src='engine/jquery-confirm.js'></script>      
    <script src="engine/bootstrap.min.js"></script>
    <script src="engine/smoothie.js"></script>
	<script src='engine/GrafPan.js'></script>
	<script src='engine/idiomas.js'></script>
    
</head>   
  
<body style="background-color: #000;">

	<div id="contenedor" class="contenedor">
		<div id="tabs">
			<div class="menu-tabs">
				<button id="tab-inicio" type="button" class="tab tabactivo"><label tex="inicio"></button>
				<button id="tab-test" type="button" class="tab tabno"><label tex="test"/></button>
			    <button id="tab-checks" type="button" class="tab tabno"><label tex="checks"/></button>
			    <button id="tab-cranks" type="button" class="tab tabno"><label tex="cranks"/></button>
			    <button id="tab-grabaciones" type="button" class="tab tabno"><label tex="grabaciones"/></button>
			    <div id="tab-avion" type="button" class="tabavion"></div>
				<span id="configuracion" class="glyph-icon flaticon-cogwheel ico-conf"></span>	
			</div>
		</div>
		<div id="pagina">
		</div>
	</div>

<script>
    
/*############################ declaracion de variables #############################*/
	
</script>  
<script src="index.js"></script>
</body>
</html>

<?php 
//TODO pedir logo en alta calidad
//TODO la apk no debe permitir apagar la pantalla, por lo menos cuando este grabando, el "cometa" muere?
//TODO ver como hacer que la ventana modal no se cierre, tocar fuera de ella y cerrarse  hace perder todo el test
//TODO hacer que las modales solo se cierren de los botones y nada mas
?>