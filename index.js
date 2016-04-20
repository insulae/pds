//DECLARACION DE VARIABLES "GLOBALES"
function cargaJS(){
}
function rompoJS(){
	
}
//inicio
var activo='inicio';
var avion='';
var loginEstado='';

//test
var cargaValores; //eliminar esta mierda
var testCometa;

//cranks

//SETEO AVION PARA NO DEMORAR BORRAR
//$('#tab-avion').text(avion);
//$('#tab-test').removeClass('tabno');

//SETEO TAB INICIAL
$('#pagina').load('inicio.php');
$.getScript('inicio.js', function() {cargaJS();});

//TABS
function tabSelect(tab){
	rompoJS();
	if(!($('#tab-'+tab).hasClass('tabno')) && avion !=""){
		$('#pagina').load(tab+'.php');
		$.getScript(tab+'.js', function() {cargaJS();});
		$('#tab-'+tab).addClass('tabactivo').siblings().removeClass('tabactivo');
	}
}

$('#tab-inicio').click(function(){
	tabSelect('inicio');
});

$('#tab-test').click(function(){
	tabSelect('test');	
});

$('#tab-checks').click(function(){
	tabSelect('checks');
});

$('#tab-cranks').click(function(){
	tabSelect('cranks');
});

$('#tab-grabaciones').click(function(){
	tabSelect('grabaciones');
});
