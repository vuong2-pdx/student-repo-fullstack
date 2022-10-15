/** Exercise 04 - API **/

const url = 'https://restcountries.com/v2/all'
const results = document.querySelector('#results')

const getData = (url) => {
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            data.next != null && getData(data.next)
            return data
        })
        .then((countries) => {
            countries.forEach((country) => {
                let countryItem = document.createElement('li')
                
                countryItem.innerText = `${country.name} - ${country.population.toLocaleString()}`
                countryItem.setAttribute('class', 'list-item');
                results.append(countryItem)
            })
        })
        .catch((error) => console.error(error))
}

getData(url);
