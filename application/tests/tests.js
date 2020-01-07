// Runs all tests
function tests() {
    // Test Settings
    test_initialiseFinancialStatus();
    test_initialiseChartStatus();
    test_initialiseDisplayedInformation();

    // Test Reusable Functions
    test_randomNumber();
    test_cash();
    test_updateCash();
    test_addCash();
    test_holdings();
    test_updateHoldings();
    test_addHoldings();
    test_holdingsValue();
    test_commission();
    test_buy();
    test_sell();
    test_currentTime();
    test_currentPrice();
    test_netWorth();
    test_amountBoughtAtPoint();
    test_updateAmountBoughtAtPoint();
    test_addAmountBoughtAtPoint();
    test_speed();
    test_running();
    test_updateRunning();
    test_short();
    test_notifyUser();
    test_currentMarkerColor();
    test_currentMarkerType();

    // Chart Functions
    test_runOrStopChart();
    test_runChart();
    test_stopChart();
    test_addNormalPrice();
    test_addCompanyBankruptPrice();
    test_addNextPrice();
    test_updateCurrentPriceStyle();
    test_delistStock();
    test_bankruptUser();
    test_addBuyOrSellMarker();

    // User Interface Functions
    test_updateChart();
    test_updateBuySlider();
    test_updateSellSlider();
    test_updateDisplayedCash();
    test_updateDisplayedHoldings();
    test_updateDisplayedNetWorth();

    // Stock Functions
    test_buyAmount();
    test_sellAmount();
    test_nextPrice();

    // Testing time based function
    test_removeEconomicStatus();

    // Resetting Game - 6 second delay due to removeEconomicStatus
    setTimeout(function() {
        initialiseUserInterface()
    }, 6000);
}
