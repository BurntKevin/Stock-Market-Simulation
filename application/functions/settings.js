// Financial Status
financialStatus = {
    cash: 1000000,
    holdings: 0
}

// Chart Status
chartStatus = {
    amountBoughtAtPoint: 0,
    running: "false",
    dps: [],
    timer: 0
}
var chart = new CanvasJS.Chart("chartContainer", {
    zoomEnabled: true,
    axisY: {
        includeZero: true
    },
    data: [{
        type: "spline",
        markerSize: 10,
        dataPoints: chartStatus.dps
    }]
});
