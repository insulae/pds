var idiomas = ['en', 'es'];
var idioma = '';

idioma_cod = navigator.language.substr (0, 2);

if (idiomas.indexOf(idioma_cod) >= 0){
	$.getScript('idiomas/'+idioma_cod.trim()+'_ext.js');
}else{
	$.getScript('idiomas/en_ext.js');
}

function cargaIdioma(){
	var translate = function (jsdata){
		$("[tex]").each (function (index){
			var strTr = jsdata [$(this).attr ('tex')];
		    $(this).html (strTr);
		});
	}
	if (idiomas.indexOf(idioma_cod) >= 0){
		$.getJSON('idiomas/'+idioma_cod.trim()+'.json', translate);
	}else{
		$.getJSON('idiomas/en.json', translate);
	}
}