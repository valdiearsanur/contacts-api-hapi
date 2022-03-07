'use strict'

const http = require('http')

const PORT = 3000
const HOST = 'localhost'

const init = async () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json')

    const { url, method } = request

    // GET /contacts
    if (url === '/contacts' && method === 'GET') {
      let contacts = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890'
        }
      ]
      return response.end(JSON.stringify(contacts))
    }

    // default handler
    response.statusCode = 404
    return response.end(JSON.stringify({ message: 'URL not found' }))
  })

  server.listen(PORT, HOST, () => {
    console.log('Server running on http://%s:%s', HOST, PORT)
  })
}

init()
