'use strict'

const http = require('http')

const contacts = require('./contacts')

const PORT = 3000
const HOST = 'localhost'

const init = async () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json')

    const { url, method } = request

    // GET /contacts
    if (url === '/contacts' && method === 'GET') {
      return response.end(JSON.stringify(contacts))
    }

    // POST /contacts
    else if (url === '/contacts' && method === 'POST') {
      let body = ''

      request.on('data', (chunk) => {
        body += chunk.toString()
      })

      request.on('end', () => {
        const { name, email, phone  } = JSON.parse(body)
        const id = contacts[contacts.length - 1].id + 1
        contacts.push({ id, name, email, phone })

        response.statusCode = 201
        return response.end(JSON.stringify({ message: 'Contact added successfully' }))
      })
    }

    // DELETE /contacts/{id}
    else if (url.startsWith('/contacts/') && method === 'DELETE') {
      const id = request.url.split('/')[2]
      const user = contacts.find(user => user.id === parseInt(id))

      if (user) {
        const index = contacts.indexOf(user)
        contacts.splice(index, 1)

        response.statusCode = 200
        return response.end(JSON.stringify({ message: 'Contact deleted successfully' }))
      }

      response.statusCode = 404
      return response.end(JSON.stringify({ message: 'Contact not found' }))
    }

    // default handler
    else {
      response.statusCode = 404
      return response.end(JSON.stringify({ message: 'URL not found' }))
    }
  })

  server.listen(PORT, HOST, () => {
    console.log('Server running on http://%s:%s', HOST, PORT)
  })
}

init()
