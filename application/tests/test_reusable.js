// Test randomNumber generator
function test_randomNumber() {
    var price = 1;
    var years = 5000;

    // Calculating price of stock given an amount of years
    for (var i = 0; i < years * 52; i++) { 
        price *= randomNumber();
    };

    // Calculating yearly compound rate
    var compound = Math.pow(price, 1 / years) - 1;

    // Outputting the success or failure of test
    // Ensuring that the typical growth rate is about 10% per annum
    console.log(
        "randomNumber",
        0.09 < compound && compound < 0.11
    );
}

// Test cash
function test_cash() {
    // Resetting
    initialiseUserInterface()

    // Testing default
    console.log(
        "cash default",
        cash() == financialStatus.cash
    );

    // Testing cash after changing
    updateCash(2000);
    console.log(
        "cash updated",
        cash() == 2000
    );
}

// Test updateCash
function test_updateCash() {
    // Resetting
    initialiseUserInterface()

    // Testing cash after changing
    updateCash(2000);
    console.log(
        "updateCash setting cash",
        cash() == 2000
    );
}

// Test addCash
function test_addCash() {
    // Resetting
    initialiseUserInterface()

    // Testing positive addition
    var currentCash = cash();
    addCash(500);
    console.log(
        "addCash adding money",
        cash() == currentCash + 500
    );

    // Testing negative addition
    initialiseUserInterface();
    var currentCash = cash();
    addCash(-1200);
    console.log(
        "addCash subtracting money",
        cash() == currentCash - 1200
    );
}

// Test holdings
function test_holdings() {
    // Resetting
    initialiseUserInterface();

    // Testing default
    console.log(
        "holdings default",
        holdings() == financialStatus.holdings
    );

    // Testing cash after changing
    initialiseUserInterface();
    updateHoldings(2000);
    console.log(
        "holdings updated",
        holdings() == 2000
    );
}

// Test updateHoldings
function test_updateHoldings() {
    // Resetting
    initialiseUserInterface();

    // Testing cash after changing
    updateHoldings(1000);
    console.log(
        "updateholdings updated",
        holdings() == 1000
    );
}

// Test addHoldings
function test_addHoldings() {
    // Resetting
    initialiseUserInterface();

    // Adding holdings
    var stock = holdings();
    addHoldings(200);
    console.log(
        "addHoldings adding",
        holdings() == stock + 200
    );

    // Subtracting holdings
    initialiseUserInterface();
    var stock = holdings();
    addHoldings(-2000);
    console.log(
        "addHoldings subtracting",
        holdings() == stock - 2000
    );
}

// Test holdingsValue
function test_holdingsValue() {
    // Resetting
    initialiseUserInterface();

    // Long
    updateHoldings(200);
    addNextPrice(100, "black", "triangle");
    console.log(
        "holdingsValue long",
        holdingsValue() == 200 * 100
    )

    // Setting up
    initialiseUserInterface();
    updateHoldings(-200);
    addNextPrice(100, "black", "triangle");
    console.log(
        "holdingsValue short",
        holdingsValue() == 200 * 100
    );
}

// Test commission
function test_commission() {
    // Resetting
    initialiseUserInterface();

    // Testing commission
    document.getElementById("commissionSlider").value = 1;
    console.log(
        "commission",
        commission() == 0.99
    );
}

// Test buy
function test_buy() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    document.getElementById("buyAmountSlider").value = 1500;
    console.log(
        "buy",
        buy() == 1500
    );
}

// Test sell
function test_sell() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    document.getElementById("buyAmountSlider").value = 1500;
    console.log(
        "sell",
        sell() == 1500
    );
}

// Test currentTime
function test_currentTime() {
    // Resetting
    initialiseUserInterface();

    // Default
    console.log(
        "currentTime 104 points",
        currentTime() == 104
    );

    // Default
    addNextPrice(100, "black", "triangle");
    console.log(
        "currentTime 105 points",
        currentTime() == 105
    );
}

// Test currentPrice
function test_currentPrice() {
    // Resetting
    initialiseUserInterface();

    // Default
    addNextPrice(100, "black", "triangle");
    console.log(
        "currentPrice default",
        currentPrice() == 100
    );
}

