// Test buyAmount
function test_buyAmount() {
    // Reset game
    initialiseUserInterface();

    // Insufficient funds to go purchase stock
    updateCash(0);
    buyAmount(1000);
    addNormalPrice(100);
    console.log(
        "buyAmount insufficient funds",
        document.getElementById("economicStatus").innerHTML == "Transaction declined! Lack of funds."
    );

    // Buy From Short
    initialiseUserInterface();
    updateCash(1000);
    updateHoldings(-5);
    addNormalPrice(100);
    buyAmount(100);
    console.log(
        "buyAmount buy from short",
        cash() == 900 &&
        holdings() == -4.0009999999999994
    );

    // Buy From Neutral
    initialiseUserInterface();
    updateCash(1000);
    updateHoldings(0);
    addNormalPrice(100);
    buyAmount(100);
    console.log(
        "buyAmount buy from neutral",
        cash() == 900 &&
        holdings() == 0.9990000000000001
    );   

    // Buy from Long
    initialiseUserInterface();
    updateCash(1000);
    updateHoldings(2);
    addNormalPrice(100);
    buyAmount(100);
    console.log(
        "buyAmount buy from long",
        cash() == 900 &&
        holdings() == 2.9990000000000001
    );  
}

// Test sellAmount
function test_sellAmount() {
    // Reset game
    initialiseUserInterface();

    // Insufficient funds to go short from long
    updateCash(0);
    updateHoldings(1);
    addNormalPrice(0.005);
    sellAmount(100);
    console.log(
        "sellAmount insufficient funds from long",
        document.getElementById("economicStatus").innerHTML == "Transaction declined! Lack of funds."
    );

    // Insufficient funds to go short from neutral
    updateCash(0);
    updateHoldings(0);
    addNormalPrice(100);
    sellAmount(100);
    console.log(
        "sellAmount insufficient funds from neutral",
        document.getElementById("economicStatus").innerHTML == "Transaction declined! Lack of funds."
    );

    // Overleveraged short
    updateCash(0);
    updateHoldings(-1);
    addNormalPrice(100);
    sellAmount(100);
    console.log(
        "sellAmount overleveraged",
        document.getElementById("economicStatus").innerHTML == "Transaction declined! Overleveraged short."
    );

    // Sell from short
    initialiseUserInterface();
    updateCash(2000);
    updateHoldings(-5);
    addNormalPrice(100);
    sellAmount(100);
    console.log(
        "sellAmount sell from short",
        cash() == 2099.9 &&
        holdings() == -6
    );

    // Sell from neutral
    initialiseUserInterface();
    updateCash(2000);
    updateHoldings(0);
    addNormalPrice(100);
    sellAmount(100);
    console.log(
        "sellAmount sell from neutral",
        cash() == 2099.9 &&
        holdings() == -1
    );

    // Sell from long
    initialiseUserInterface();
    updateCash(2000);
    updateHoldings(5);
    addNormalPrice(100);
    sellAmount(100);
    console.log(
        "sellAmount sell from short",
        cash() == 2099.9 &&
        holdings() == 4
    );
}

// Test nextPrice
function test_nextPrice() {
    // Resetting
    initialiseUserInterface();

    // Stock continues
    nextPrice();
    console.log(
        "nextPrice continue",
        document.getElementById("economicStatus").innerHTML == ""
    );

    // Delisted stock
    initialiseUserInterface();
    addNormalPrice(0.0005);
    nextPrice();
    console.log(
        "nextPrice delisted",
        document.getElementById("economicStatus").innerHTML == "The company has been delisted!"
    );

    // Bankrupt user
    initialiseUserInterface();
    updateCash(2000);
    updateHoldings(-10);
    addNormalPrice(1000);
    nextPrice();
    console.log(
        "nextPrice bankrupt",
        document.getElementById("economicStatus").innerHTML == "You are now bankrupt! Your assets have been forcefully taken."
    );
}
