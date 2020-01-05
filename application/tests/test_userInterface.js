// Test updateCurrentCash
function test_updateCurrentCash() {
    // Reset game
    reset_status();

    // Current cash is positive
    currentCash = 5000;
    updateCurrentCash();
    displayedCash = document.getElementById("currentCash").outerHTML;
    console.log(
        "updateCurrentCash",
        displayedCash == '<span id="currentCash">$5000.00</span>'
    );

    // Current cash is 0
    reset_status();
    currentCash = 0;
    updateCurrentCash();
    displayedCash = document.getElementById("currentCash").outerHTML;
    console.log(
        "updateCurrentCash",
        displayedCash == '<span id="currentCash">$0.00</span>'
    );

    // Current cash is not a standard number
    reset_status();
    currentCash = 42.146214214;
    updateCurrentCash();
    displayedCash = document.getElementById("currentCash").outerHTML;
    console.log(
        "updateCurrentCash",
        displayedCash == '<span id="currentCash">$42.15</span>'
    );
}

// Test updateHoldings
function test_updateHoldings() {
    // Reset game
    reset_status();

    // Getting price of a single share
    var length = chart.options.data[0].dataPoints.length;
    var price = chart.options.data[0].dataPoints[length-1].y.toFixed(2);

    // Holdings is positive
    holdings = 100;
    value = (price * holdings).toFixed(2);
    updateHoldings();
    displayedCash = document.getElementById("holdings").outerHTML;
    console.log(
        "updateHoldings",
        displayedCash == '<span id="holdings">100.00, $' + value + '</span>'
    );

    // Holdings is 0
    holdings = 0;
    updateHoldings();
    displayedCash = document.getElementById("holdings").outerHTML;
    console.log(
        "updateHoldings",
        displayedCash == '<span id="holdings">0.00, $0.00</span>'
    );

    // Holdings is positive
    holdings = -100;
    value = (price * holdings).toFixed(2);
    updateHoldings();
    displayedCash = document.getElementById("holdings").outerHTML;
    console.log(
        "updateHoldings",
        displayedCash == '<span id="holdings">-100.00, $' + value + '</span>'
    );

    // Holdings value is a non-standard accounting number
    holdings = 25.215972;
    value = (price * holdings).toFixed(2);
    updateHoldings();
    displayedCash = document.getElementById("holdings").outerHTML;
    console.log(
        "updateHoldings",
        displayedCash == '<span id="holdings">25.22, $' + value + '</span>'
    );
}

// Test updateNetWorth
function test_updateNetWorth() {
    // Reset game
    reset_status();

    // Testing long positions and not bankrupt
    holdings = 100;

    // Testing long position and bankrupt

    // Testing short positions and not bankrupt
    
    // Testing short positions and bankrupt

    // Testing no position and not bankrupt

    // Testing no position and bankrupt

    console.log("Todo: test_updateNetWorth");
}

// Test updateBuySlider
function test_updateBuySlider() {
    // Reset game
    reset_status();

    // Long position and insufficient balance to make a position
    holdings = 5;
    currentCash = 0.0085;
    updateBuySlider();

    display = document.getElementById("buyAmountDisplay").outerHTML
    console.log(
        "updateBuySlider",
        display == '<span id="buyAmountDisplay">Insufficient Balance</span>'
    );

    // Long position and current slider position is a valid amount
    reset_status();
    holdings = 5;
    currentCash = 5;
    document.getElementById("buyAmountSlider").value = 200;
    document.getElementById("buyAmountSlider").max = 500;
    updateBuySlider();

    display = document.getElementById("buyAmountDisplay").outerHTML
    console.log(
        "updateBuySlider",
        display == '<span id="buyAmountDisplay">$2 40%</span>'
    );
    
    // Long position and current slider position exceeds current cash
    reset_status();
    holdings = 5;
    currentCash = 5;
    document.getElementById("buyAmountSlider").value = 1000;
    updateBuySlider();

    amount = document.getElementById("buyAmountSlider").value;
    display = document.getElementById("buyAmountDisplay").outerHTML;
    console.log(
        "updateBuySlider",
        amount == 500 && display == '<span id="buyAmountDisplay">$5 100%</span>'
    );

    // Short position and insufficient balance
    reset_status();
    holdings = -1;
    currentCash = 0;
    dps.push({
        x: time,
        y: 0.005,
        markerType: "none",
    });
    updateBuySlider();

    display = document.getElementById("buyAmountDisplay").outerHTML
    console.log(
        "updateBuySlider",
        display == '<span id="buyAmountDisplay">Insufficient Balance</span>'
    );

    // Short position and valid amount
    reset_status();
    holdings = -5;
    currentCash = 5;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    document.getElementById("buyAmountSlider").value = 100;
    updateBuySlider();

    display = document.getElementById("buyAmountDisplay").outerHTML
    console.log(
        "updateBuySlider",
        display == '<span id="buyAmountDisplay">$1 10%</span>'
    );

    // Short position and invalid amount
    reset_status();
    holdings = -5;
    currentCash = 5;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    document.getElementById("buyAmountSlider").value = 10000;
    updateBuySlider();

    display = document.getElementById("buyAmountDisplay").outerHTML
    console.log(
        "updateBuySlider",
        display == '<span id="buyAmountDisplay">$10 100%</span>'
    );
}

