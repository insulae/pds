<link rel="stylesheet" type="text/css" href="checks.css">

<div class="cont-checks-fondo">
	<div class="cont-checks-botonera">
		<div>
		    <label tex="desde"/>: <input id="checks-fdesde" type="text" class="input-login checks-fecha">
		    <label tex="hasta"/>: <input id="checks-fhasta" type="text" class="input-login checks-fecha">
		    <button id="btn-filtrar" type="button" class="btn btn-info btn-filtrar"><label tex="checks_filtrar"/></button>		    
		   <!--  <button id="btn-checks-mostrar" data-toggle="modal" data-target="#modalChecksVer" type="button" class="btn btn-danger btn-mostrar">Mostrar</button> -->		    
			<button id="btn-checks-mostrar" type="button" class="btn btn-danger btn-mostrar"><label tex="checks_mostrar"/></button>		    
		</div>
	</div>
	<div class="cont-tabla">
		<table id="checks-tabla" class="checks-tabla" style="text-align: center;">
	    	<thead>
		      <tr class="checks-tabla-titulo">
		        <!-- <th class="th-check" style="width:100px" >AVION</th> -->
		        <th class="th-check" style="width:100px"><label tex="checks_fecha"/></th>
		        <th class="th-check" style="width:70px; text-align: center"><label tex="voltaje"/></th>
		        <th class="th-check" style="width:70px; text-align: center""><label tex="checks_amperaje"/></th>
		        <th class="th-check" style="width:500px; text-align: center"><label tex="checks_observacion"/></th>
		        <th class="th-check" style="width:80px; text-align: center"><label tex="checks_accion"/></th>
		      </tr>
		    </thead>
		    <tbody>
			</tbody>
		</table>
	</div>		
</div>
<script src="checks.js"></script>