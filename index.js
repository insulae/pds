//DECLARACION DE VARIABLES "GLOBALES"
function cargaJS(){
	
}
function rompoJS(){
	
}
//VARIABLES SETEABLES DESDE INTERFAZ
var crankDif = 300;
var idioma_cod = navigator.language.substr (0, 2);

//inicio
var avion='';
var id_avion='';
var avion_motores = '';
var avion_apu='';
var loginEstado='';
var loginAdmin='';

//test
var testCometa;
var duracionRec = 12000; // 10u = 1seg
var duracionCrank = 10000; //en milisegundos

//grabaciones


//SETEO AVION PARA NO DEMORAR BORRAR
//$('#tab-avion').text(avion);
//$('#tab-test').removeClass('tabno');

//SETEO TAB INICIAL
$('#pagina').load('inicio.php');
//$.getScript('engine/idiomas.js');

//TABS
function tabSelect(tab){
	if(!($('#tab-'+tab).hasClass('tabno')) && avion !=""){
		rompoJS();
		$('#pagina').load(tab+'.php');
		$('#tab-'+tab).addClass('tabactivo').siblings().removeClass('tabactivo');
	}
}

$('#tab-inicio').click(function(){
	rompoJS();
	$('#pagina').load('inicio.php');
	$('#pagina').ready(function() {
		$(".menu-tabs button").removeClass("tabactivo");
	});
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
	});
});	

$('#wifi').click(function(){
	rompoJS();
	$('#pagina').load('wificonf.php');
	$('#pagina').ready(function() {
		$(".menu-tabs button").removeClass("tabactivo");	
	});
});

$('#bategraf').click(function(){
	rompoJS();
	$('#pagina').load('bateria.php');
	$('#pagina').ready(function() {
		$(".menu-tabs button").removeClass("tabactivo");	
	});
});

cargaJS();