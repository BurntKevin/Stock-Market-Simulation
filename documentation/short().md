# Long #
## Pseudo Code ##
if long:
    convertHoldingsValueToCash()
    convertCashToShort()

## Example ##
1. Initial State
cash holdings netWorth commission
100  200      300      0.999
Total shorted = 0

2. convertHoldingsValueToCash()
cash                              holdings            netWorth
cash + holdingsValue * commission holdings - holdings
100 + 200 * 0.999                 200 - 200
299.8                             0                   299.8
Total shorted = 0 + 200 = 200

3. convertCashToShort()
Calculating convertCashToShort formula
Desired Outcome: netWorth = shorted
Previous Step  : cash - short * (1 - commission) = short
                       short(1 + 1 - commission) = cash
                                           short = cash / (1 + 1 - commission)
                                                 = cash / (2 - commission)

Calculating short
short = 299.8 / (1 + 1 - 0.999) = 299.5004995

cash                      holdings     netWorth
cash + short * commission short        299.5004995
299.8 + 299.5 * 0.999     0 - 299.5
$599.000999               -299.5004995
Total shorted = 200 + 299.5004995 = 499.5004995
              = holdings() + (cash() + holdings() * commission()) / (2 - commission)

# Short #
## Pseudo Code ##
if short:
    convertCashToShort()

## Example ##
1. Initial State
cash holdings netWorth commission
500  -200      300      0.999
Total shorted = 0

2. convertCashToShort()
Calculating convertCashToShort formula
Desired Outcome: netWorth = shorted
Previous Step  : cash - holdingsValue - short * (1 - commission) = holdingsValue + short
                                       short(1 + 1 - commission) = cash - 2 * HoldingsValue
                                                           short = (cash - 2 * HoldingsValue) / (1 + 1 - commission)
                                                                 = (cash - 2 * HoldingsValue) / (2 - commission)

short = (500 - 2 * 200) / (2 - 0.999)
      = 99.9000999

cash                      holdings           netWorth
cash + short * commission holdings + short   299.9000999  
500 + 99.9000999 * 0.999  -200 - 99.9000999
599.8001998               -299.9000999
Total shorted = 99.9000999

# Neutral #
## Pseudo Code ##
if noHoldings:
    convertCashToShort()

1. Initial State
cash holdings netWorth commission
500  0        500      0.999
Total shorted = 0

2. convertCashToShort()
Calculating convertCashToShort formula
Desired Outcome: netWorth = shorted
Previous Step  : cash - short * (1 - commission) = short
                      short (1 + 1 - commission) = cash
                                           short = cash / (2 - commission)

short = 500 / (2 - 0.999) = 499.5004995

cash                      holdings           netWorth
cash + short * commission short              499.5004995
500 + 499.5004995 * 0.999 -499.5004995
999.000999
Total shorted = 499.5004995
