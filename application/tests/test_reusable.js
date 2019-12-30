// Test the random number generator
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
    console.log(0.09 < compound && compound < 0.11);
}
