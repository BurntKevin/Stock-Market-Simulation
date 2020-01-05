// Runs all tests
function tests() {
    // Test Support (Functions used for tests)
    reset_status();

    // Test Reusable Functions
    test_randomNumber();

    // Chart Functions
    test_runOrStopChart();
    test_runChart();
    test_stopChart();
    test_addBuyOrSellMarker();
    test_addBankruptMarker();

    // User Interface Functions
    test_updateCurrentCash();
    test_updateHoldings();
    test_updateNetWorth();
    test_updateBuySlider();
    test_updateSellSlider();
    test_shortMarginAdjust();
    
    // Resetting Game
    reset_status();
}
