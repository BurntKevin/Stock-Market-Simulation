// Test runOrStopChart
function test_runOrStopChart() {
    // Resetting
    initialiseUserInterface();

    // Testing when game is currently stopped
    runOrStopChart();
    console.log(
        "runOrStopChart running a stopped chart",
        document.getElementById("runningStatus").innerHTML == "Stop"
    );

    // Testing when game is currently running
    runOrStopChart();
    console.log(
        "runOrStopChart stopping a running chart",
        document.getElementById("runningStatus").innerHTML == "Run"
    );
}

// Test runChart
function test_runChart() {
    // Resetting
    initialiseUserInterface();

    // Running chart from stop
    runChart();
    console.log(
        "runChart running a stopped chart",
        running() == "true"
    );

    // Running chart from running
    runChart();
    console.log(
        "runChart running a running chart",
        running() == "true"
    );

    // Removing timer
    stopChart()
}

// Test stopChart
function test_stopChart() {
    // Resetting
    initialiseUserInterface();

    // Trying to stop a stopped chart
    stopChart();
    console.log(
        "stopChart stopping a stopped chart",
        running() == "false"
    );

    // Stopping a running chart
    runChart();
    stopChart();
    console.log(
        "stopChart stopping a running chart",
        running() == "false"
    );
}

// Test addNormalPrice
function test_addNormalPrice() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    addNormalPrice(5);

    // Testing
    console.log(
        "addNormalPrice adding price",
        currentPrice() == 5 &&
        currentMarkerColor() == "black" &&
        currentMarkerType() == "none"
    );
}

// Test addCompanyBankruptPrice
function test_addCompanyBankruptPrice() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    addCompanyBankruptPrice();

    // Testing
    console.log(
        "addCompanyBankruptPrice adding price",
        currentPrice() == 0 &&
        currentMarkerColor() == "black" &&
        currentMarkerType() == "cross"
    );
}

// Test addNextPrice
function test_addNextPrice() {
    // Resetting
    initialiseUserInterface();

    // 100 red cross
    addNextPrice(100, "red", "cross");
    console.log(
        "addNextPrice 100 red cross",
        currentPrice() == 100 &&
        currentMarkerColor() == "red" &&
        currentMarkerType() == "cross"
    );

    // 23.21 blue triangle
    addNextPrice(23.21, "blue", "triangle");
    console.log(
        "addNextPrice 23.21 blue triangle",
        currentPrice() == 23.21 &&
        currentMarkerColor() == "blue" &&
        currentMarkerType() == "triangle"
    );
}

// Test updateCurrentPriceStyle
function test_updateCurrentPriceStyle() {
    // Resetting
    initialiseUserInterface();

    // Red cross
    updateCurrentPriceStyle("red", "cross");
    console.log(
        "updateCurrentPriceStyle red cross",
        currentMarkerColor() == "red" &&
        currentMarkerType() == "cross"
    );

    // Blue triangle
    updateCurrentPriceStyle("blue", "triangle");
    console.log(
        "updateCurrentPriceStyle blue triangle",
        currentMarkerColor() == "blue" &&
        currentMarkerType() == "triangle"
    );
}

// Test delistStock
function test_delistStock() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    delistStock();

    // Testing
    console.log(
        "delistStock delisted stock",
        running() == "false" &&
        document.getElementById("economicStatus").innerHTML == "The company has been delisted!" &&
        document.getElementById("runningStatus").innerHTML == "" &&
        holdings() == 0 &&
        currentPrice() == 0 &&
        currentMarkerColor() == "black" &&
        currentMarkerType() == "cross"
    );
}

// Test bankruptUser
function test_bankruptUser() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    bankruptUser();

    // Testing
    console.log(
        "bankruptUser bankrupt status",
        cash() == 0 &&
        holdings() == 0 &&
        document.getElementById("economicStatus").innerHTML == "You are now bankrupt! Your assets have been forcefully taken." &&
        currentMarkerColor() == "black" &&
        currentMarkerType() == "cross" &&
        running() == "false"
    );
}

// Test addBuyOrSellMarker()
function test_addBuyOrSellMarker() {
    // Resetting
    initialiseUserInterface();

    // Net short position
    updateAmountBoughtAtPoint(-5);
    addBuyOrSellMarker();
    console.log(
        "addBuyOrSellMarker",
        currentMarkerType() == "triangle" &&
        currentMarkerColor() == "red"
    );

    // Net long position
    initialiseUserInterface();
    updateAmountBoughtAtPoint(5);
    addBuyOrSellMarker();
    console.log(
        "addBuyOrSellMarker",
        currentMarkerType() == "triangle" &&
        currentMarkerColor() == "green"
    );

    // Net 0 position
    initialiseUserInterface();
    updateAmountBoughtAtPoint(0);
    addBuyOrSellMarker();
    console.log(
        "addBuyOrSellMarker",
        currentMarkerType() == "triangle" &&
        currentMarkerColor() == "brown"
    );
}
