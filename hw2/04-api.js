/** Exercise 04 - API * */

const url = 'https://restcountries.com/v2/all'
const results = document.querySelector('#results')

const getData = (myUrl) => {
    fetch(myUrl)
        .then((response) => {
            return response.json()
        })
        .then((countries) => {
            countries.forEach((country) => {
                const countryItem = document.createElement('li')

                countryItem.innerText = `${country.name} - ${country.population.toLocaleString()}`
                results.append(countryItem)
            })
        })
        .catch((error) => console.error(error))
}

getData(url)
