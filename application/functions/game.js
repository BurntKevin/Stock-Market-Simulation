// Chart starts off with 104 data points starting at a price of 100
// Starting chart at 100
addNextPrice(100, "black", "none");
// Adding 103 randomly generated data points
updateChart(103);

// Adjusting Speed Slider
document.getElementById("speedSlider").step = 1;
document.getElementById("speedSlider").min = 0;
document.getElementById("speedSlider").max = 2500;
document.getElementById("speedSlider").value = 500;
document.getElementById("speedDisplay").innerHTML = "500ms"

// Adjusting Commission Slider
document.getElementById("commissionSlider").step = 0.01;
document.getElementById("commissionSlider").min = 0;
document.getElementById("commissionSlider").max = 1;
document.getElementById("commissionSlider").value = 0.10;
document.getElementById("commissionDisplay").innerHTML = "0.10%"

// Financial Status
updateDisplayedCash();
updateDisplayedHoldings();
updateDisplayedNetWorth();

// Buy Slider
document.getElementById("buyAmountSlider").step = 0.01;
document.getElementById("buyAmountSlider").min = 0.01;
document.getElementById("buyAmountSlider").max = 1000000;
document.getElementById("buyAmountSlider").value = 10000;
document.getElementById("buyAmountDisplay").innerHTML = "$10000 1%"

// Sell Slider
document.getElementById("sellAmountSlider").step = 0.01;
document.getElementById("sellAmountSlider").min = 0.01;
document.getElementById("sellAmountSlider").max = 1000000;
document.getElementById("sellAmountSlider").value = 10000;
document.getElementById("sellAmountDisplay").innerHTML = "$10000 1%"
