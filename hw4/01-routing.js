const express = require('express')

const app = express()
const port = process.env.PORT || 5001

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const cacheDuration = 86400

const routes = ['welcome', 'redirect', 'redirected', 'cache', 'cookie', 'other']

const getRoutes = () => {
    let result = ''

    routes.forEach((elem) => {
        result += `<li><a href="/${elem}">${elem}</a></li>`
    })

    return result
}

app.get('/', (req, res) => {
    const routeResults = getRoutes()

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(`<h1>Exercise 04</h1>`)
    res.write(`<ul> ${routeResults} </ul>`)
    res.end()
})

app.get('/welcome', (req, res) => {
    res.status(200).set({ 'Content-Type': 'text/html' }).send('<h1>Welcome to my page!</h1>')
})

app.get('/redirect', (req, res) => {
    res.redirect(302, '/redirected')
})

app.get('/redirected', (req, res) => {
    res.status(200).set({ 'Content-Type': 'text/html' }).send('<h1>You have been redirected!</h1>')
})

app.get('/cache', (req, res) => {
    res.status(200)
        .set({
            'Content-Type': 'text/html',
            'Cache-Control': `max-age=${cacheDuration}`,
        })
        .send('<h1>This resource was cached</h1>')
})

app.get('/cookie', (req, res) => {
    res.status(200)
        .set({ 'Content-Type': 'text/plain' })
        .cookie('hello', 'world')
        .send('cookies… yummm')
})

app.get('/cookie', (req, res) => {
    res.status(200)
        .set({ 'Content-Type': 'text/plain' })
        .cookie('hello', 'world')
        .send('cookies… yummm')
})

app.use((req, res) => {
    res.status(404).set({ 'Content-Type': 'text/html' }).send('<h1>404 - page not found</h1>')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
