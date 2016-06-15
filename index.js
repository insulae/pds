//DECLARACION DE VARIABLES "GLOBALES"
function cargaJS(){
	//no funciona esto en index
}
function rompoJS(){
	
}
//VARIABLES SETEABLES DESDE INTERFAZ
var crankDif = 500;
var idioma_cod = navigator.language.substr (0, 2);

//inicio
var activo='inicio';
var avion='AA-AAA';
var avion_motores = '';
var avion_apu='';
var id_avion='2';
var loginEstado='';
var loginAdmin='';

//test
var testCometa;
var duracionRec = 20000; //en milisegundos
var duracionCrank = 5000; //en milisegundos

//grabaciones


//SETEO AVION PARA NO DEMORAR BORRAR
$('#tab-avion').text(avion);
$('#tab-test').removeClass('tabno');

//SETEO TAB INICIAL
$('#pagina').load('inicio.php');
$.getScript('inicio.js', function() {cargaJS();});
$.getScript('engine/idiomas.js');

//TABS
function tabSelect(tab){
	rompoJS();
	if(!($('#tab-'+tab).hasClass('tabno')) && avion !=""){
		$('#pagina').load(tab+'.php');
		$('#pagina').ready(function() {
			$.getScript('engine/idiomas.js');
			$('#tab-'+tab).addClass('tabactivo').siblings().removeClass('tabactivo');
			$.getScript(tab+'.js', function() {cargaJS();});
		});
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

$('#configuracion').click(function(){
	rompoJS();
	$('#pagina').load('configuracion.php');
	$('#pagina').ready(function() {
		$(".menu-tabs button").removeClass("tabactivo");
		$.getScript('configuracion.js', function() {cargaJS();});
	});

});

