// Generate random number - product of 52 numbers is approximately 1.1
function randomNumber() {
    // Number generator which influences growth potential
    number = 1 + (Math.random() - 0.4) / 16.6;

    // Adds variability into the growth rate so that it is not a clean line
    for (var i = 0; i < 40; i++) {
        if (Math.random() > 0.99) {
            number = number * 0.99;
        }
    }
    return number;
}
