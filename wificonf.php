<link rel="stylesheet" type="text/css" href="wificonf.css">

<div class="cont-wifiestado-fondo">
	<div class="cont-wifiestado">
	estado
	</div>
</div>
<div class="cont-wificonf-fondo">
	<div class="cont-wificonf">
	<table id="wificonf-tabla">
    	<thead>
	      <tr style="height: 40px;">
	        <th style="width:200px">ESSID</th>
	        <th style="width:130px;">Encriptación</th>
	        <th style="width:100px">Señal</th>
			<th style="width:20px; padding-left:50px"><span id="refresca-wifi" class="glyph-icon flaticon-arrows-1 refresca-wifi"></span></th>	        
	      </tr>
	    </thead>
	    <tbody>
		</tbody>
	</table>
	</div>
</div>
<label id="estado-wifi" class="estado-wifi">ESCANEANDO</label>

<div class="cont-wificon-fondo">
	<div class="cont-wificon">
	<label tex="nombre_wifi">Nombre WIFI:</label><br>
	<input id="wifi-nombre" type="text" class="input-wifi" style="width: 200px">
	<br><br><br>
    <label tex="clave">Contraseña:</label><br>
    <input id="wifi-clave" type="text" class="input-wifi"><br>
    <br><br>
    <button id="wifi-guardar" type="button" class="btn btn-danger" style="width: 100px; height: 40px;"><label tex="wifi-guardar"/>Guardar</button>
	</div>
</div>