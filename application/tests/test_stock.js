// Test updateChart
function test_updateChart() {
    // Reset game
    reset_status();

    // Invalid input, 0
    var initial_length = chart.options.data[0].dataPoints.length;
    updateChart(0);
    var new_length = length = chart.options.data[0].dataPoints.length;
    console.log(
        "updatechart",
        initial_length == new_length
    )

    // Invalid input, negative
    var initial_length = chart.options.data[0].dataPoints.length;
    updateChart(-2);
    var new_length = length = chart.options.data[0].dataPoints.length;
    console.log(
        "updatechart",
        initial_length == new_length
    )

    // Adding 1 new point
    var initial_length = chart.options.data[0].dataPoints.length;
    updateChart(1);
    var new_length = length = chart.options.data[0].dataPoints.length;
    console.log(
        "updatechart",
        initial_length == new_length - 1
    );

    // Adding 5 new points
    var initial_length = chart.options.data[0].dataPoints.length;
    updateChart(5);
    var new_length = length = chart.options.data[0].dataPoints.length;
    console.log(
        "updatechart",
        initial_length == new_length - 5
    );
}

// Test buySlider
function test_buySlider() {
    // Reset game
    reset_status();
    
    buySlider();
}

// Test buyAmount
function test_buyAmount() {
    // Reset game
    reset_status();

    // Bankrupt user
    netWorth = 0;
    buyAmount(1000);
    display = document.getElementById("economicStatus").outerHTML;
    console.log(
        "buyAmount",
        display == '<div id="economicStatus" style="text-align: center">You are bankrupt!</div>'
    )

    // Insufficient funds to go purchase stock from a long position
    reset_status();
    currentCash = 0;
    buyAmount(1000);
    display = document.getElementById("economicStatus").outerHTML;
    console.log(
        "buyAmount",
        display == '<div id="economicStatus" style="text-align: center">Transaction declined! Lack of funds.</div>'
    )

    // Insufficient funds to go long from a short
    reset_status();
    holdings = -5;
    currentCash = 0;
    buyAmount(100000);
    display = document.getElementById("economicStatus").outerHTML;
    console.log(
        "buyAmount",
        display == '<div id="economicStatus" style="text-align: center">Transaction declined! Lack of funds.</div>'
    )

    // Able to purchase, only buy holdings
    reset_status();
    holdings = 0;
    currentCash = 100000;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    buyAmount(1000);
    console.log(
        "buyAmount",
        currentCash == 99000 && holdings == 999
    )

    // Able to purchase, only close shorts
    reset_status();
    holdings = -11;
    currentCash = 0;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    buyAmount(10);
    console.log(
        "buyAmount",
        holdings == 1 && currentCash == 9.99
    )

    // Able to purchase, with closing shorts and cash
    reset_status();
    holdings = -10;
    currentCash = 100;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    buyAmount(20);
    console.log(
        "buyAmount",
        holdings == 9.99 && currentCash == 99.99
    )
}

// Test sellSlider
function test_sellSlider() {
    // Reset game
    reset_status();

    sellSlider();
}

// Test sellAmount
function test_sellAmount() {
    // Reset game
    reset_status();

    // Bankrupt user
    netWorth = 0;
    sellAmount(1000);
    display = document.getElementById("economicStatus").outerHTML;
    console.log(
        "sellAmount",
        display == '<div id="economicStatus" style="text-align: center">You are bankrupt!</div>'
    )

    // Insufficient funds to short from a long position
    reset_status();
    holdings = 1;
    currentCash = 0;
    dps.push({
        x: time,
        y: 1,
        markerType: "none",
    });
    sellAmount(1000);
    display = document.getElementById("economicStatus").outerHTML;
    console.log(
        "sellAmount",
        display == '<div id="economicStatus" style="text-align: center">Transaction declined! Lack of funds.</div>'
    )

    // Insufficient funds to short from a currently short position


    // Only requires selling holdings

    // Requires selling holdings and using cash

}