// Test updateSellSlider
function test_updateSellSlider() {
    // Reset game
    reset_status();

    // Long and insufficient balance
    holdings = 1;
    currentCash = 0;
    dps.push({
        x: time,
        y: 0.005,
        markerType: "none"
    });
    updateSellSlider();

    display = document.getElementById("sellAmountDisplay").outerHTML;
    console.log(
        "updateSellSlider",
        display == '<span id="sellAmountDisplay">Insufficient Balance</span>'
    );

    // Long and valid amount
    reset_status();
    holdings = 1;
    currentCash = 3;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    document.getElementById("sellAmountSlider").value = 3.5 * 100;
    updateSellSlider();

    display = document.getElementById("sellAmountDisplay").outerHTML
    console.log(
        "updateSellSlider",
        display == '<span id="sellAmountDisplay">$3.5 88%</span>'
    );

    // Long and invalid amount
    reset_status();
    holdings = 1;
    currentCash = 3;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    document.getElementById("sellAmountSlider").value = 3.5 * 100;
    updateSellSlider();

    display = document.getElementById("sellAmountDisplay").outerHTML
    console.log(
        "updateSellSlider",
        display == '<span id="sellAmountDisplay">$3.5 88%</span>'
    );

    // Short and insufficient balance
    holdings = -1;
    currentCash = 0;
    dps.push({
        x: time,
        y: 1,
        markerType: "none"
    });
    updateSellSlider();

    display = document.getElementById("sellAmountDisplay").outerHTML;
    console.log(
        "updateSellSlider",
        display == '<span id="sellAmountDisplay">Insufficient Balance</span>'
    );

    // Short and valid amount
    reset_status();
    holdings = -1;
    currentCash = 5;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    document.getElementById("sellAmountSlider").value = 3 * 100;
    updateSellSlider();

    display = document.getElementById("sellAmountDisplay").outerHTML
    console.log(
        "updateSellSlider",
        display == '<span id="sellAmountDisplay">$3 60%</span>'
    );

    // Short and invalid amount
    reset_status();
    holdings = -1;
    currentCash = 1;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    document.getElementById("sellAmountSlider").value = 3 * 100;
    updateSellSlider();

    display = document.getElementById("sellAmountDisplay").outerHTML
    console.log(
        "updateSellSlider",
        display == '<span id="sellAmountDisplay">$1 100%</span>'
    );
}

// Test readjustMargin
function test_readjustMargin() {
    // Reset game
    reset_status();

    // Currently not in a short position
    readjustMargin();
    console.log(
        "readjustMargin",
        currentCash == 1000000
    );

    // Currently in a short position, position increased in value
    reset_status();
    holdings = -10;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    time++;
    dps.push({
        x: time,
        y: 2,
        markerType: "none",
    });
    readjustMargin();
    console.log(
        "readjustMargin",
        currentCash == 999990
    )

    // Currently in a short position, position decreased in value
    reset_status();
    holdings = -10;
    dps.push({
        x: time,
        y: 2,
        markerType: "none",
    });
    time++;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    readjustMargin();
    console.log(
        "readjustMargin",
        currentCash == 1000010
    )
}
