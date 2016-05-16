


<div class="collapse navbar-collapse navbar-default" id="hidden-nav">
	<ul class="nav navbar-nav">

	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="container-fluid">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header"></div>
	
			<!-- MENU IZQUIERDA -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      		<ul class="nav navbar-nav">
	        		<a class="navbar-brand" href="index.php">PDS Control</a>
					<li><a href="index.php?pag=abm_aviones"><?php echo $lvl_aviones?></a></li>
	        		<li><a href="#"><?php echo $lvl_registros?></a></li>
	        		<li><a href="index.php?pag=opcion2"><?php echo $lvl_opcion2?></a></li>
					<li class="dropdown">		
			        	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><?php echo $lvl_configuracion ?> <span class="caret"></span></a>
			        	<ul class="dropdown-menu" role="menu">
				          	<li class="dropdown-submenu"><a tabindex="-1" href="#"><?php echo $lvl_idioma ?></a>
								<ul class="dropdown-menu">
									<li><a href="index.php?idioma=esp">Español</a></li>
									<li><a href="index.php?idioma=eng">English</a></li>						
								</ul>
				    		</li>	
			    			<li class="divider"></li>
							<li><a href="#">...</a></li>						    			
			          </ul>
			  		</li>        
	      		</ul>
	            
			<!-- MENU DERECHA -->
	      		<ul class="nav navbar-nav navbar-right">
	        		<li class="dropdown">
	          			<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><?php echo $lvl_ayuda ?><span class="caret"></span></a>
	          			<ul class="dropdown-menu" role="menu">
	            			<li><a href="#">....</a></li>
	            			<li><a href="#">....</a></li>
	          			</ul>
	        		</li>
	      		</ul>
	      
			</div><!-- /.navbar-collapse -->
		</div><!-- /.container-fluid -->
	</nav>
</div>