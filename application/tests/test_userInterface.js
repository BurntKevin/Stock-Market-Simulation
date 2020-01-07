// Test updateChart
function test_updateChart() {
    // Reset game
    initialiseUserInterface();

    // Invalid input, 0
    var initial_length = chart.options.data[0].dataPoints.length;
    updateChart(0);
    console.log(
        "updatechart 0 input",
        initial_length == chart.options.data[0].dataPoints.length
    );

    // Invalid input, negative
    initialiseUserInterface();
    var initial_length = chart.options.data[0].dataPoints.length;
    updateChart(-2);
    console.log(
        "updatechart negative input",
        initial_length == chart.options.data[0].dataPoints.length
    );

    // Adding 1 new point
    initialiseUserInterface();
    var initial_length = chart.options.data[0].dataPoints.length;
    updateChart(1);
    console.log(
        "updatechart adding 1 point",
        initial_length + 1 == chart.options.data[0].dataPoints.length
    );

    // Adding 5 new points
    initialiseUserInterface();
    var initial_length = chart.options.data[0].dataPoints.length;
    updateChart(5);
    console.log(
        "updatechart adding 5 points",
        initial_length + 5 == chart.options.data[0].dataPoints.length
    );
}

// Test updateBuySlider
function test_updateBuySlider() {
    // Reset game
    initialiseUserInterface();

    // Long position and insufficient balance to make a position
    updateHoldings(5);
    updateCash(0.0085);
    updateBuySlider();
    console.log(
        "updateBuySlider insufficient balance long",
        document.getElementById("buyAmountDisplay").innerHTML == "Insufficient Balance" &&
        document.getElementById("buyAmountSlider").value == "0" &&
        document.getElementById("buyAmountSlider").max == "0"
    );

    // Long position and current slider position is a valid amount
    initialiseUserInterface();
    updateHoldings(5);
    updateCash(5);
    document.getElementById("buyAmountSlider").value = 2;
    updateBuySlider();
    console.log(
        "updateBuySlider long position and slider valid",
        document.getElementById("buyAmountDisplay").innerHTML == "$2 40%" &&
        document.getElementById("buyAmountSlider").max == 5
    );
    
    // Long position and current slider position exceeds current cash
    initialiseUserInterface();
    updateHoldings(5);
    updateCash(5);
    document.getElementById("buyAmountSlider").value = 1000;
    updateBuySlider();
    console.log(
        "updateBuySlider long position and slider invalid",
        document.getElementById("buyAmountDisplay").innerHTML == "$5.00 100%" &&
        document.getElementById("buyAmountSlider").max == "5.00" &&
        document.getElementById("buyAmountSlider").value == "5"
    );

    // Short position and insufficient balance
    initialiseUserInterface();
    updateHoldings(-5);
    updateCash(0);
    addNormalPrice(0.005);
    updateBuySlider();
    console.log(
        "updateBuySlider short position and insufficient balance",
        document.getElementById("buyAmountDisplay").innerHTML == "Insufficient Balance" &&
        document.getElementById("buyAmountSlider").value == 0 &&
        document.getElementById("buyAmountSlider").max == 0
    );

    // Short position and valid amount
    initialiseUserInterface();
    updateHoldings(-5);
    updateCash(5);
    addNormalPrice(1)
    document.getElementById("buyAmountSlider").value = 1;
    updateBuySlider();
    display = document.getElementById("buyAmountDisplay").outerHTML
    console.log(
        "updateBuySlider short position and valid slider position",
        document.getElementById("buyAmountDisplay").innerHTML == "$1 20%" &&
        document.getElementById("buyAmountSlider").value == 1 &&
        document.getElementById("buyAmountSlider").max == 5
    );

    // Short position and invalid amount
    initialiseUserInterface();
    updateHoldings(-5);
    updateCash(5);
    addNormalPrice(1)
    document.getElementById("buyAmountSlider").value = 100;
    updateBuySlider();
    console.log(
        "updateBuySlider short position and invalid slider position",
        document.getElementById("buyAmountDisplay").innerHTML == "$5.00 100%" &&
        document.getElementById("buyAmountSlider").value == "5" &&
        document.getElementById("buyAmountSlider").max == "5.00"
    );
}

