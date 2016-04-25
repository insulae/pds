function cargaJS(){
	//alert(JSON.stringify(dataVoltajeMostrar, "", " "));
	//dibujoGrafica(dataVoltajeMostrar);
	dibujoGrafica2();
}

function rompoJS(){
}


$('#mostrar-amp').click(function(){	
	dibujoGrafica(dataAmperajeMostrar);
	$('#mostrar-amp').addClass('botAmp');
	$('#mostrar-volt').removeClass('botVolt');
});
$('#mostrar-volt').click(function(){	
	dibujoGrafica(dataVoltajeMostrar);
	$('#mostrar-volt').addClass('botVolt');
	$('#mostrar-amp').removeClass('botAmp');
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

function dibujoGrafica(dataMostrar){
	
	//CARGO LA DATA
	var data = dataMostrar;
	       
	
	//CARGO LAS OPCIONES
	
	var options = {
			// SUPPORTED GLOBAL OPTIONS
			animation: false,

			// Boolean - If we should show the scale at all
			showScale: true,

			// String - Colour of the scale line
			scaleLineColor: "#fff",

			// Number - Pixel width of the scale line
			scaleLineWidth: 0.5,

			// Boolean - Whether to show labels on the scale
			scaleShowLabels: true,

			// Interpolated JS string - can access value
			scaleLabel: "<%=value%>",

			// Interpolated JS string - can access value
			scaleArgLabel: "<%=value%>",

			// String - Message for empty data
			emptyDataMessage: "chart has no data",		

			// GRID LINES

			// Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: true,

			// Number - Width of the grid lines
			scaleGridLineWidth:0.2,

			// String - Colour of the grid lines
			scaleGridLineColor: "#fff",

			// Boolean - Whether to show horizontal lines (except X axis)	
			scaleShowHorizontalLines: true,

			// Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			// HORIZONTAL SCALE RANGE

			// Boolean - If we want to override with a hard coded x scale
			xScaleOverride: false,

			// ** Required if scaleOverride is true **
			// Number - The number of steps in a hard coded x scale
			xScaleSteps: null,

			// Number - The value jump in the hard coded x scale
			xScaleStepWidth: null,

			// Number - The x scale starting value
			xScaleStartValue: null,

			// VERTICAL SCALE RANGE

			// Boolean - If we want to override with a hard coded y scale
			scaleOverride: false,

			// ** Required if scaleOverride is true **
			// Number - The number of steps in a hard coded y scale
			scaleSteps: null,

			// Number - The value jump in the hard coded y scale
			scaleStepWidth: null,

			// Number - The y scale starting value
			scaleStartValue: null,

			// DATE SCALE

			// String - scale type: "number" or "date"
			scaleType: "date",

			// Boolean - Whether to use UTC dates instead local
			useUtc: true,

			// String - short date format (used for scale labels)
			scaleDateFormat: "dd-mm",

			// String - short time format (used for scale labels)
			scaleTimeFormat: "h:MM",

			// String - full date format (used for point labels)
			scaleDateTimeFormat: "yyyy-mm-dd",

			// LINES

			// Boolean - Whether to show a stroke for datasets
			datasetStroke: false,

			// Number - Pixel width of dataset stroke
			datasetStrokeWidth: 2,

			// String - Color of dataset stroke
			datasetStrokeColor: '#007ACC',

			// String - Color of dataset stroke
			datasetPointStrokeColor: 'white',

			// Boolean - Whether the line is curved between points
			bezierCurve: true,

			// Number - Tension of the bezier curve between points
			bezierCurveTension: 0.4,

			// POINTS

			// Boolean - Whether to show a dot for each point
			pointDot: true,

			// Number - Pixel width of point dot stroke
			pointDotStrokeWidth: 1,

			// Number - Radius of each point dot in pixels
			pointDotRadius: 6,

			// Number - amount extra to add to the radius to cater for hit detection outside the drawn point
			pointHitDetectionRadius: 4,

			// TEMPLATES

			// Interpolated JS string - can access point fields: 
			// argLabel, valueLabel, arg, value, datasetLabel, size
			//tooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%=argLabel%>; <%=valueLabel%>"

			// Interpolated JS string - can access point fields: 
			// argLabel, valueLabel, arg, value, datasetLabel, size
			multiTooltipTemplate: "<%=argLabel%>; <%=valueLabel%>",

			// Interpolated JS string - can access all chart fields
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><%for(var i=0;i<datasets.length;i++){%><li><span class=\"<%=name.toLowerCase()%>-legend-marker\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%=datasets[i].label%></li><%}%></ul>"
	}
	// Get the context of the canvas element we want to select
	var ctx = document.getElementById("check-graf").getContext("2d");
	chartCheckGraf = new Chart(ctx).Scatter(data, options);
}
/* DIBUJO GRAFICA */

function dibujoGrafica2(){
	  var chart = new CanvasJS.Chart("check-graf",
			    {
		  		theme: 'voltaje',
			     title:{
			      text: "",
			       horizontalAlign: "right"
			    },
			    axisX:{

			      title: "",
			      minimum: 5000,
			      maximum: 100000
			    },
			    axisY:{
			      title: "",
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
			     dataPoints: [

			     //{ x: 10000, y: 1100 },
			     { x: 11000, y: 1200 },
			     { x: 13000, y: 1250 },
			     { x: 15000, y: 1280 },
			     { x: 18000, y: 1600 },

			     { x: 20000, y: 2200 },
			     { x: 20700, y: 2200 },
			     { x: 21000, y: 2200 },
			     { x: 24500, y: 2200 },
			     { x: 26500, y: 2530 },
			     { x: 28500, y: 3040 },

			     { x: 30000, y: 4030 },
			     { x: 30400, y: 3040 },
			     { x: 30600, y: 4060 },
			     { x: 31000, y: 4040 },
			     { x: 31500, y: 5100 },
			     { x: 31900, y: 4200 },
			     { x: 34400, y: 3030 },
			     { x: 37400, y: 3020 },

			     { x: 40000, y: 8210 },
			     { x: 40500, y: 8040 },
			     { x: 40500, y: 9060 },
			     { x: 42300, y: 8300 },
			     { x: 44100, y: 9300 },
			     { x: 45200, y: 6300 },
			     { x: 45400, y: 9900 },
			     { x: 46600, y: 4200 },
			     { x: 48500, y: 8200 },

			     { x: 50000, y: 9040 },
			     { x: 50300, y: 9200 },
			     { x: 50700, y: 7020 },
			     { x: 53000, y: 9040 },
			     { x: 53300, y: 9030 },
			     { x: 56700, y: 10120 },
			     { x: 58700, y: 4020 },

			     { x: 60000, y: 10200 },
			     { x: 60450, y: 10100 },
			     { x: 60400, y: 10400 },
			     { x: 60900, y: 9400 },
			     { x: 61000, y: 9400 },
			     { x: 64000, y: 9000 },
			     { x: 64100, y: 10600 },
			     { x: 64400, y: 10400 },
			     { x: 66000, y: 12400 },
			     { x: 66400, y: 13400 },

			     { x: 70400, y: 10400 },
			     { x: 73200, y: 10600 },
			     { x: 76300, y: 11000 },
			     { x: 78100, y: 12000 },
			     { x: 78500, y: 13000 },

			     { x: 80900, y: 10400 },
			     { x: 90500, y: 13400 }
			     ]
			   }
			   ]
			 });

			chart.render();
}