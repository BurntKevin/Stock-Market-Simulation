// Update chart for next data point
function updateChart(count) {
    // Case when count is invalid or unnecessary
    if (count <= 0) {
        return;
    }
    // Case where the stock has been delisted
    if (price <= 0) {
        return;
    }

    // Updating chart with count points
    for (var i = 0; i < count; i++) {
        // Giving chart new point
        price = price * randomNumber();
        // If the new price is below $0.01, the stock is delisted.
        if (price <= 0.01) {
            price = 0;
        }
        // Adding price point
        dps.push({
            x: time,
            y: price,
            markerType: "none",
        });
        time++;

        // Checking if the stock should still be listed on the exchange
        if (price <= 0) {
            // Delisting stock
            stopChart();
            document.getElementById("economicStatus").innerHTML = "The company has been delisted!";
            document.getElementById("runningStatus").innerHTML = "";
            addBankruptMarker();
            
            // Calculating net worth after the stock turns worthless
            if (holdings >= 0) {
                // Stock is now worthless
                holdings = 0;
            } else {
                // Shorter does not need to buy back stock
                var length = chart.options.data[0].dataPoints.length;
                var holdingValue = holdings * chart.options.data[0].dataPoints[length-1].y;
                var commission = 1 - document.getElementById("commissionSlider").value / 10000;

                // Cashing out shorts
                currentCash -= holdingValue * commission;
                holdings = 0;
            }

            // Breaking out of loop, no need to generate more prices as stock has been delisted
            break;
        }
    }

    // Resetting variables
    amountBoughtAtPoint = 0;

    // Updating financial status
    shortMarginAdjust();
    updateCurrentCash;
    updateHoldings();
    updateNetWorth();

    // Updating user interface
    chart.render();
    updateBuySlider();
    updateSellSlider();
};

// Buy Button
// 1. Check if user is able to purchase the amount specified
// 2. If you have sell trades currently, close them out
// 3. Buy more shares if required
function buyAmount() {
    var amount = document.getElementById("buyAmountSlider").value / 100;
    var commission = 1 - document.getElementById("commissionSlider").value / 10000;
    var length = chart.options.data[0].dataPoints.length;
    var holdingValue = holdings * chart.options.data[0].dataPoints[length-1].y;

    if (netWorth == 0) {
        // User is bankrupt
        document.getElementById("economicStatus").innerHTML = "You are bankrupt!";
    } else if (currentCash < amount && holdings >= 0) {
        // Requested purchase amount exceeds current capital - long
        document.getElementById("economicStatus").innerHTML = "Transaction declined! Lack of funds.";
    } else if (-holdingValue + currentCash < amount && holdings < 0) {
        // Requested purchase amount exceeds current capital - short
        document.getElementById("economicStatus").innerHTML = "Transaction declined! Lack of funds.";
    } else {
        // User is able to purchase
        amountBoughtAtPoint += parseFloat(amount) * commission;
        if (holdings >= 0) {
            // Buying more holdings
            holdings = parseFloat(holdings) + (amount / chart.options.data[0].dataPoints[length-1].y) * commission;
            currentCash = currentCash - amount;
        } else if (-holdingValue >= amount) {
            // Only requires closing out short positions
            holdingValue = holdingValue + parseFloat(amount);
            holdings = holdingValue / chart.options.data[0].dataPoints[length-1].y;
            currentCash += parseFloat(amount) * commission;
        } else {
            // Get back margin from short position
            currentCash -= holdingValue * commission;
            holdings = 0;
            amount = parseFloat(amount) + holdingValue;

            // Buyback and purchase with cash
            currentCash -= amount;
            holdings = (amount * commission) / chart.options.data[0].dataPoints[length-1].y;
        }

        // Updating financial status
        updateHoldings();
        updateCurrentCash();
        updateNetWorth();

        // Updating user interface
        updateSellSlider();
        updateBuySlider();
        addBuyOrSellMarker();
    }
}

// Sell Button
// 1. Check if user is able to purchase the amount specified
// 2. If you have holdings, sell them
// 3. Short shares if required
function sellAmount() {
    var amount = parseFloat(document.getElementById("sellAmountSlider").value / 100);
    var commission = 1 - document.getElementById("commissionSlider").value / 10000;
    var length = chart.options.data[0].dataPoints.length;
    var holdingValue = holdings * chart.options.data[0].dataPoints[length-1].y;

    if (netWorth == 0) {
        // User is bankrupt
        document.getElementById("economicStatus").innerHTML = "You are bankrupt!";
    } else if (currentCash + holdingValue * (2 - commission) < amount && holdings >= 0) {
        // Checking if user has sufficient capital - long
        document.getElementById("economicStatus").innerHTML = "Transaction declined! Lack of funds.";
    } else if (currentCash < amount && holdings < 0) {
        // Checking if user has sufficient capital - short
        document.getElementById("economicStatus").innerHTML = "Transaction declined! Lack of funds.";
    } else {
        // Valid request
        amountBoughtAtPoint -= parseFloat(amount) * commission;

        if (holdingValue >= amount) {
            // Selling holdings for money
            currentCash = currentCash + parseFloat(amount) * commission;
            holdingValue -= amount;
            holdings = holdingValue / chart.options.data[0].dataPoints[length-1].y;
        } else {
            // Selling all holdings for money
            if (holdings > 0) {
                currentCash += holdingValue * commission;
                amount -= holdingValue;
                holdings = 0;
            }

            // Putting cash as collateral
            currentCash -= amount;
            holdings -= (amount * commission) / chart.options.data[0].dataPoints[length-1].y;
        }

        // Updating financial status
        updateNetWorth();
        updateHoldings();
        updateCurrentCash();

        // Updating user interface
        updateSellSlider();
        updateBuySlider();
        addBuyOrSellMarker();
    }
}
