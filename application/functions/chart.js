// Run and Stop Button
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

// Run Chart
function runChart() {
    if (running() == "false") {
        // Chart is not currently running
        updateRunning("true");
        chartStatus.timer = setInterval(function() {
            updateChart(1);
        }, speed());
    }
}

// Stop Chart
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
    addNextPrice(0, "cross", "black");
}

// Adds the next price on the chart
function addNextPrice(price, markerColor, markerType) {
    chartStatus.dps.push({
        x: currentTime(),
        y: price,
        markerColor: markerColor,
        markerType: markerType,
    });
}

// Updates the current price on the chart
function updateCurrentPriceStyle(markerColor, markerType) {
    chart.options.data[0].dataPoints[currentTime() - 1] = {
        x: currentTime() - 1,
        y: currentPrice(),
        markerType: markerColor,
        markerColor: markerType
    };
}

// Generates the next price for the chart
function nextPrice() {
    // Generating next price
    var price = currentPrice() * randomNumber();

    // Checking if the stock should be delisted - if under $0.01
    if (price < 0.01) {
        // Delisting stock
        delistStock();
    } else {
        // Stock remains on the exchange
        addNormalPrice(price);
    }

    // Checking if the user is not bankrupt - net worth under $0.00
    if (netWorth() <= 0 && holdings() != 0 && updateCash() != 0) {
        // User has just turned bankrupt
        bankruptUser();
    }
}

// Delist a stock
function delistStock() {
    // Stock can no longer have more prices, inform the user and remove run button to remove confusion
    stopChart();
    notifyUser("The company has been delisted!");
    document.getElementById("runningStatus").innerHTML = "";
    updateHoldings(0);

    addCompanyBankruptPrice(price);
}

// User is bankrupt
function bankruptUser() {
    // Updating financial status
    updateCash(0);
    updateHoldings(0);

    // Updating user interface
    notifyUser("You are now bankrupt! Your assets have been forcefully taken.");
    updateCurrentPriceStyle("black", "cross");
    stopChart();
}

// Add buy or sell marker at a point depending on net purchase
function addBuyOrSellMarker() {
    // Calculating marker
    if (amountBoughtAtPoint() < 0) {
        // Net short position
        updateCurrentPriceStyle("triangle", "red");
    } else if (amountBoughtAtPoint() > 0) {
        // Net long position
        updateCurrentPriceStyle("triangle", "green")
    } else {
        // Net zero position
        updateCurrentPriceStyle("triangle", "brown")
    }
}
