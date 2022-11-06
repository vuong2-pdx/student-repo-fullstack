const http = require('http')
const static = require('node-static')
const querystring = require('querystring')

const port = process.env.PORT || 5001

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const fileServer = new static.Server('./public')

const server = http.createServer((req, res) => {
    // display form
    if (req.method === 'GET' && req.url === '/form') {
        fileServer.serveFile('form.html', 200, {}, req, res)
    }

    // submit form
    else if (req.method === 'POST' && req.url === '/submit') {
        let body = ''

        req.on('error', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                res.write('<h1>An error occurred</h1>')
                res.end()
            }
        })

        req.on('data', (chunk) => {
            body += chunk
        })

        req.on('end', () => {
            body = querystring.parse(body)

            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.write(`Name: ${body.fullname}<br>`)
            res.write(`Email: ${body.email}<br>`)

            res.write(
                body.message.length === 0 ? `Comments: n/a<br>` : `Comments: ${body.message}<br>`
            )

            res.write(
                body.newsletter === undefined
                    ? 'Newsletter: No, thank you.<br>'
                    : 'Newsletter: Yes, I would like to join the newsletter.<br>'
            )

            res.end()
        })
    }

    // 404 message
    else {
        fileServer.serveFile('error.html', 404, {}, req, res)
    }
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
