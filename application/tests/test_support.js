// Reset game
function reset_status() {
    // Financial Status
    currentCash = 1000000;
    holdings = 0;
    netWorth = 1000000;

    // Chart
    stopChart();
    amountBoughtAtPoint = 0;
    running = false;
    time = 0;
    price = 100;
    dps = [];
    chart = new CanvasJS.Chart("chartContainer", {
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
    dps.push({
        x: time,
        y: price,
        markerType: "none",
    });
    time++;
    updateChart(103);
}