// Test updateSellSlider
function test_updateSellSlider() {
    // Reset game
    initialiseUserInterface();

    // Long and insufficient balance
    updateHoldings(1);
    updateCash(0);
    addNormalPrice(0.0005);
    updateSellSlider();
    console.log(
        "updateSellSlider long and insufficient balance",
        document.getElementById("sellAmountDisplay").innerHTML == "Insufficient Balance" &&
        document.getElementById("sellAmountSlider").value == 0 &&
        document.getElementById("sellAmountSlider").max == 0
    );

    // Long and valid amount
    initialiseUserInterface();
    updateHoldings(1);
    updateCash(3);
    addNormalPrice(1);
    document.getElementById("sellAmountSlider").value = 3;
    updateSellSlider();
    console.log(
        "updateSellSlider long and valid slider",
        document.getElementById("sellAmountDisplay").innerHTML == "$3 60%" &&
        document.getElementById("sellAmountSlider").max == "5.00"
    );

    // Long and invalid amount
    initialiseUserInterface();
    updateHoldings(1);
    updateCash(3);
    addNormalPrice(1);
    document.getElementById("sellAmountSlider").value = 6;
    updateSellSlider();
    console.log(
        "updateSellSlider long and invalid slider",
        document.getElementById("sellAmountDisplay").innerHTML == "$5.00 100%" &&
        document.getElementById("sellAmountSlider").max == "5.00"
    );

    // Short and insufficient balance
    initialiseUserInterface();
    updateHoldings(-1);
    updateCash(0);
    addNormalPrice(1);
    updateSellSlider();
    console.log(
        "updateSellSlider short and insufficient balance",
        document.getElementById("sellAmountDisplay").innerHTML == "Overleveraged" &&
        document.getElementById("sellAmountSlider").value == 0 &&
        document.getElementById("sellAmountSlider").max == "0"
    );

    // Short and valid amount
    initialiseUserInterface();
    updateHoldings(-1);
    updateCash(5);
    addNormalPrice(1);
    document.getElementById("sellAmountSlider").value = 2;
    updateSellSlider();
    console.log(
        "updateSellSlider short and valid slider amount",
        document.getElementById("sellAmountDisplay").innerHTML == "$2 67%" &&
        document.getElementById("sellAmountSlider").max == "3.00"
    );

    // Short and invalid amount
    initialiseUserInterface();
    updateHoldings(-1);
    updateCash(5);
    addNormalPrice(1);
    document.getElementById("sellAmountSlider").value = 3;
    updateSellSlider();
    console.log(
        "updateSellSlider short and invalid slider amount",
        document.getElementById("sellAmountDisplay").innerHTML == "$3 100%" &&
        document.getElementById("sellAmountSlider").max == "3.00"
    );
}

// Test updateDisplayedCash
function test_updateDisplayedCash() {
    // Reset game
    initialiseUserInterface();

    // Current cash is positive
    updateCash(5000);
    updateDisplayedCash();
    console.log(
        "updateDisplayedCash positive number",
        document.getElementById("cash").innerHTML == "$5000.00"
    );

    // Current cash is 0
    initialiseUserInterface();
    updateCash(0);
    updateDisplayedCash();
    console.log(
        "updateDisplayedCash 0 number",
        document.getElementById("cash").innerHTML == "$0.00"
    );

    // Current cash is not a standard number
    initialiseUserInterface();
    updateCash(2321.5216);
    updateDisplayedCash();
    console.log(
        "updateDisplayedCash non-standard number",
        document.getElementById("cash").innerHTML == "$2321.52"
    );
}

// Test updateDisplayedHoldings
function test_updateDisplayedHoldings() {
    // Reset game
    initialiseUserInterface();

    // Holdings is positive
    updateHoldings(5000);
    addNormalPrice(1);
    updateDisplayedHoldings();
    console.log(
        "updateDisplayedHoldings positive number",
        document.getElementById("holdings").innerHTML == "5000.00, $5000.00"
    );

    // Current holdings is 0
    initialiseUserInterface();
    updateHoldings(0);
    addNormalPrice(1);
    updateDisplayedHoldings();
    console.log(
        "updateDisplayedHoldings 0 number",
        document.getElementById("holdings").innerHTML == "0.00, $0.00"
    );

    // Current holdings is not a standard number
    initialiseUserInterface();
    updateHoldings(23.52);
    addNormalPrice(1);
    updateDisplayedHoldings();
    console.log(
        "updateDisplayedHoldings non-standard number",
        document.getElementById("holdings").innerHTML == "23.52, $23.52"
    );
}

// Test updateDisplayedNetWorth
function test_updateDisplayedNetWorth() {
    // Reset game
    initialiseUserInterface();

    // Net worth is positive
    updateHoldings(0);
    updateCash(5000);
    updateDisplayedNetWorth();
    console.log(
        "updateDisplayedNetWorth positive number",
        document.getElementById("netWorth").innerHTML == "$5000.00"
    );

    // Net worth is 0
    initialiseUserInterface();
    updateHoldings(0);
    updateCash(0);
    updateDisplayedNetWorth();
    console.log(
        "updateDisplayedNetWorth 0 number",
        document.getElementById("netWorth").innerHTML == "$0.00"
    );

    // Net worth is not a standard number
    initialiseUserInterface();
    updateHoldings(0);
    updateCash(2321.52);
    updateDisplayedNetWorth();
    console.log(
        "updateDisplayedNetWorth non-standard number",
        document.getElementById("netWorth").innerHTML == "$2321.52"
    );
}
