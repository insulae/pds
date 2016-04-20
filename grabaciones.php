<link rel="stylesheet" type="text/css" href="grabaciones.css">

<link href="engine/datepicker/bootstrap-datepicker3.min.css" rel="stylesheet">
<script src="engine/datepicker/bootstrap-datepicker.min.js"></script>
<script src="engine/datepicker/bootstrap-datepicker-lang.js"></script>

<div class="cont-graba-fondo">
	<div class="cont-graba-botonera">
		<div>
		    <input id="graba-fdesde" type="text" class="input-login graba-fecha" placeholder="  Fec. Desde" value="2016-01-01">
		    <input id="graba-fhasta" type="text" class="input-login graba-fecha" placeholder="  Fec. Hasta" value="2016-12-12">
		    <button id="btn-filtrar" type="button" class="btn btn-info btn-filtrar">Filtrar</button>		    
		    <button id="btn-graba-mostrar" type="button" class="btn btn-danger btn-mostrar">Mostrar selección</button>
		</div>
	</div>
	<table id="graba-tabla" class="graba-tabla" style="text-align: center;">
    	<thead>
	      <tr class="graba-tabla-titulo">
	        <!-- <th class="th-graba" style="width:100px" >AVION</th> -->
	        <th class="th-graba" style="width:50px">Motor</th>
	        <th class="th-graba" style="width:100px; text-align: center">Fecha</th>
	        <th class="th-graba" style="width:500px; text-align: center">Observación</th>
	        <th class="th-graba" style="width:100px; text-align: center"">Acción</th>
	      </tr>
	    </thead>
	    <tbody>
		</tbody>
	</table>
</div>