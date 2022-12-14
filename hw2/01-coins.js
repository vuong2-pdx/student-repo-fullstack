/* eslint-disable no-console */
/** Exercise 01 - Coins * */

const calculateChange = (input) => {
    let result = `$${input} ==> `

    if (input > 10.0) {
        return result.concat('Error: the number is too large')
    }
    if (input < 0.0) {
        return result.concat('Error: the number is too small')
    }

    let total = input * 100
    const denom = [1, 5, 10, 25, 100]
    const denomText = ['penn', 'nickel', 'dime', 'quarter', 'dollar']
    let firstDenom = false

    while (total > 0) {
        const coin = denom.pop()
        let coinText = denomText.pop()

        const amount = Math.floor(total / coin)
        total -= amount * coin

        // we have a vaid amount for the current denomination
        if (amount > 0) {
            // plurals
            if (amount > 1) {
                if (coinText === 'penn') {
                    coinText = coinText.concat('ies') // pennies
                } else {
                    coinText = coinText.concat('s') // nickels, dimes, etc...
                }
            } else if (coinText === 'penn') {
                coinText = coinText.concat('y') // penny
            }
            result =
                firstDenom === true
                    ? result.concat(', ', amount, ' ', coinText)
                    : result.concat(amount, ' ', coinText)

            firstDenom = true
        }
    }

    return result
}

// Sample Test Cases
console.log(calculateChange(4.62))
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74))
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16))
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11))
// $15.11 ==> Error: the number is too large
console.log(calculateChange(0.99))
// $0.99 ==> 3 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.01))
// $0.01 ==> 1 penny
console.log(calculateChange(-5))
// $-5 ==> Error: the number is too small
