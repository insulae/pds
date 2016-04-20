function cargaJS(){
	dibujoGrafica();
}
function rompoJS(){
	alert('ok');
	chartCranksGraf.destroy();	
}


function dibujoGrafica(){
	var data = {
		    labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
		    datasets: [
		        {
		            label: "(1) 17/01/2016 M1",
		            fillColor: "yellow",
		            strokeColor: "yellow",
		            pointColor: "yellow",
		            pointStrokeColor: "yellow",
		            pointHighlightFill: "white",
		            pointHighlightStroke: "white",
		            data: [60, 59, 57, 66, 62, 61, 67, 59, 59, 66, 62, 61, 67, 66, 62, 61, 67, 59, 57, 62]
		        },
		        {
		            label: "(2) 18/01/2016 M1",
		            fillColor: "red",
		            strokeColor: "red",
		            pointColor: "red",
		            pointStrokeColor: "red",
		            pointHighlightFill: "white",
		            pointHighlightStroke: "white",
		            data: [60, 62, 58, 62, 61, 59, 63, 60, 57, 59, 62, 59, 58, 61, 61, 61, 61, 59, 57, 62]
		        },
		        {
		            label: "(3) 18/01/2016 M2",
		            fillColor: "green",
		            strokeColor: "green",
		            pointColor: "green",
		            pointStrokeColor: "green",
		            pointHighlightFill: "white",
		            pointHighlightStroke: "white",
		            data: [59, 63, 60, 57,60, 62, 58, 62, 61, 59, 61, 62, 59, 58, 61, 61, 61, 59, 57, 62]
		        },
		        {
		            label: "(4) 19/01/2016 M2",
		            fillColor: "#00ffff",
		            strokeColor: "#00ffff",
		            pointColor: "#00ffff",
		            pointStrokeColor: "#00ffff",
		            pointHighlightFill: "white",
		            pointHighlightStroke: "white",
		            data: [59, 58, 61, 61, 61, 61, 59, 57, 62, 62, 61, 59, 63, 60, 57, 59, 62,60, 62, 58]
		        },
		        {
		            label: "(5) 25/01/2016 M1",
		            fillColor: "fuchsia",
		            strokeColor: "fuchsia",
		            pointColor: "fuchsia",
		            pointStrokeColor: "fuchsia",
		            pointHighlightFill: "white",
		            pointHighlightStroke: "white",
		            data: [59, 58, 61, 61, 61, 61, 59, 60, 62, 58, 62, 61, 59, 63, 60, 57, 59, 62, 57, 62]
		        },
		        {
		            label: "(6) 26/01/2016 M1",
		            fillColor: "grey",
		            strokeColor: "grey",
		            pointColor: "grey",
		            pointStrokeColor: "grey",
		            pointHighlightFill: "white",
		            pointHighlightStroke: "white",
		            data: [60, 57, 59, 62, 59, 58, 61, 61, 61, 61, 59, 57, 62,60, 62, 58, 62, 61, 59, 63]
		        }	        	        	        	        
		    ]
		};
	var options = {

		animation: false,
		
	    ///Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,

	    //String - Colour of the grid lines
	    scaleGridLineColor : "white",

	    //Number - Width of the grid lines
	    scaleGridLineWidth : 0.2,

	    //Boolean - Whether to show horizontal lines (except X axis)
	    scaleShowHorizontalLines: true,

	    //Boolean - Whether to show vertical lines (except Y axis)
	    scaleShowVerticalLines: false,

	    //Boolean - Whether the line is curved between points
	    bezierCurve : true,

	    //Number - Tension of the bezier curve between points
	    bezierCurveTension : 0.2,

	    //Boolean - Whether to show a dot for each point
	    pointDot : true,

	    //Number - Radius of each point dot in pixels
	    pointDotRadius : 1,

	    //Number - Pixel width of point dot stroke
	    pointDotStrokeWidth : 1,

	    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	    pointHitDetectionRadius : 10,

	    //Boolean - Whether to show a stroke for datasets
	    datasetStroke : true,

	    //Number - Pixel width of dataset stroke
	    datasetStrokeWidth : 2,

	    //Boolean - Whether to fill the dataset with a colour
	    datasetFill : false,

	    //String - A legend template
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	};
	var ctx = document.getElementById("cranks-graf").getContext("2d");
	var chartCranksGraf = new Chart(ctx).Line(data, options);
}