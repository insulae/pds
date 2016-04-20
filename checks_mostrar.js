function cargaJS(){
	//alert(JSON.stringify(dataVoltajeMostrar, "", " "));
	dibujoGrafica(dataVoltajeMostrar);
}

function rompoJS(){
	chartCheckGraf.destroy();
}


$('#play-check').click(function(){	
	dibujoGrafica(dataAmperajeMostrar);
});
$('#stop-check').click(function(){	
	dibujoGrafica(dataVoltajeMostrar);
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
			scaleLineWidth: 0.3,

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
			scaleGridLineWidth:0.1,

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
