<link rel="stylesheet" type="text/css" href="grabaciones.css">

<link href="engine/datepicker/bootstrap-datepicker3.min.css" rel="stylesheet">
<script src="engine/datepicker/bootstrap-datepicker.min.js"></script>
<script src="engine/datepicker/bootstrap-datepicker-lang.js"></script>

<div class="cont-graba-fondo">
	<div class="cont-graba-botonera">
		<div>
		    <label tex="desde"/>: <input id="graba-fdesde" type="text" class="input-login graba-fecha" placeholder="  Fec. Desde" value="">
		    <label tex="hasta"/>: <input id="graba-fhasta" type="text" class="input-login graba-fecha" placeholder="  Fec. Hasta" value="">
		    <button id="btn-filtrar" type="button" class="btn btn-info btn-filtrar"><label tex="rec_filtrar"/></button>		    
		    <button id="btn-graba-mostrar" type="button" class="btn btn-danger btn-mostrar"><label tex="rec_mostrar"/></button>
		</div>
	</div>
	<div class="cont-tabla">
	<table id="graba-tabla" class="graba-tabla" style="text-align: center;">
    	<thead>
	      <tr class="graba-tabla-titulo">
	        <!-- <th class="th-graba" style="width:100px" >AVION</th> -->
	        <th class="th-graba" style="width:100px; text-align: center"><label tex="rec_fecha"/></th>
	        <th class="th-graba" style="width:550px; text-align: center"><label tex="rec_observacion"/></th>
	        <th class="th-graba" style="width:100px; text-align: center""><label tex="rec_accion"/></th>
	      </tr>
	    </thead>
	    <tbody>
		</tbody>
	</table>
	</div>
</div>