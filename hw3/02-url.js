const http = require('http')

const port = process.env.PORT || 5001

const server = http.createServer((req, res) => {
    const routes = [
        '/attributes?hello=world&lorem=ipsum',
        '/items?first=1&second=2&third=3&fourth=4',
        '/characters?spongebob=squarepants&patrick=star&sandy=cheeks',
    ]

    // use the URL interface to work with URLs
    // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
    const url = new URL(req.url, `http://${req.headers.host}`)

    const getRoutes = () => {
        let result = ''

        routes.forEach((elem) => {
            result += `<li><a href="${elem}">${elem}</a></li>`
        })

        return result
    }

    if (req.method === 'GET' && req.url === '/') {
        const routeResults = getRoutes()

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(`<h1>Exercise 02</h1>`)

        res.write(`<ul> ${routeResults} </ul>`)
    } else if (req.method === 'GET' && req.url?.includes('?')) {
        const params = url.searchParams

        res.writeHead(200, { 'Content-Type': 'text/html' })

        let htmlOutput = '<table border=2>'

        params.forEach((value, key) => {
            htmlOutput = `${htmlOutput}<tr>`
            htmlOutput = `${htmlOutput}<td> ${key} </td>`
            htmlOutput = `${htmlOutput}<td> ${value} </td>`
            htmlOutput = `${htmlOutput}</tr>`
        })

        htmlOutput += '</table>'

        res.write(htmlOutput)
    }

    // handle 404
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write('<h1>404 - page not found</h1>')
    }

    res.end()
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
