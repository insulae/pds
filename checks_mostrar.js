function cargaJS(){
	//alert(JSON.stringify(dataVoltajeMostrar, "", " "));
	$('#btn-volt').addClass('btn-activo');
	$('#ico-volt').addClass('ico-activo');
	temaGrafica = 'voltaje';
	datosGrafica = checksVoltaje;
	dibujoGrafica();
}

function rompoJS(){
}


$('#btn-amp').click(function(){
	datosGrafica = checksAmperaje;
	dibujoGrafica();
	$('#ico-amp').addClass('ico-activo');
	$('#btn-amp').addClass('btn-activo');
	$('#ico-volt').removeClass('ico-activo');
	$('#btn-volt').removeClass('btn-activo');
	temaGrafica = 'amperaje';
});
$('#btn-volt').click(function(){
	datosGrafica = checksVoltaje;
	dibujoGrafica();
	$('#ico-volt').addClass('ico-activo');
	$('#btn-volt').addClass('btn-activo');
	$('#ico-amp').removeClass('ico-activo');
	$('#btn-amp').removeClass('btn-activo');
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
			    tooltip:{
			    	fontColor:"red"
			    	,fontSize:50
			    	,backgroundColor:"#000"
			    },	
		  		zoomEnabled: true,
		  		width: 910,
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

cargaJS();