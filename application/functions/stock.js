// Buy Button
// 1. Check if user is able to purchase the amount specified
// 2. If you have sell trades currently, close them out
// 3. Buy more shares if required
function buyAmount(amount) {
    if (cash() < buy()) {
        // Requested purchase amount exceeds current capital
        notifyUser("Transaction declined! Lack of funds.");
    } else {
        // User is able to purchase
        addAmountBoughtAtPoint(amount * commission());
        addHoldings(amount / currentPrice() * commission());
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
    if (short() < amount && holdings() >= 0) {
        // Insufficient balance to make the position
        notifyUser("Transaction declined! Lack of funds.");
    } else if (short() < amount && holdings() < 0) {
        // Overleveraged short
        notifyUser("Transaction declined! Overleveraged short.");
    } else {
        // Sufficient balance to make the position
        addAmountBoughtAtPoint(-amount * commission());
        addHoldings(-amount / currentPrice());
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
