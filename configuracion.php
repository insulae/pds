<link rel="stylesheet" type="text/css" href="configuracion.css">

<div class="cont-usuarios-fondo">
	<div class="cont-usuarios">
	<table id="usuarios-tabla">
    	<thead>
	      <tr style="height: 40px;">
	        <th style="width:150px">Nombre</th>
	        <th style="width:200px;">Usuario</th>
	        <th style="width:20px">Tipo</th>
	        <th style="width:150px; padding-left:50px"><span class="glyph-icon flaticon-circle add-usuario" data-toggle="modal" data-target="#modalAltaUsuario"></span></th>
	      </tr>
	    </thead>
	    <tbody>
		</tbody>
	</table>
	</div>
</div>


<div class="cont-login-fondo">
	<div id="cont-login" class="cont-login">
	</div>
</div>


<!--######################### MODAL AGREGAR usuario ########################## -->
  <!-- Modal -->
  <div class="modal" id="modalAltaUsuario" role="dialog">
    <div class="modal-dialog"  style="width: 500px; top: 100px">
      <div class="modal-content">
        <div class="modal-header">
        <b>Alta de Usuario</b><span class="glyph-icon flaticon-transport"></span><button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
            <input id="alta-usuario-nombre" type="text" class="form-inline input-usuario" style="width: 410px" placeholder="Nombre">
            <br><br><br>
            <input id="alta-usuario-usuario" type="text" class="form-inline input-usuario" style="margin-right: 10px;" placeholder="Usuario">
            <input id="alta-usuario-contraseña" type="text" class="form-inline input-usuario" placeholder="Contraseña">
		     <div class="form-group">
		  				<select id="alta-usuario-tipo" class="form-control input-usuario">
		    				<option value="0">Admin</option>
		    				<option value="1">Analisis</option>
		  				</select>
					</div>
				            
            <br><br><br>
            <button id="usuario-agregar" type="button" class="btn btn-danger" style="width: 100px; height: 40px;">Agregar</button>
        </div>
      </div>
    </div>
  </div>
  
  	<div class="cont-respaldo">
		<button id="btn-backup" type="button" class="btn-info btn-backup"><label tex="conf_backup"></label></button>
		<br>
		<label tex="ultimo_backup"></label>: <div id="archivo_backup"></div>
	</div>
	
<script src="configuracion.js"></script>