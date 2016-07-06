//DECLARACION DE VARIABLES "GLOBALES"
function cargaJS(){
	//no funciona esto en index
	direccion=window.location.href;
	dispositivo = direccion.search("bangho");
	if(dispositivo > 0){
		resolucion('banghoAv2');	
	}
	
}
function rompoJS(){
	
}
//VARIABLES SETEABLES DESDE INTERFAZ
var crankDif = 100;
var idioma_cod = navigator.language.substr (0, 2);

//inicio
var activo='inicio';
var avion='';
var id_avion='';
var avion_motores = '';
var avion_apu='';
var loginEstado='';
var loginAdmin='';

//test
var testCometa;
var duracionRec = 20000; //en milisegundos
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
	rompoJS();
	if(!($('#tab-'+tab).hasClass('tabno')) && avion !=""){
		$('#pagina').load(tab+'.php');
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

$('#configuracion').click(function(){
	rompoJS();
	$('#pagina').load('configuracion.php');
	$('#pagina').ready(function() {
		$(".menu-tabs button").removeClass("tabactivo");
		$.getScript('configuracion.js', function() {cargaJS();});
	});

});

cargaJS();