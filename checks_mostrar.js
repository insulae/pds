var datosGrafica;
function cargaJS(){
	//alert(JSON.stringify(dataVoltajeMostrar, "", " "));
	$("#btn-sensor").attr("sensor", 1);
	datosGrafica = checksVoltaje;
	dibujoGrafica("#73d216");
	$('#check-observacion').text("Desde: "+fdesde+" - "+ "Hasta: "+fhasta);
}

function rompoJS(){
}

$('#btn-sensor').click(function(){
	if($("#btn-sensor").attr("sensor") == 1){
			$("#btn-sensor").attr("sensor", 2);
			$("#btn-sensor").text('Amp');
			$("#btn-sensor").css('background-color','#13E2E0');
			datosGrafica = checksAmperaje;
			dibujoGrafica("#13E2E0");
			
	}else{
		$("#btn-sensor").attr("sensor", 1);
		$("#btn-sensor").text('Volt');
		$("#btn-sensor").css('background-color','#73d216');	
		datosGrafica = checksVoltaje;
		dibujoGrafica("#73d216");
	}
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
function dibujoGrafica(colorCheck){
	  var chart = new CanvasJS.Chart("check-graf",
			  {
			theme: 'cranks',
			width:910,
			height:365,
			zoomEnabled: true,
			//zoomType: "xy",
			title:{
				text: "" 
			},
			animationEnabled: false,
			axisX:{
				valueFormatString: "DD-MM-YY",
				gridThickness: 0.5
			},
			axisY :{
				includeZero:false
			},
			ToolTip: {
				enabled: false
			},
			    data: [
			    {
			    //amp:#13E2E0, vol: #73d216
			     type: "scatter",
			     color: colorCheck,
			     markerBorderColor:colorCheck,
			     markerType: "circle",
			     markerSize: 10,
			     dataPoints: datosGrafica		     
			    }]	     
			 });

			chart.render();
}
/* DIBUJO GRAFICA */

cargaJS();