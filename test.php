<link rel="stylesheet" type="text/css" href="test.css">

<div class="cont-graf">
	<div style="margin:10px;">
		<canvas id="graf1200" width="580" height="300"></canvas>
	</div>

	<div class="cont-botonera">
	    <button id='cartel' type="button" class="btn cartel" style="width: 150px; height: 60px;"><label tex="test_cartel"/></button>
	    <button id="btnRec" type="button" class="btn btn-danger" style="width:80px; height: 60px; float: right;margin-right:5px;"><label tex="test_rec"/></button>
		<button id="btnFreeze" type="button" class="btn btn-info" style="width:80px; height: 60px;float: right;margin-right:5px;"><label tex="test_freeze"/></button>
		<button id="btnCheck" type="button" class="btn btn-primary" style="width:80px; height: 60px;float: right;margin-right:5px;"><label tex="test_check"/></button>			
	</div>
		  
</div>
	
<!-- CONTENEDOR RELOJES -->
<div class="cont-relojes-fondo">	
	<div class="cont-relojes">
	
	<!-- RENGLON1 -->
		<div class="relojes-renglon1">
			<div id="corriente" class="corriente">
					<img src="images/amperaje.svg" style="width: 120px">
			  	<div id="corriente-aguja" class="corriente-aguja">
			  		<img src="images/agujaChica.svg" style="width: 9px">
  				</div>
			  	<label id="corriente-titulo" class="corriente-titulo" tex="test_corriente"></label>
			  	<label id="corriente-valor" class="corriente-valor"></label>
			</div>
			
			<div id="voltaje" class="voltaje">
					<img src="images/voltaje.svg" style="width: 120px">
			  	<div id="voltaje-aguja" class="voltaje-aguja">
			  		<img src="images/agujaChica.svg" style="width: 9px">
  				</div>
			  	<label id="voltaje-titulo" class="voltaje-titulo" tex="test_voltaje"></label>
			  	<label id="voltaje-valor" class="voltaje-valor"></label>
			</div>
		</div>
	<!-- RENGLON2 -->
		
		<div class="relojes-renglon2">
			<div class="bateria">
				<figure id="bateria-carga" class="bateria-carga"></figure>
				<img class="bateria-regla" src="images/bateriaVertical.svg">
				<label id="bateria-valor" class="bateria-valor">--</label>
				<label id="bateria-titulo" class="bateria-titulo" tex="test_bateria"></label>
			</div>
			<div class="temperatura">
				<img class="temperatura-regla" src="images/temperaturaVertical.svg">
				<figure id="temperatura-carga" class="temperatura-carga"></figure>
				<label id="temperatura-valor" class="temperatura-valor">--</label>
				<label id="temperatura-titulo" class="temperatura-titulo" tex="test_temperatura"></label>
			</div>
			<div class="humedad">
				<img class="humedad-regla" src="images/humedadVertical.svg">
				<figure id="humedad-carga" class="humedad-carga"></figure>
				<label id="humedad-valor" class="humedad-valor">--</label>
				<label id="humedad-titulo" class="humedad-titulo" tex="test_humedad"></label>
			</div>
		</div>
		
	<!-- RENGLON3 -->		
		<div class="relojes-renglon3">
			<div id="presion" class="presion">
				<img style="height: 30px;" src="images/presion.svg">
				<label id="presion-valor" class="presion-valor"></label>
				<label id="presion-titulo" class="presion-titulo" tex="test_presion"></label>
			</div>
		</div>
	</div>
</div>

<!--######################### MODAL AGREGAR GRABACION ########################## -->
  <div class="modal" id="modalAltaGraba" role="dialog" data-backdrop="static" data-keyboard="false" data-backdrop="false">
    <div class="modal-dialog"  style="width: 500px; top: 100px">
      <div class="modal-content">
        <div class="modal-header">
       	 <label tex="titulo_guardar_graba"/>
        </div>
        <div class="modal-body">
            <div class="form-group">
				<textarea id="observacion-graba" class="form-inline input-guardar" rows="4" style="width: 450px; height: 70px; margin-bottom: 10px"></textarea>
            	<button id="guardar-graba" type="button" class="btn btn-danger" style="width: 100px; height: 40px;"><label tex="guardar_graba"/></button>
            	<button id="descartar-graba" type="button" class="btn btn-danger" style="width: 100px; height: 40px;"><label tex="descartar_graba"/></button>
        	</div>
      	</div>
    	</div>
  	</div>
  </div>
<!--######################### MODAL AGREGAR CRANK ########################## -->
  <div class="modal" id="modalAltaCrank" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog"  style="width: 500px; top: 100px">
      <div class="modal-content">
        <div class="modal-header">
       	 <label tex="titulo_guardar_crank"/>
        </div>
        <div class="modal-body">
            <div class="form-group">
				<textarea id="observacion-crank" class="form-inline input-guardar" rows="4" style="width: 455px; height: 70px; margin-bottom: 10px"></textarea>
  				<select id="motor-crank" class="form-control input-avion">
  				</select>
				<br><br>			
            	<button id="guardar-crank" type="button" class="btn btn-danger" style="width: 100px; height: 40px;"><label tex="guardar_crank"/></button>
            	<button id="descartar-crank" type="button" class="btn btn-danger" style="width: 100px; height: 40px;"><label tex="descartar_crank"/></button>
        	</div>
      	</div>
    	</div>
  	</div>
  </div>  
  <!--######################### MODAL AGREGAR FREEZE/CHECK ########################## -->
  <!-- Modal -->
  <div class="modal" id="modalAltaCheck" role="dialog" data-backdrop="static" data-keyboard="false" style="z-index: 1042 !important;">
    <div class="modal-dialog"  style="width: 500px; top: 100px">
      <div class="modal-content">
        <div class="modal-header">
       	 Guardar Freeze/Check
        </div>
        <div class="modal-body">
            <div class="form-group">
			<textarea id="observacion-check" class="form-inline input-guardar" rows="4" placeholder="Observaciones" style="width: 430px; height: 70px; margin-bottom: 10px"></textarea>
            <button id="guardar-check" type="button" class="btn btn-danger" style="width: 100px; height: 40px;">Guardar</button>
            <button id="descartar-check" type="button" class="btn btn-danger" style="width: 100px; height: 40px;">Descartar</button>
        </div>
      </div>      
    </div>
  </div>
  <script src="test.js"></script>