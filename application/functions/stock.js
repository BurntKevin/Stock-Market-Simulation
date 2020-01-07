// Buy Button
// 1. Check if user is able to purchase the amount specified
// 2. If you have sell trades currently, close them out
// 3. Buy more shares if required
function buyAmount(amount) {
    if (cash() + 0.01 <= amount) {
        // Requested purchase amount exceeds current capital
        notifyUser("Transaction declined! Lack of funds.");
    } else {
        // User is able to purchase
        addAmountBoughtAtPoint(amount * commission());
        addHoldingsValue(amount * commission());
        addCash(-amount);

        // Updating financial status
        updateDisplayedHoldings();
        updateDisplayedCash();
        updateDisplayedNetWorth();

        // Updating user interface
        updateSellSlider();
        updateBuySlider();
        addBuyOrSellMarker();
        chart.render();
    }
}

// Sell Amount
// 1. Check if user is able to purchase the amount specified
// 2. If you have holdings, sell them
// 3. Short shares if required
function sellAmount(amount) {
    if (short() + 0.01 <= amount && holdings() >= 0) {
        // Insufficient balance to make the position
        notifyUser("Transaction declined! Lack of funds.");
    } else if (short() + 0.01 <= amount && holdings() < 0) {
        // Overleveraged short
        notifyUser("Transaction declined! Overleveraged short.");
    } else {
        // Sufficient balance to make the position
        addAmountBoughtAtPoint(-amount * commission());
        addHoldingsValue(-amount);
        addCash(amount * commission());

        // Updating financial status
        updateDisplayedHoldings();
        updateDisplayedCash();
        updateDisplayedNetWorth();

        // Updating user interface
        updateSellSlider();
        updateBuySlider();
        addBuyOrSellMarker();
        chart.render();
    }
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
