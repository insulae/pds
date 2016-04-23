function cargaJS(){
	//crearGraf();
}
function rompoJS(){
	
}

/* DIBUJO GRAFICA */
var getData = new TimeSeries();
setInterval(function() {
  getData.append(new Date().getTime(), (Math.random() * 300)+401);
}, 500);

function rango(range) {
  // TODO implement your calculation using range.min and range.max
  var min = 0;
  var max = 800;
  return {min: min, max: max};
}

function crearGraf() {
	var chart = new SmoothieChart({
				millisPerPixel:43,
				maxValueScale:0.89,
				scaleSmoothing:0.274,
				grid:{strokeStyle:'rgba(119,119,119,0.46)',
				millisPerLine:2000,verticalSections:8},
				labels:{fontSize:8,precision:1},
				//timestampFormatter:SmoothieChart.timeFormatter,
				//maxValue:0, minValue y max se remplasan con funcion rango
				//minValue:800,
				yRangeFunction:rango,
				horizontalLines:[
				     			{color:'#ffffff',lineWidth:1,value:0},
				     			{color:'#880000',lineWidth:2,value:3333},
				     			{color:'#880000',lineWidth:2,value:-3333}
				     			]
	 			});
	    
		chart.addTimeSeries(getData, {lineWidth:3,strokeStyle:'#00ff00',fillStyle:'#000000'});
		chart.streamTo(document.getElementById("graf1200"), 500);
	}
/* DIBUJO GRAFICA */
