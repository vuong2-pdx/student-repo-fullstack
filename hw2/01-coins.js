/** Exercise 01 - Coins * */

const QUARTER = 25
const DIME = 10
const NICKEL = 5

const calculateChange = (input) => {
    if (input >= 10.0) return 'Error: the number is too large'
    if (input < 0.0) return 'Error: the number is too small'

    const dollars = Math.floor(input)
    return dollars
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
