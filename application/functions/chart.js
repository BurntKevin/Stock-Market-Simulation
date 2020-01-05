// Run and Stop Button
function runOrStopChart() {
    if (running == false) {
        // Stopping chart if currently stopped
        document.getElementById("runningStatus").innerHTML = "Stop";
        runChart();
    } else {
        // Starting chart if currently running
        document.getElementById("runningStatus").innerHTML = "Run";
        stopChart();
    }
}

// Run Chart
function runChart() {
    if (running == false) {
        // Chart is not currently running
        var speed = document.getElementById("speedSlider").value;
        
        running = true;
        timer = setInterval(function() {
            updateChart(1);
        }, speed);
    }
}

// Stop Chart
function stopChart() {
    if (running == true) {
        // Chart is currently running
        running = false;
        clearInterval(timer);
    }
}

// Add buy or sell marker at a point depending on net purchase
function addBuyOrSellMarker() {
    var length = chart.options.data[0].dataPoints.length;
    var price = chart.options.data[0].dataPoints[length-1].y;
    var time = chart.options.data[0].dataPoints[length-1].x;

    // Calculating marker
    if (amountBoughtAtPoint < 0) {
        // Net short position
        chart.options.data[0].dataPoints[length-1] = {
            x: time,
            y: price,
            markerType: "triangle",
            markerColor: "red"
        };
    } else if (amountBoughtAtPoint > 0) {
        // Net long position
        chart.options.data[0].dataPoints[length-1] = {
            x: time,
            y: price,
            markerType: "triangle",
            markerColor: "green"
        };
    } else {
        // Net zero position
        chart.options.data[0].dataPoints[length-1] = {
            x: time,
            y: price,
            markerType: "triangle",
            markerColor: "brown"
        };
    }

    // Refreshing chart
    chart.render()
}

// Add bankrupt marker to current point
function addBankruptMarker() {
    var length = chart.options.data[0].dataPoints.length;
	var price = chart.options.data[0].dataPoints[length - 1].y;
    var time = chart.options.data[0].dataPoints[length- 1].x;
    
    chart.options.data[0].dataPoints[length- 1] = {x: time, y : price, markerType: "cross", markerColor: "black"};
	chart.render();
}
