function cargaJS(){
	//alert(JSON.stringify(dataVoltajeMostrar, "", " "));
	datosGrafica = checksVoltaje;
	temaGrafica = 'voltaje';
	dibujoGrafica();
}

function rompoJS(){
}


$('#mostrar-amp').click(function(){
	datosGrafica = checksAmperaje;
	dibujoGrafica();
	$('#mostrar-amp').addClass('botAmp');
	$('#mostrar-volt').removeClass('botVolt');
	temaGrafica = 'voltaje';
});
$('#mostrar-volt').click(function(){
	datosGrafica = checksVoltaje;
	dibujoGrafica();
	$('#mostrar-volt').addClass('botVolt');
	$('#mostrar-amp').removeClass('botAmp');
	temaGrafica = 'voltaje';
});
/* ######################################## MODAL ######################################## */

//NO SIRVE SE GUARDA PARA VER COMO SE USA LAS MODALES

//$('#modalChecksVer').on('shown.bs.modal', function () {
//    setTimeout(function(){
//    	$('#check-graf').show();      	
//    	dibujoGrafica(dataVoltajeMostrar);
//    }, 100);
//});
//$('#modalChecksVer').on('hidden.bs.modal', function () {
//    setTimeout(function(){
//    	$('#check-graf').hide();
//    }, 100);
//});
//NO SIRVE SE GUARDA PARA VER COMO SE USA LAS MODALES


/* DIBUJO GRAFICA */
function dibujoGrafica(){
	  var chart = new CanvasJS.Chart("check-graf",
			    {
		  		zoomEnabled: true,
		  		theme: temaGrafica,
			     title:{
			      text: "",
			       horizontalAlign: "right"
			    },
			    axisX:{
			      valueFormatString: "DD-MM-YY",
			      title: "",
			      gridThickness: 0.5
			      //minimum: 5000,
			      //maximum: 100000
			    },
			    axisY:{
			      title: ""
			    },			    
			    legend: {
			      verticalAlign: "bottom",
			      horizontalAlign: "left"

			    },
			    data: [
			    {
			     type: "scatter",
			     color: "#14E9FF",
			     markerBorderColor:"#fce94f",
			     markerType: "circle",
			     markerSize: 10,
			     dataPoints: datosGrafica
			    }]		     
			 });

			chart.render();
}
/* DIBUJO GRAFICA */