// Test netWorth
function test_netWorth() {
    // Resetting
    initialiseUserInterface();

    // Short position
    updateHoldings(-5);
    updateCash(1000);
    addNextPrice(100, "black", "triangle");
    console.log(
        "netWorth short position",
        netWorth() == 500
    );

    // Long position
    initialiseUserInterface();
    updateHoldings(5);
    updateCash(1000);
    addNextPrice(100, "black", "triangle");
    console.log(
        "netWorth long position",
        netWorth() == 1500
    );

    // No position
    initialiseUserInterface();
    updateHoldings(0);
    updateCash(1000);
    addNextPrice(100, "black", "triangle");
    console.log(
        "netWorth no position",
        netWorth() == 1000
    );
}

// Test amountBoughtAtPoint
function test_amountBoughtAtPoint() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    updateAmountBoughtAtPoint(5);

    // Testing
    console.log(
        "amountBoughtAtPoint",
        amountBoughtAtPoint() == 5
    );
}

// Test updateAmountBoughtAtPoint
function test_updateAmountBoughtAtPoint() {
    // Resetting
    initialiseUserInterface();

    // First update
    updateAmountBoughtAtPoint(5);
    console.log(
        "updateAmountBoughtAtPoint",
        amountBoughtAtPoint() == 5
    );

    // Second update
    updateAmountBoughtAtPoint(1235);
    console.log(
        "updateAmountBoughtAtPoint",
        amountBoughtAtPoint() == 1235
    );
}

// Test addAmountBoughtAtPoint
function test_addAmountBoughtAtPoint() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    updateAmountBoughtAtPoint(100);

    // Adding amount
    addAmountBoughtAtPoint(5);
    console.log(
        "addAmountBoughtAtPoint addition",
        amountBoughtAtPoint() == 105
    );

    // Subtracting amount
    addAmountBoughtAtPoint(-50);
    console.log(
        "addAmountBoughtAtPoint subtract",
        amountBoughtAtPoint() == 55
    );
}

// Test speed
function test_speed() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    document.getElementById("speedSlider").value = 1000;

    // Testing
    console.log(
        "speed",
        speed() == 1000
    );
}

// Test running
function test_running() {
    // Resetting
    initialiseUserInterface();

    // True running
    updateRunning("true");
    console.log(
        "running true",
        running() == "true"
    );

    // False running
    updateRunning("false");
    console.log(
        "running false",
        running() == "false"
    );
}

// Test updateRunning
function test_updateRunning() {
    // Resetting
    initialiseUserInterface();

    // True running
    updateRunning("true");
    console.log(
        "running true",
        running() == "true"
    );

    // False running
    updateRunning("false");
    console.log(
        "running false",
        running() == "false"
    );
}

// Test short
function test_short() {
    // Resetting
    initialiseUserInterface();

    // Currently long
    updateHoldings(10);
    updateCash(1000);
    addNextPrice(100, "black", "triangle");
    console.log(
        "short uniform long position",
        short() == 2997.0029970029973
    );

    // Currently long
    updateHoldings(2);
    updateCash(100);
    addNextPrice(100, "black", "triangle");
    console.log(
        "short long position",
        short() == 499.50049950049953
    );

    // Currently shorting
    initialiseUserInterface();
    updateHoldings(-2);
    updateCash(500);
    addNextPrice(100, "black", "triangle");
    console.log(
        "short short position",
        short() == 99.90009990009992
    )

    // Currently net zero
    initialiseUserInterface();
    updateHoldings(0);
    updateCash(500);
    addNextPrice(100, "black", "triangle");
    console.log(
        "short net zero",
        short() == 499.50049950049953
    );
}

// Test notifyUser
function test_notifyUser() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    notifyUser("test");

    // Testing
    console.log(
        "notifyUser",
        document.getElementById("economicStatus").innerHTML == "test"
    )
}

// Test removeEconomicStatus
function test_removeEconomicStatus() {
    // Resetting
    initialiseUserInterface();
    
    // Setting up
    document.getElementById("economicStatus").innerHTML == "test";
    removeEconomicStatus();

    // Testing
    setTimeout(function() {
        console.log(
            "removeEconomicStatus",
            document.getElementById("economicStatus").innerHTML = "test"
        )
    }, 6000);
}

// Test currentMarkerColor
function test_currentMarkerColor() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    updateCurrentPriceStyle("blue", "cross");

    // Testing
    console.log(
        "currentMarkerColor blue",
        currentMarkerColor() == "blue"
    );
}

// Returns current marker type
function test_currentMarkerType() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    updateCurrentPriceStyle("blue", "cross");

    // Testing
    console.log(
        "currentMarkerColor cross",
        currentMarkerType() == "cross"
    )
}
