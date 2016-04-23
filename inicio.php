<link rel="stylesheet" type="text/css" href="inicio.css">
<div class="cont-aviones-fondo">
	<div class="cont-aviones-botonera">
  		<input id="patente" type="text" class="form-control input-avion" placeholder="Patente">
  		<button id="btn-buscar" type="button" class="btn btn-info btn-buscar">Buscar</button>
  		<span class="glyph-icon flaticon-circle-1 add-avion" data-toggle="modal" data-target="#modalAltaAvion"></span>
	</div>
	<div class="cont-aviones">
	<table id="aviones-tabla">
    	<thead>
	      <tr style="height: 40px;">
	        <th style="width:180px">AVION</th>
	        <th>Motores</th>
	        <th style="width: 200px"><span class="glyph-icon flaticon-arrows-1 icon-acciones"></span></th>
	      </tr>
	    </thead>
	    <tbody>
		</tbody>
	</table>
	</div>
</div>


<div class="cont-login-fondo">
	<div id="cont-login" class="cont-login">
		<label id="login-label" class="login-label"></label>
		<button id="btn-login" type="button" class="btn btn-danger btn-login">Ingresar</button>
		<button id="btn-deslogin" type="button" class="btn btn-danger btn-login">Salir</button>
		<input id="login-usuario" type="text" class="form-control input-login" placeholder="Usuario">
		<input id="login-clave" type="password" class="form-control input-login" placeholder="Contraseña">
		<label id="login-error" class="login-error">Datos no validos</label>
	</div>
</div>
<div class="cont-logo" style="left:550px"><img src="images/logo.png"  width="300px"></div>




<!--######################### MODAL AGREGAR AVION ########################## -->
  <!-- Modal -->
  <div class="modal" id="modalAltaAvion" role="dialog">
    <div class="modal-dialog"  style="width: 500px; top: 100px">
      <div class="modal-content">
        <div class="modal-header">
        <b>Alta de Avión</b><span class="glyph-icon flaticon-transport"></span><button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
            <input id="alta-avion-patente" type="text" class="form-inline input-avion" placeholder="Patente">
            <input id="alta-avion-motores" type="text" class="form-inline input-avion" placeholder="Cantidad de Motores">
            <br><br>
            <div class="form-group">
  				<select id="alta-avion-apu" class="form-control input-avion">
    				<option value="0">APU: NO</option>
    				<option value="1">APU: SI</option>
  				</select>
			</div>
			<textarea id="alta-avion-observacion" class="form-inline input-avion" rows="3" placeholder="Observaciones" style="width: 405px; height: 50px"></textarea>
            <br><br>
            <button id="avion-agregar" type="button" class="btn btn-danger" style="width: 100px; height: 40px;">Agregar</button>
        </div>
      </div>
      
    </div>
  </div>
