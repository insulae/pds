<link rel="stylesheet" type="text/css" href="inicio.css">
<div class="cont-aviones-fondo">
	<div class="cont-aviones-botonera">
  		<input id="patente" type="text" class="form-control input-avion">
  		<button id="btn-buscar" type="button" class="btn btn-info btn-buscar"><label tex="buscar"/></button>
  		<span class="glyph-icon flaticon-circle-1 add-avion" data-toggle="modal" data-target="#modalAltaAvion"></span>
	</div>
	<div class="cont-aviones">
	<table id="aviones-tabla">
    	<thead>
	      <tr style="height: 40px;">
	        <th style="width:180px"><label tex="avion"/></th>
	        <th><label tex="motores"/></th>
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
		<button id="btn-login" type="button" class="btn btn-danger btn-login"><label tex="ingresar"/></button>
		<button id="btn-deslogin" type="button" class="btn btn-danger btn-login"><label tex="salir"/></button>
		<input id="login-usuario" type="text" class="form-control input-login">
		<input id="login-clave" type="password" class="form-control input-login">
		<label id="login-error" class="login-error"><label tex="login_error"/></label>
	</div>
</div>
<div class="cont-logo" style="left:550px"><img src="images/logo.png"  width="300px"></div>




<!--######################### MODAL AGREGAR AVION ########################## -->
  <!-- Modal -->
  <div class="modal" id="modalAltaAvion" role="dialog">
    <div class="modal-dialog"  style="width: 500px; top: 100px">
      <div class="modal-content">
        <div class="modal-header">
        <label tex="alta_avion"/><button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
            <input id="alta-avion-patente" type="text" class="form-inline input-avion">
            <input id="alta-avion-motores" type="text" class="form-inline input-avion">
            <br><br>
            <div class="form-group">
  				<select id="alta-avion-apu" class="form-control input-avion">
    				<option value="0">APU: NO</option>
    				<option value="1">APU: SI</option>
  				</select>
			</div>
			<textarea id="alta-avion-observacion" class="form-inline input-avion" rows="3" style="width: 405px; height: 50px; margin-bottom: 10px;"></textarea>
            <br><br>
            <button id="avion-agregar" type="button" class="btn btn-danger" style="width: 100px; height: 40px;"><label tex="agregar_avion"/></button>
        </div>
      </div>
      
    </div>
  </div>
