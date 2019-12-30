// Financial Status
var currentCash = 1000000;
var holdings = 0;
var netWorth = 1000000;

// Chart
var amountBoughtAtPoint = 0;
var running = false;
var time = 0;
var price = 100;
var dps = [];
var chart = new CanvasJS.Chart("chartContainer", {
    zoomEnabled: true,
    axisY: {
        includeZero: true
    },
    data: [{
        type: "spline",
        markerSize: 10,
        dataPoints: dps
    }]
});
