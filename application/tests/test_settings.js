// Test initialiseFinancialStatus
function test_initialiseFinancialStatus() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    initialiseFinancialStatus();

    // Checking
    console.log(
        "initialiseFinancialStatus financial status",
        financialStatus.cash == 1000000 && financialStatus.holdings == 0
    );
}

// Test initialiseChartStatus
function test_initialiseChartStatus() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    initialiseChartStatus();

    // Checking
    // Testing chart foundations
    console.log(
        "initialiseChartStatus chart foundations",
        chartStatus.amountBoughtAtPoint == 0 &&
        chartStatus.running == "false" &&
        chartStatus.timer == 0
    );

    // Testing chart information
    console.log(
        "initialiseChartStatus chart information",
        chartStatus.dps.length == 104 && // 104 points
        chart.options.data[0].dataPoints[0].y == 100 // Starts at 100
    );
}

// Testing initialiseDisplayedInformation
function test_initialiseDisplayedInformation() {
    // Resetting
    initialiseUserInterface();

    // Setting up
    initialiseDisplayedInformation();

    // Checking
    // Testing speed slider
    console.log(
        "test_initialiseDisplayedInformation speed",
        document.getElementById("speedSlider").step == 1 &&
        document.getElementById("speedSlider").min == 0 &&
        document.getElementById("speedSlider").max == 2500 &&
        document.getElementById("speedSlider").value == 500 &&
        document.getElementById("speedDisplay").innerHTML == "500ms"
    );

    // Testing commission slider
    console.log(
        "test_initialiseDisplayedInformation commission",
        document.getElementById("commissionSlider").step == 0.01 &&
        document.getElementById("commissionSlider").min == 0 &&
        document.getElementById("commissionSlider").max == 1 &&
        document.getElementById("commissionSlider").value == 0.10 &&
        document.getElementById("commissionDisplay").innerHTML == "0.10%"
    );

    // Testing buy slider
    console.log(
        "test_initialiseDisplayedInformation buy",
        document.getElementById("buyAmountSlider").step == 0.01 &&
        document.getElementById("buyAmountSlider").min == 0 &&
        document.getElementById("buyAmountSlider").max == 1000000 &&
        document.getElementById("buyAmountSlider").value == 10000 &&
        document.getElementById("buyAmountDisplay").innerHTML == "$10000 1%"
    );

    // Testing sell slider
    console.log(
        "test_initialiseDisplayedInformation sell",
        document.getElementById("sellAmountSlider").step == 0.01 &&
        document.getElementById("sellAmountSlider").min == 0 &&
        document.getElementById("sellAmountSlider").max == 1000000 &&
        document.getElementById("sellAmountSlider").value == 10000 &&
        document.getElementById("sellAmountDisplay").innerHTML == "$10000 1%"
    );

    // Testing economic status
    console.log(
        "test_initialiseDisplayedInformation econmicStatus",
        document.getElementById("economicStatus").innerHTML == ""
    );

    // Testing displayed cash
    console.log(
        "test_initialiseDisplayedInformation cash",
        document.getElementById("cash").innerHTML == "$1000000.00"
    );

    // Testing displayed holdings
    console.log(
        "test_initialiseDisplayedInformation holdings",
        document.getElementById("holdings").innerHTML == "0.00, $0.00"
    );

    // Testing displayed net worth
    console.log(
        "test_initialiseDisplayedInformation net worth",
        document.getElementById("cash").innerHTML == "$1000000.00"
    );
}
