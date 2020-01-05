// Speed Slider
document.getElementById("speedSlider").oninput = function() {
    // If running, restart chart so that the new speed is used
    if (running == true) {
        stopChart();
        runChart();
    }

    // Updating speed information
    document.getElementById("speedDisplay").innerHTML = this.value + "ms";
}

// Commission Slider
document.getElementById("commissionSlider").oninput = function() {
    // Updating commission information
    document.getElementById("commissionDisplay").innerHTML = this.value / 100 + "%";
}

// Buy Amount Slider
document.getElementById("buyAmountSlider").oninput = function() {
    updateBuySlider();
}

// Sell Amount Slider
document.getElementById("sellAmountSlider").oninput = function() {
    updateSellSlider();
}

// Current Cash
function updateCurrentCash() {
    // Updating current cash
    document.getElementById("currentCash").innerHTML = "$" + currentCash.toFixed(2);
}

// Current Holdings
function updateHoldings() {
    var length = chart.options.data[0].dataPoints.length;
    var price = chart.options.data[0].dataPoints[length-1].y.toFixed(2);
    var holdingsValue = (holdings * price).toFixed(2);

    // Upadting current cash information
    document.getElementById("holdings").innerHTML = holdings.toFixed(2) + ", $" + holdingsValue;
}

// Dyanmically updates net worth
function updateNetWorth() {
    if (holdings > 0) {
        // Have long positions
        var length = chart.options.data[0].dataPoints.length;

        netWorth = currentCash + holdings * chart.options.data[0].dataPoints[length-1].y;
    } else if (holdings < 0) {
        // Have short positions
        var length = chart.options.data[0].dataPoints.length;

        netWorth = currentCash - holdings * chart.options.data[0].dataPoints[length-1].y;
    } else {
        // Have no position
        netWorth = currentCash;
    }

    // Updating user interface
    if (netWorth <= 0) {
        // If the user is bankrupt
        currentCash = 0;
        updateCurrentCash();
        holdings = 0;
        updateHoldings();
        netWorth = 0;

        // Updating user interface
        document.getElementById("economicStatus").innerHTML = "You are now bankrupt! Your assets have been forcefully taken.";
        document.getElementById("netWorth").innerHTML = "$" + netWorth.toFixed(2);
        document.getElementById("runningStatus").innerHTML = "";
        addBankruptMarker();
        stopChart();
    } else {
        // If the user is not bankrupt
        document.getElementById("netWorth").innerHTML = "$" + netWorth.toFixed(2);
    }
}

// Update Buy Slider Information
function updateBuySlider() {
    // Finding maximum amount to buy
    if (holdings >= 0) {
        // No shorts to close out
        var long = currentCash;
    } else {
        // Short holdings can be closed
        var length = chart.options.data[0].dataPoints.length;
        var price = chart.options.data[0].dataPoints[length-1].y;

        // Two commissions due to closing short fee and long position fee
        var shorted = Math.abs(holdings * price);
        var long = currentCash + shorted;
    }

    // Updating slider maximum
    document.getElementById("buyAmountSlider").max = long * 100;

    // Updating buy amount information
    var amount = document.getElementById("buyAmountSlider").value / 100;
    var currentRequestedPercentage = Math.round((amount / long) * 100);
    var commission = 1 - document.getElementById("commissionSlider").value / 10000;
    if (long < 0.01 / commission) {
        // Insufficient balance to make a position
        document.getElementById("buyAmountDisplay").innerHTML = "Insufficient Balance";
    } else if (currentRequestedPercentage <= 100) {
        // Current slider position is a valid amount
        document.getElementById("buyAmountDisplay").innerHTML = "$" + amount + " " + currentRequestedPercentage + "%";
    } else {
        // The current amount exceeds the maximum purchase amount, readjust to maximum purchase
        document.getElementById("buyAmountSlider").value = long;
        document.getElementById("buyAmountDisplay").innerHTML = "$" + long + " 100%";
    }
}

// Update Sell Slider
function updateSellSlider() {
    // Calculating maximum short amount
    if (holdings > 0) {
        // There are holdings to sell and cash to use - currentCash + holdingValue
        var length = chart.options.data[0].dataPoints.length;
        var price = holdings * chart.options.data[0].dataPoints[length-1].y;
        var short = currentCash + Math.abs(holdings * price);
    } else {
        // Can only short with cash as no holdings to sell - current cash
        var short = currentCash;
    }

    // Updating maximum short amount on slider — currentCash + holdingValue
    document.getElementById("sellAmountSlider").max = short * 100;

    // Updating sell amount information
    var amount = document.getElementById("sellAmountSlider").value / 100;
    var currentRequestedPercentage = Math.round((amount / short) * 100);
    var commission = 1 - document.getElementById("commissionSlider").value / 10000;
    if (short < 0.01 / commission) {
        // Insufficient balance to make a position
        document.getElementById("sellAmountDisplay").innerHTML = "Insufficient Balance";
    } else if (currentRequestedPercentage <= 100) {
        // Current slider position is a valid amount
        document.getElementById("sellAmountDisplay").innerHTML = "$" + amount + " " + currentRequestedPercentage + "%";
    } else {
        // The current amount exceeds the maximum purchase amount, readjust to maximum purchase
        document.getElementById("sellAmountSlider").value = short;
        document.getElementById("sellAmountDisplay").innerHTML = "$" + short + " 100%";
    }
}

function readjustMargin() {
    // Updating current cash available if shorting
    if (holdings < 0) {
        var length = chart.options.data[0].dataPoints.length;
        var previousPrice = chart.options.data[0].dataPoints[length-2].y;
        var currentPrice = chart.options.data[0].dataPoints[length-1].y;
        var priceDifference = currentPrice - previousPrice;
        var priceValue = priceDifference * Math.abs(holdings);

        currentCash -= priceValue;
    }
}
