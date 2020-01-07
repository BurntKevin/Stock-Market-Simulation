# Motivation #
To create an interactive game for users to easily try out the stock market in a pseudo accurate simulation where the stock should almost always go up overtime.

# Product Produced #
* Settings at the top: run/stop, speed adjuster, commission adjuster
* Financial status below settings: cash, holding quantity, holding value, net worth
* Financial actions below financial status: long or short the stock
* Chart displaying information about the stock (price, time, spline graph)

# Designs #
## Functionality ##
### Markets ###
* The user always buys the stock at the same given time at say 12pm.
* The markets are open everyday of the year which is slightly unrealistic but it is a good choice as it is better to have the chart information dense than to have the same price over multiple days.
* A year is assumed to be 52 weeks.

### Run and Stop Button ###
* Allows the user to think about a decision before they purchase the stock.

### Speed Adjuster ###
* Adjusting speeds allows users to be able to be better tailored as some may simply want to see the stock from an extremely long-term stance while others may want to see the stock movements more accurately.

### Commission Adjustor ###
* Commission varies across platforms, assets type and more so we are giving users the option to change their given commission.
* Commission slider goes from 0% to 1%. This is done as anything above 1% is highly abnormal. Allowing the slider to go further decreases the ease of use to get a specific commission number so we are not going all the way to 100% commission.
* There is no minimum commission amount for simplicity.

### Current Financial Status ###
* Financial status should include current cash, holding quantity, holding quantity and current net worth.
* Cash so that the user knows how much more they can buy.
* Holding quantity and value so that they can see how much of the stock they own for selling and to see their relative profits/losses when the stock price moves.
* Net worth so that the user knows when they are close to bankruptcy so that they can adjust their position sizes.
* The user starts with $1,000,000 to invest as that seems like a big fun number for the user.
* Money is not truncated to two decimal places but rather floats.
* The game will end if the player or company goes bankrupt.
* Also displays issues of the account with the user such as running out of cash.

### Buy and Sell ###
* We could have called it long and short but it seems too be too much jargon for the typical person.
* Allows the user to long and short the stock.
* Long: Close out shorts (returns margin to cash), long stock if required with cash.
* Short: Close out longs, short stock if required, maximum short is netWorth = short.
* Commission is built into the total transaction amount to provide simplicity.

### Chart ###
* The chart starts at $100 and then generates 104 points so that enough information is given to the user the moment the stock loads. Too few and it looks ugly but too many and it has potential load time issues with slower computers and is unnecessary. 104 sounded like a good number as it shows 2 years worth of history.
* The unit of time is one week. One day will require too many points to produce noticeable action and any longer will be too much action.

## User Interface ##
### Speed, Commission, Buy and Sell Slider ###
* Potentially less accurate.
* More interactive with the user as it is more visual.
* Simpler interface as the game is entire mouse-only.

### Position of Information ###
* Rarely used sliders such as Run and Stop, Speed Adjuster, Commission Adjustor are placed on top as they should not be frequently used but rather only on the initial setting up stage.
* Financial status (cash, holdings, net worth) is in the middle as it is necessary to look at but is not as frequently used as buy and sell buttons.
* Buy and sell buttons are placed closest to the chart as they are what the user will be mostly interacting with.
* A temporary account issue will display temporarily for 5 seconds if there is an issue with the account.
* Chart is placed on the bottom as it makes the most intuiative sense due to the general standard being that the main content is below information such as headers.

### Chart ###
* The chart framework chosen is CanvasJS and this choice was mostly due to luck as it was one of the first searches on Google where it seemed to fit the the purpose of the investing simulation but it is more than likely a poor choice as there are alternatives which offer what I need without the watermark. However, as the realisation was after I almost finished the project, it was deemed not a worthy cause to refactor the code.
* Shows price on the left side.
* Shows days since first trade on the bottom.
* Line chart to show the current stock price.
* On hover, shows date along with the price of the day.
* As this is a simulation, we are not going to have a range of prices such as opening price, highest price, lowest price, closing price. We are only going to display the price at say 12pm. The additional information is relatively unnecessary as the user is unable to trade intraday.
* A spline graph was chosen as it looks nicer to have it more curved and it is also more realistic as it shows variations in the price as if there was intraday action rather than having sharp edges.
* The style used is default as it already looks nice and I personally like the colour blue in my projects.
* Charts will have a green triangle to indicate a net buy, red triangle for a net sell and a brown triangle if net zero.
