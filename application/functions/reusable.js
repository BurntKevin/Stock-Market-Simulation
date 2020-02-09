// Generate random number - product of 52 numbers is approximately 1.1
function randomNumber() {
    // Number generator which influences growth potential
    number = 1 + (Math.random() - 0.4) / 16.6;

    // Adds variability into the growth rate so that it is not a clean line
    for (var i = 0; i < 40; i++) {
        if (Math.random() > 0.99) {
            number = number * 0.99;
        }
    }

    return number;
}

// Returns the user's cash total
function cash() {
    return financialStatus.cash;
}

// Updates cash
function updateCash(amount) {
    financialStatus.cash = amount;
}

// Add amount to cash
function addCash(amount) {
    financialStatus.cash += amount;
}

// Returns the user's holdings
function holdings() {
    return financialStatus.holdings;
}

// Updates holdings
function updateHoldings(amount) {
    financialStatus.holdings = amount;
}

// Add amount to holdings
function addHoldings(amount) {
    financialStatus.holdings += amount;
}

// Returns the user's holdings value
// Always returns a positive number
// If short, return short amount and if long, return long amount
function holdingsValue() {
    return Math.abs(holdings()) * currentPrice();
}

// Adds amount to holdingsValue
function addHoldingsValue(amount) {
    addHoldings(amount / currentPrice());
}

// Returns the commission
function commission() {
    return 1 - document.getElementById("commissionSlider").value / 100;
}

// Returns buy amount
function buy() {
    return document.getElementById("buyAmountSlider").value;
}

// Returns sell amount
function sell() {
    return document.getElementById("sellAmountSlider").value;
}

// Returns the current time of the stock
function currentTime() {
    return chart.options.data[0].dataPoints.length;
}

// Returns the current price of the stock
function currentPrice() {
    return chart.options.data[0].dataPoints[currentTime() - 1].y;
}

// Returns the user's net worth
function netWorth() {
    if (holdings() > 0) {
        // User is currently in a short position
        return cash() + holdingsValue();
    } else if (holdings() < 0) {
        // User is currently in a long position
        return cash() - holdingsValue();
    } else {
        // User is currently in a net 0 position
        return cash();
    }
}

// Returns the amount bought at the current point
function amountBoughtAtPoint() {
    return chartStatus.amountBoughtAtPoint;
}

// Update amount bought at point
function updateAmountBoughtAtPoint(amount) {
    chartStatus.amountBoughtAtPoint = amount;
}

// Add amount to amount bought at point
function addAmountBoughtAtPoint(amount) {
    chartStatus.amountBoughtAtPoint += amount;
}

// Obtain speed value
function speed() {
    return document.getElementById("speedSlider").value
}

// Returns the chart's running status
function running() {
    return chartStatus.running;
}

// Update the chart's running status
function updateRunning(boolean) {
    chartStatus.running = boolean;
}

// Maximum short finder - 1x leverage where netWorth = short
function short() {
    if (holdings() > 0) {
        // If long, we can close out long positions and use cash obtained from
        // selling and from savings to short
        // Obtaining maximum possible cash right before short
        var maxCash = cash() + holdingsValue() * commission();
        // Shorting using cash
        var maxShort = holdingsValue() + maxCash / (2 - commission());
    } else if (holdings() < 0) {
        // Shorting using cash
        var maxShort = (cash() - 2 * holdingsValue()) / (2 - commission());
    } else {
        // Shorting using cash
        var maxShort = cash() / (2 - commission());
    }

    return maxShort;
}

// Sends a message to the user
function notifyUser(message) {
    document.getElementById("economicStatus").innerHTML = message;
    removeEconomicStatus();
}

// Removes economic status
function removeEconomicStatus() {
    setTimeout(function() {
        document.getElementById("economicStatus").innerHTML = "";
    }, 5000);
}

// Returns current marker colour
function currentMarkerColor() {
    return chart.options.data[0].dataPoints[currentTime() - 1].markerColor;
}

// Returns current marker type
function currentMarkerType() {
    return chart.options.data[0].dataPoints[currentTime() - 1].markerType;
}
