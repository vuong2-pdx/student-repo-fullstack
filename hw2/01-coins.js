/** Exercise 01 - Coins * */

const calculateChange = (input) => {
    let result = `$${input} ==> `

    if (input > 10.0 || input < 0.0){
      if (input > 10.0)
        result = result.concat('Error: the number is too large')
      if (input < 0.0) 
        result = result.concat('Error: the number is too small')
      return result
    }

    let total = input * 100
    let denom = [1, 5, 10, 25, 100]
    let denomText = ['penn', 'nickel', 'dime', 'quarter', 'dollar']
    let leading = false

    while (total > 0) {
      let coin = denom.pop()
      let coinText = denomText.pop()

      let amount = Math.floor(total / coin)
      total -= amount * coin

      if (amount > 0) { // we have a vaid amount for the current denomination
        if (amount > 1) { // plurals
          if (coinText === 'penn'){
            coinText = coinText.concat('ies') // pennies
          } else {
            coinText = coinText.concat('s') // nickels, dimes, etc...
          }
        } else {
          if (coinText === 'penn')
            coinText = coinText.concat('y') // penny
        }
        leading === false ? result = result.concat(amount, ' ', coinText) : result = result.concat(', ', amount, ' ', coinText)
        leading = true
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
// $15.11 ==> Error: the number is too large
console.log(calculateChange(-5))
// $15.11 ==> Error: the number is too large
