/** Exercise 02 - Reverse * */
const input = document.querySelector('#input')
const reverse = document.querySelector('#reverse')
const result = document.querySelector('#result')

const setError = (msg) => {
    result.style.color = '#B30000'
    result.textContent = `Error: ${msg}`
}

const setResult = (original, reversed) => {
    result.style.color = '#026600'
    result.textContent = `${original} --> ${reversed}`
}

const reverseNum = () => {
    if (Number.isNaN(input.value) || input.value === '') setError('Please input a valid number')
    else {
        const number = input.value
        if (number.length !== 8) {
            setError('Please input an 8-digit number')
        } else {
            const reversedNumber =
                parseFloat(number.split('').reverse().join('')) * Math.sign(number)
            setResult(number, reversedNumber)
        }
    }
}

reverse.addEventListener('click', reverseNum)
