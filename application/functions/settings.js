// Initialise game
function initialiseUserInterface() {
    initialiseFinancialStatus();
    initialiseChartStatus();
    initialiseDisplayedInformation();
}

// Initialise financial status
function initialiseFinancialStatus() {
    financialStatus = {
        cash: 1000000,
        holdings: 0
    }
}

// Initialise chart status
function initialiseChartStatus() {
    chartStatus = {
        amountBoughtAtPoint: 0,
        running: "false",
        dps: [],
        timer: 0
    }
    chart = new CanvasJS.Chart("chartContainer", {
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

    // Starting chart at 100
    addNextPrice(100, "black", "none");

    // Adding 103 randomly generated data points
    updateChart(103);
}

// Initialise user interface
function initialiseDisplayedInformation() {
    // Run/stop button
    document.getElementById("runningStatus").innerHTML = "Run";

    // Adjusting speed slider
    document.getElementById("speedSlider").step = 1;
    document.getElementById("speedSlider").min = 0;
    document.getElementById("speedSlider").max = 2500;
    document.getElementById("speedSlider").value = 500;
    document.getElementById("speedDisplay").innerHTML = "500ms"

    // Adjusting commission slider
    document.getElementById("commissionSlider").step = 0.01;
    document.getElementById("commissionSlider").min = 0;
    document.getElementById("commissionSlider").max = 1;
    document.getElementById("commissionSlider").value = 0.10;
    document.getElementById("commissionDisplay").innerHTML = "0.10%"

    // Financial status
    updateDisplayedCash();
    updateDisplayedHoldings();
    updateDisplayedNetWorth();

    // Buy slider
    document.getElementById("buyAmountSlider").step = 0.01;
    document.getElementById("buyAmountSlider").min = 0;
    document.getElementById("buyAmountSlider").max = 1000000;
    document.getElementById("buyAmountSlider").value = 10000;
    document.getElementById("buyAmountDisplay").innerHTML = "$10000 1%"

    // Sell slider
    document.getElementById("sellAmountSlider").step = 0.01;
    document.getElementById("sellAmountSlider").min = 0;
    document.getElementById("sellAmountSlider").max = 1000000;
    document.getElementById("sellAmountSlider").value = 10000;
    document.getElementById("sellAmountDisplay").innerHTML = "$10000 1%";

    // Economic Status
    document.getElementById("economicStatus").innerHTML = "";
}
