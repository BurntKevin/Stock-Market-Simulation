// Run and stop button
function runOrStopChart() {
    if (running() == "false") {
        // Stopping chart if currently stopped
        document.getElementById("runningStatus").innerHTML = "Stop";
        runChart();
    } else {
        // Starting chart if currently running
        document.getElementById("runningStatus").innerHTML = "Run";
        stopChart();
    }
}

// Run chart
function runChart() {
    if (running() == "false") {
        // Chart is not currently running
        updateRunning("true");
        chartStatus.timer = setInterval(function() {
            updateChart(1);
        }, speed());
    }
}

// Stop chart
function stopChart() {
    if (running() == "true") {
        // Chart is currently running
        updateRunning("false");
        clearInterval(chartStatus.timer);
    }
}

// Adds a new price point onto the chart
function addNormalPrice(price) {
    addNextPrice(price, "black", "none");
}

// Adds a company bankrupt price point onto chart
function addCompanyBankruptPrice() {
    addNextPrice(0, "black", "cross");
}

// Adds the next price on the chart
function addNextPrice(price, markerColor, markerType) {
    chartStatus.dps.push({
        x: currentTime(),
        y: parseFloat(price.toFixed(2)),
        markerColor: markerColor,
        markerType: markerType,
    });
}

// Updates the current price on the chart
function updateCurrentPriceStyle(markerColor, markerType) {
    chart.options.data[0].dataPoints[currentTime() - 1] = {
        x: currentTime() - 1,
        y: currentPrice(),
        markerColor: markerColor,
        markerType: markerType
    };
}

// Delist a stock
function delistStock() {
    // Updating user - no more prices, holdings worthless
    stopChart();
    notifyUser("The company has been delisted!");
    document.getElementById("runningStatus").innerHTML = "";
    updateHoldings(0);

    // Updating chart
    addCompanyBankruptPrice();
}

// User is bankrupt
function bankruptUser() {
    // Updating financial status
    updateCash(0);
    updateDisplayedCash();
    updateHoldings(0);

    // Updating user interface
    notifyUser("You are now bankrupt! Your assets have been forcefully taken.");
    updateCurrentPriceStyle("black", "cross");
    stopChart();
}

// Add buy or sell marker at a point depending on net purchase
function addBuyOrSellMarker() {
    if (amountBoughtAtPoint() < 0) {
        // Net short position
        updateCurrentPriceStyle("red", "triangle");
    } else if (amountBoughtAtPoint() > 0) {
        // Net long position
        updateCurrentPriceStyle("green", "triangle");
    } else {
        // Net zero position
        updateCurrentPriceStyle("brown", "triangle");
    }
}
