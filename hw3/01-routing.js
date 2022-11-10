const http = require('http')

const port = process.env.PORT || 5001

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
    const cacheDuration = 86400

    const routes = [
        'welcome',
        'redirect',
        'redirected',
        'cache',
        'cookie',
        'check-cookies',
        'other',
    ]

    const getRoutes = () => {
        let result = ''

        routes.forEach((elem) => {
            result += `<li><a href="/${elem}">${elem}</a></li>`
        })

        return result
    }

    if (req.method === 'GET' && req.url === '/') {
        const routeResults = getRoutes()

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(`<h1>Exercise 01</h1>`)
        res.write(`<ul> ${routeResults} </ul>`)
        res.end()
    }

    // handle /welcome
    else if (req.method === 'GET' && req.url === '/welcome') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h1>Welcome to my page!</h1>')
        res.end()
    }

    // handle /redirect
    else if (req.method === 'GET' && req.url === '/redirect') {
        res.writeHead(302, { Location: '/redirected' })
        res.end()
    }

    // handle /redirected
    else if (req.method === 'GET' && req.url === '/redirected') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h1>You have been redirected!</h1>')
        res.end()
    }

    // handle /cache
    else if (req.method === 'GET' && req.url === '/cache') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Cache-Control': `max-age=${cacheDuration}`,
        })
        res.write('<h1>This resource was cached</h1>')
        res.end()
    }

    // handle /cookie
    else if (req.method === 'GET' && req.url === '/cookie') {
        // req.statusCode(200)
        // res.setHeader('Content-Type', 'text/plain')
        // res.setHeader('Set-Cookie', ['hello=world'])
        res.setHeader('Set-Cookie', ['hello=world'])
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.write('cookies... yummm')
        res.end()
    }

    // handle /check-cookies
    else if (req.method === 'GET' && req.url === '/check-cookies') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        if (req.headers.cookie?.includes('hello')) {
            res.write('yes')
        } else {
            res.write('no')
        }
        res.end()
    }

    // handle 404
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write('<h1>404 - page not found</h1>')
        res.end()
    }
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
