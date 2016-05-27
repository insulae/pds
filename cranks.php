<link rel="stylesheet" type="text/css" href="cranks.css">

<link href="engine/datepicker/bootstrap-datepicker3.min.css" rel="stylesheet">
<script src="engine/datepicker/bootstrap-datepicker.min.js"></script>
<script src="engine/datepicker/bootstrap-datepicker-lang.js"></script>

<div class="cont-cranks-fondo">
	<div class="cont-cranks-botonera">
		<div>
		    <input id="cranks-fdesde" type="text" class="input-login cranks-fecha" placeholder="  Fec. Desde" value="2016-01-01">
		    <input id="cranks-fhasta" type="text" class="input-login cranks-fecha" placeholder="  Fec. Hasta" value="2016-12-12">
		    <button id="btn-filtrar" type="button" class="btn btn-info btn-filtrar">Filtrar</button>		    
		    <div class="cranks-cant">
		    	<label id="cranks_cant">0</label><label>/5</label>
		    </div>
		    <button id="btn-cranks-mostrar" type="button" class="btn btn-danger btn-mostrar">Mostrar selección</button>		    
		</div>
	</div>
	<div class="cont-tabla">
	<table id="cranks-tabla" class="cranks-tabla" style="text-align: center;">
    	<thead>
	      <tr class="cranks-tabla-titulo">
	        <!-- <th class="th-crank" style="width:100px" >AVION</th> -->
	        <th class="th-crank" style="width:50px">Motor</th>
	        <th class="th-crank" style="width:100px; text-align: center">Fecha</th>
	        <th class="th-crank" style="width:500px; text-align: center">Observación</th>
	        <th class="th-crank" style="width:60px; text-align: center">Acción</th>
	      </tr>
	    </thead>
	    <tbody>
		</tbody>
	</table>
	</div>
</div>