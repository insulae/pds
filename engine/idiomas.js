var idiomas = ['en', 'es'];
var idioma = '';


var translate = function (jsdata){
	$("[tex]").each (function (index){
		var strTr = jsdata [$(this).attr ('tex')];
	    $(this).html (strTr);
	});
}

idioma_cod = navigator.language.substr (0, 2);

//console.log(idioma_cod);
//console.log(idiomas);
if (idiomas.indexOf(idioma_cod) >= 0){
	$.getJSON('idiomas/'+idioma_cod.trim()+'.json', translate);
	$.getScript('idiomas/'+idioma_cod.trim()+'_ext.js');
	
}else{
	$.getJSON('idiomas/en.json', translate);
	$.getScript('idiomas/en_ext.js');
}

