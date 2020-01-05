// Update chart for next data point
function updateChart(count) {
    // Case when count is invalid or unnecessary
    if (count <= 0) {
        return;
    }
    // Case where the stock has been delisted
    if (currentPrice() <= 0) {
        return;
    }

    // Updating chart with count points
    for (var i = 0; i < count; i++) {
        // Giving chart a new point
        nextPrice();
    }

    // Resetting variables
    updateAmountBoughtAtPoint(0);

    // Updating financial status
    updateDisplayedHoldings();
    updateDisplayedNetWorth();

    // Updating user interface
    updateBuySlider();
    updateSellSlider();
    chart.render();
};

// Speed Slider
document.getElementById("speedSlider").oninput = function() {
    // If running, restart chart so that the new speed is used
    if (running() == "true") {
        console.log("Hey")
        stopChart();
        runChart();
    }

    // Updating speed information
    document.getElementById("speedDisplay").innerHTML = this.value + "ms";
}

// Commission Slider
document.getElementById("commissionSlider").oninput = function() {
    document.getElementById("commissionDisplay").innerHTML = this.value + "%";
}

// Buy Amount Slider
document.getElementById("buyAmountSlider").oninput = function() {
    updateBuySlider();
}

// Sell Amount Slider
document.getElementById("sellAmountSlider").oninput = function() {
    updateSellSlider();
}

// Buy Button Slider
function buySlider() {
    var amount = document.getElementById("buyAmountSlider").value;

    buyAmount(amount);
}

// Sell amount slider
function sellSlider() {
    var amount = document.getElementById("sellAmountSlider").value;

    sellAmount(amount);
}

// Update Buy Slider Information
function updateBuySlider() {
    // Updating buy amount information
    var currentRequestedPercentage = Math.round((buy() / cash()) * 100);

    if (cash() < 0.01) {
        // Insufficient balance to make a position
        document.getElementById("buyAmountSlider").value = 0;
        document.getElementById("buyAmountSlider").max = 0;
        document.getElementById("buyAmountDisplay").innerHTML = "Insufficient Balance";
    } else if (currentRequestedPercentage <= 100) {
        // Current slider position is a valid amount
        document.getElementById("buyAmountSlider").max = cash();
        document.getElementById("buyAmountDisplay").innerHTML = "$" + buy() + " " + currentRequestedPercentage + "%";
    } else {
        // The current amount exceeds the maximum purchase amount, readjust to maximum purchase
        document.getElementById("buyAmountSlider").max = cash();
        document.getElementById("buyAmountSlider").value = cash();
        document.getElementById("buyAmountDisplay").innerHTML = "$" + cash()+ " 100%";
    }
}

// Update Sell Slider
function updateSellSlider() {
    // Updating sell amount information
    var currentRequestedPercentage = Math.round((sell() / short()) * 100);
    if (short() < 0.01) {
        // Insufficient balance to make a position
        document.getElementById("sellAmountSlider").value = 0;
        document.getElementById("sellAmountSlider").max = 0;
        document.getElementById("sellAmountDisplay").innerHTML = "Overleveraged";
    } else if (currentRequestedPercentage <= 100) {
        // Current slider position is a valid amount
        document.getElementById("sellAmountSlider").max = short();
        document.getElementById("sellAmountDisplay").innerHTML = "$" + sell() + " " + currentRequestedPercentage + "%";
    } else {
        // The current amount exceeds the maximum purchase amount, readjust to maximum purchase
        document.getElementById("sellAmountSlider").max = short();
        document.getElementById("sellAmountSlider").value = short();
        document.getElementById("sellAmountDisplay").innerHTML = "$" + short() + " 100%";
    }
}

// Updates displayed cash
function updateDisplayedCash() {
    document.getElementById("cash").innerHTML = "$" + cash().toFixed(2);
}

// Updates displayed holdings
function updateDisplayedHoldings() {
    document.getElementById("holdings").innerHTML = holdings().toFixed(2) + ", $" + holdingsValue().toFixed(2);
}

// Updates displayed net worth
function updateDisplayedNetWorth() {
    document.getElementById("netWorth").innerHTML = "$" + netWorth().toFixed(2);
}
