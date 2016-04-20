<link rel="stylesheet" type="text/css" href="checks.css">

<link href="engine/datepicker/bootstrap-datepicker3.min.css" rel="stylesheet">
<script src="engine/datepicker/bootstrap-datepicker.min.js"></script>
<script src="engine/datepicker/bootstrap-datepicker-lang.js"></script>

<div class="cont-checks-fondo">
	<div class="cont-checks-botonera">
		<div>
		    <input id="checks-fdesde" type="text" class="input-login checks-fecha" placeholder="  Fec. Desde" value="2016-01-01">
		    <input id="checks-fhasta" type="text" class="input-login checks-fecha" placeholder="  Fec. Hasta" value="2016-12-12">
		    <button id="btn-filtrar" type="button" class="btn btn-info btn-filtrar">Filtrar</button>		    
		   <!--  <button id="btn-checks-mostrar" data-toggle="modal" data-target="#modalChecksVer" type="button" class="btn btn-danger btn-mostrar">Mostrar</button> -->		    
			<button id="btn-checks-mostrar" type="button" class="btn btn-danger btn-mostrar">Mostrar</button>		    
		</div>
	</div>
	<table id="checks-tabla" class="checks-tabla" style="text-align: center;">
    	<thead>
	      <tr class="checks-tabla-titulo">
	        <!-- <th class="th-check" style="width:100px" >AVION</th> -->
	        <th class="th-check" style="width:100px">Fecha</th>
	        <th class="th-check" style="width:70px; text-align: center">Voltaje</th>
	        <th class="th-check" style="width:70px; text-align: center"">Amperaje</th>
	        <th class="th-check" style="width:500px; text-align: center">Observación</th>
	        <th class="th-check" style="width:80px; text-align: center">Acción</th>
	      </tr>
	    </thead>
	    <tbody>
		</tbody>
	</table>
</div>