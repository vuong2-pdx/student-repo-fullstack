const express = require('express');
const axios = require('axios');
const { query, response } = require('express');

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const allUrl = 'https://restcountries.com/v3.1/all';
const regionUrl = 'https://restcountries.com/v3.1/region'
app.get('/', (req, res) => {
  // render pug template for the index.html file

  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });
});

const sortCountries = (first, second) => {
  return first.name.common.localeCompare(second.name.common)
}

const formatCapital = (country) => {
  return (country.capital.length === 0
  ? `${country.name.common} - no data`
  : `${country.name.common} - ${country.capital}`
  )
}

app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array

  axios
  .get(`${allUrl}?fields=name;capital`)
  .then((response) => {
    res.render('page', {
      heading: 'Countries and Capitals',
      results: response.data.sort(sortCountries).map(formatCapital)
    })
  })
});

const filterPopulation = (country) => {
  return (country.population >= 50000000)
}
const sortPopulation = (first, second) => {
  return second.population - first.population
}

const formatPopulation = (country) => {
  return `${country.name.common} - ${country.population.toLocaleString()}`
}

app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population
  axios
  .get(`${allUrl}`)
  .then((response) => {
    res.render('page', {
      heading: 'Most Populous Countries',
      results: response.data.filter(filterPopulation).sort(sortPopulation).map(formatPopulation)
    })
  })
});

const formatRegion = (regionData, name) => {
  return `${name} - ${regionData.data.length}`
}

app.get('/regions', async (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  const regions = ['Asia', 'Europe', 'Africa', 'Oceania', 'Americas']
  let allRegions = []

  Promise.all(regions.map(async (region) => {
      const regionData = await axios.get(`${regionUrl}/${region}`)
      allRegions.push(formatRegion(regionData, region))
  }))
  .then(() => {
    res.render('page', {
      heading: 'Regions of the World',
      results: allRegions
    })
  })
  .catch((error) => {
    console.log(error)
  })
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
