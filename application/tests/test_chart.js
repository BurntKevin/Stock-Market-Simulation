// Test runOrStopChart()
function test_runOrStopChart() {
    // Resetting game
    reset_status();

    // Testing when game is currently stopped
    runOrStopChart();
    display = document.getElementById("runningStatus").outerHTML;
    console.log(
        "runOrStopChart",
        display == '<span id="runningStatus">Stop</span>'
    );

    // Testing when game is currently running
    runOrStopChart();
    display = document.getElementById("runningStatus").outerHTML;
    console.log(
        "runOrStopChart",
        display == '<span id="runningStatus">Run</span>'
    );
}

// Test runChart()
function test_runChart() {
    // Resetting game
    reset_status();

    // Running chart from stop
    runChart();
    console.log(
        "runChart",
        running == true
    );

    // Running chart from running
    runChart();
    console.log(
        "runChart",
        running == true
    );
}

// Test stopChart()
function test_stopChart() {
    // Resettting game
    reset_status();

    // Trying to stop a stopped chart
    stopChart();
    console.log(
        "stopChart",
        running == false
    );

    // Stopping a running chart
    runChart();
    stopChart();
    console.log(
        "stopChart",
        running == false
    );
}

// Test addBuyOrSellMarker()
function test_addBuyOrSellMarker() {
    // Resetting game
    reset_status();

    var length = chart.options.data[0].dataPoints.length;

    // Net short position
    amountBoughtAtPoint = -5;
    addBuyOrSellMarker();
    markerType = chart.options.data[0].dataPoints[length-1].markerType;
    markerColour = chart.options.data[0].dataPoints[length-1].markerColor;
    console.log(
        "addBuyOrSellMarker",
        markerType == "triangle" && markerColour == "red"
    );

    // Net long position
    reset_status();
    amountBoughtAtPoint = 5;
    addBuyOrSellMarker();
    markerType = chart.options.data[0].dataPoints[length-1].markerType;
    markerColour = chart.options.data[0].dataPoints[length-1].markerColor;
    console.log(
        "addBuyOrSellMarker",
        markerType == "triangle" && markerColour == "green"
    );

    // Net 0 position
    reset_status();
    amountBoughtAtPoint = 0;
    addBuyOrSellMarker();
    markerType = chart.options.data[0].dataPoints[length-1].markerType;
    markerColour = chart.options.data[0].dataPoints[length-1].markerColor;
    console.log(
        "addBuyOrSellMarker",
        markerType == "triangle" && markerColour == "brown"
    );
}

// Test addBankruptMarker()
function test_addBankruptMarker() {
    // Resetting game
    reset_status();

    var length = chart.options.data[0].dataPoints.length;
    
    // Testing function
    addBankruptMarker();
    markerType = chart.options.data[0].dataPoints[length-1].markerType;
    markerColour = chart.options.data[0].dataPoints[length-1].markerColor;
    console.log(
        "addBankruptMarker",
        markerType == "cross" && markerColour == "black"
    );
}
