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

// Current Cash
function updateCurrentCash() {
    // Updating current cash information
    document.getElementById("currentCash").innerHTML = "$" + currentCash.toFixed(2);
}

// Current Holdings
function updateHoldings() {
    var length = chart.options.data[0].dataPoints.length;
    
    // Upadting current cash information
    document.getElementById("holdings").innerHTML = holdings.toFixed(2) + ", $" + (holdings * chart.options.data[0].dataPoints[length-1].y).toFixed(2);
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

// Buy Amount Slider
document.getElementById("buyAmountSlider").oninput = function() {
    updateBuySlider();
}

// Update Buy Slider Information
function updateBuySlider() {
    if (holdings >= 0) {
        // No shorts to close out
        // Updating maximum purchase amount on slider - cash
        document.getElementById("buyAmountSlider").max = currentCash * 100;

        // Updating buy amount information
        var amount = document.getElementById("buyAmountSlider").value / 100;
        if (Math.round((amount / currentCash) * 100) <= 100) {
            // If current slider position is a valid amount
            document.getElementById("buyAmountDisplay").innerHTML = "$" + amount + " " + Math.round((amount / currentCash) * 100) + "%";
        } else {
            // If the current amount exceeds the maximum purchase amount
            document.getElementById("buyAmountDisplay").innerHTML = "Insufficient Balance";
        }
    } else {
        // Short holdings can be closed
        var length = chart.options.data[0].dataPoints.length;
        var long = currentCash - holdings * chart.options.data[0].dataPoints[length-1].y;

        // Updating maximum purchase amount on slider - cash and close out shorts
        document.getElementById("buyAmountSlider").max = long * 100;

        // Updating buy amount information
        var amount = document.getElementById("buyAmountSlider").value / 100;
        if (Math.round((amount / long) * 100) <= 100) {
            // Current slider position is a valid amount
            document.getElementById("buyAmountDisplay").innerHTML = "$" + amount + " " + Math.round((amount / long) * 100) + "%";
        } else {
            // The current amount exceeds the maximum purchase amount
            document.getElementById("buyAmountDisplay").innerHTML = "Insufficient Balance";
        }
    }
}

// Sell Amount Slider
document.getElementById("sellAmountSlider").oninput = function() {
    updateSellSlider();
}

// Update Sell Slider
function updateSellSlider() {
    if (holdings > 0) {
        // There are holdings to sell
        var commission = 1 - document.getElementById("commissionSlider").value / 10000;
        var length = chart.options.data[0].dataPoints.length;
        var short = currentCash + holdings * chart.options.data[0].dataPoints[length-1].y * (2 - commission);
        var amount = document.getElementById("sellAmountSlider").value / 100;

        // Updating maximum short amount on slider — currentCash + holdingValue
        document.getElementById("sellAmountSlider").max = short * 100;

        // Updating short amount information
        if (Math.round((amount / short) * 100) <= 100) {
            // Current slider position is a valid amount
            document.getElementById("sellAmountDisplay").innerHTML = "$" + amount + " " + Math.round((amount / short) * 100) + "%";
        } else {
            // Current amount exceeds money held
            document.getElementById("sellAmountDisplay").innerHTML = "Insufficient Balance";
        }
    } else {
        // Can only short with margin as no holdings to sell
        var short = currentCash;
        var amount = document.getElementById("sellAmountSlider").value / 100;

        // Updaating maximum short on slider - currentCash
        document.getElementById("sellAmountSlider").max = short * 100;

        // Updating short amount information
        if (Math.round((amount / short) * 100) <= 100) {
            // Current slider position is a valid amount
            document.getElementById("sellAmountDisplay").innerHTML = "$" + amount + " " + Math.round((amount / short) * 100) + "%";
        } else {
            // Current amount exceeds money held
            document.getElementById("sellAmountDisplay").innerHTML = "Insufficient Balance";
        }
    }
}

// If shorting, adjust margin from cash
function shortMarginAdjust() {
    if (holdings < 0) {
        // Currently shorting the stock
        var length = chart.options.data[0].dataPoints.length;
        var currentPrice = chart.options.data[0].dataPoints[length-1].y;
        var previousPrice = chart.options.data[0].dataPoints[length-2].y;
        var priceDifference = currentPrice - previousPrice;

        // Adjusting available cash for the player
        currentCash -= priceDifference * holdings;
    }
}
