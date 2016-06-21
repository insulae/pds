<link rel="stylesheet" type="text/css" href="cranks.css">

<link href="engine/datepicker/bootstrap-datepicker3.min.css" rel="stylesheet">
<script src="engine/datepicker/bootstrap-datepicker.min.js"></script>
<script src="engine/datepicker/bootstrap-datepicker-lang.js"></script>

<div class="cont-cranks-fondo">
	<div class="cont-cranks-botonera">
		<div>
		    <label tex="desde"/>: <input id="cranks-fdesde" type="text" class="input-login cranks-fecha" value="">
		    <label tex="hasta"/>: <input id="cranks-fhasta" type="text" class="input-login cranks-fecha" value="">
		    <button id="btn-filtrar" type="button" class="btn btn-info btn-filtrar"><label tex="cranks_filtrar"/></button>		    
		    <div class="cranks-cant">
		    	<label id="cranks_cant">0</label><label>/5</label>
		    </div>
		    <button id="btn-cranks-mostrar" type="button" class="btn btn-danger btn-mostrar"><label tex="cranks_mostrar"/></button>		    
		</div>
	</div>
	<div class="cont-tabla">
	<table id="cranks-tabla" class="cranks-tabla" style="text-align: center;">
    	<thead>
	      <tr class="cranks-tabla-titulo">
	        <!-- <th class="th-crank" style="width:100px" >AVION</th> -->
	        <th class="th-crank" style="width:50px;"><label tex="cranks_motor"/></th>
	        <th class="th-crank" style="width:100px; text-align: center"><label tex="cranks_fecha"/></th>
	        <th class="th-crank" style="width:500px; text-align: center"><label tex="cranks_observacion"/></th>
	        <th class="th-crank" style="width:60px; text-align: center"><label tex="cranks_accion"/></th>
	      </tr>
	    </thead>
	    <tbody>
		</tbody>
	</table>
	</div>
</div>