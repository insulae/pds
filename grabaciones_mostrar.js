function cargaJS(){
	crearGraf();
}
function rompoJS(){
	
}

/* DIBUJO GRAFICA */
function crearGraf(){
	
  	//creo la grafica
	var chart = new CanvasJS.Chart("graba-graf",
	{
		theme: 'voltaje',
		width:910,
		zoomEnabled: true,
		title:{
			text: "" 
		},
		animationEnabled: false,
		axisX:{
			labelAngle: 30
		},
		axisY :{
			includeZero:false
		},
		ToolTip: {
			enabled: false
		},
		data: datosGrafica() 
	});
	
	chart.render();
} 

function datosGrafica(){

   var limit = 100; //limite de puntos a mostrar hasta 100000 no se inmuta
   var y = 0;
   var data = [];
   var dataSeries = { type: "spline" };
   var dataPoints = [];
   for (var i = 0; i < limit; i += 1) {
	   y = (Math.random() * (300)+500);	   
	   dataPoints.push({
		   x: i,
		   y: y
	   });
  }
  dataSeries.dataPoints = dataPoints;
  data.push(dataSeries);
  return data;
}
/* DIBUJO GRAFICA */
