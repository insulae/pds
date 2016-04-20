<link rel="stylesheet" type="text/css" href="grabaciones_mostrar.css">
	 	<div class="cont-graf">
			<div style="margin:10px;">
				<canvas id="graf1200" width="580" height="300">
			</div>

			<div class="cont-botonera">
				<span class="glyph-icon flaticon-signs-1 botonico"></span>
				<span class="glyph-icon flaticon-play botonico"></span>
				<span class="glyph-icon flaticon-square botonico"></span>
				<span class="glyph-icon flaticon-video botonico"></span>
				<span class="glyph-icon flaticon-next botonico"></span>				  				  
			</div>
			<div type="button" class="graba-descripcion">
				<label class="label-descripcion">
					Grabación (17/02/2016):  Se cambió turbina... aslas asla sas lasl asl asla lasallas las lasl asl asllasdkasdas sl
				</label>
			</div>
			<div id="graba-reloj" type="button" class="graba-reloj">00m01s</div>
				  
		</div>
	
<!-- CONTENEDOR RELOJES -->
		<div class="cont-relojes-fondo">	
			<div class="cont-relojes">
			
			<!-- RENGLON1 -->
				<div class="relojes-renglon1">
					<div class="corriente">
						<img class="corriente-regla" src="images/corrienteVertical.svg">
						<figure id="corriente-carga" class="corriente-carga"></figure>
						<label id="corriente-valor" class="corriente-valor">---</label>
						<label id="corriente-titulo" class="corriente-titulo">CORRIENTE</label>
					</div>
					
					<div id="voltaje" class="voltaje">
							<img src="images/gaugeOK.svg" style="width: 120px">
					  	<div id="voltaje-aguja" class="voltaje-aguja">
					  		<img src="images/agujaChica.svg" style="width: 9px">
		  				</div>
					  	<label id="voltaje-titulo" class="voltaje-titulo">VOLTAJE</label>
					  	<label id="voltaje-valor" class="voltaje-valor">22</label>
					</div>
				</div>
			<!-- RENGLON2 -->
				
				<div class="relojes-renglon2">
					<div class="bateria">
						<figure id="bateria-carga" class="bateria-carga"></figure>
						<img class="bateria-regla" src="images/bateriaVertical.svg">
						<label id="bateria-valor" class="bateria-valor">--</label>
						<label id="bateria-titulo" class="bateria-titulo">BATERIA</label>
					</div>
					<div class="temperatura">
						<img class="temperatura-regla" src="images/humedadVertical.svg">
						<figure id="temperatura-carga" class="humedad-carga"></figure>
						<label id="temperatura-valor" class="humedad-valor">--</label>
						<label id="temperatura-titulo" class="humedad-titulo">TEMP °C</label>
					</div>
					<div class="humedad">
						<img class="humedad-regla" src="images/humedadVertical.svg">
						<figure id="humedad-carga" class="humedad-carga"></figure>
						<label id="humedad-valor" class="humedad-valor">--</label>
						<label id="humedad-titulo" class="humedad-titulo">HUMEDAD</label>
					</div>
				</div>
				
			<!-- RENGLON3 -->		
				<div class="relojes-renglon3">
					<div id="presion" class="presion">
						<img style="height: 30px;" src="images/barrahBlanca.svg">
						<label id="presion-valor" class="presion-valor"></label>
						<label id="presion-titulo" class="presion-titulo">PRESION</label>
					</div>
				</div>
			</div>
		</div>