var datosBateria = "";
function cargaJS(){
	fecha = 300;
	datosBateria=[
	               { x: fecha, y:  100 },
	               { x: fecha+10, y: 90 },
	               { x: fecha+12, y: 88 },
	               { x: fecha+15, y: 86 },
	               { x: fecha+18, y: 84 },
	               { x: fecha+22, y: 80 },
	               { x: fecha+26, y: 80 },
	               { x: fecha+30, y: 80 },
	               { x: fecha+35, y: 78 },
	               { x: fecha+40, y: 75 },	               
	               { x: fecha+200, y: 0 }
	               ];
	dibujoGrafica("red",datosBateria);
	$('#check-observacion').text("ESTIMATIVO DE USO DE BATERIA EN MINUTOS");
}

function rompoJS(){
}

/* DIBUJO GRAFICA */
function dibujoGrafica(colorCheck,datosBateria){
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
				
				gridThickness: 0.8
			},
			axisY :{
				includeZero:false,
				viewportMaximum:100
			},
			ToolTip: {
				enabled: false
			},
			    data: [
			    {
			    //amp:#13E2E0, vol: #73d216
			     type: "line",
			     color: colorCheck,
			     markerBorderColor:colorCheck,
			     markerType: "none",
			     markerSize: 10,
			     dataPoints: datosBateria		     
			    }]	     
			 });

			chart.render();
}
/* DIBUJO GRAFICA */

cargaJS();