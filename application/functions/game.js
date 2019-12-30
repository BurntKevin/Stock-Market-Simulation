// Initialising Chart
// Chart starts off with 104 data points
window.onload = function () {
    // Starting chart at price
    dps.push({
        x: time,
        y: price,
        markerType: "none",
    });
    time++;

    // Adding randomly generated data points
    updateChart(103);
}
