'use strict'

const Hapi = require('@hapi/hapi')

const { getAllContact, getContact, addContact, deleteContact } = require('./contacts')

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: HOST
  })

  server.route([
    {
      method: 'GET',
      path: '/contacts',
      handler: (request, handler) => {
        return getAllContact()
      }
    },
    {
      method: 'GET',
      path: '/contacts/{id}',
      handler: (request, handler) => {
        const { id } = request.params
        let response = {}
        response = getContact(id)
        if (response === null) {
          response = handler.response({ message: 'Contact not found' })
          response.code(404)
        }
        return response
      }
    },
    {
      method: 'POST',
      path: '/contacts',
      handler: (request, handler) => {
        const { name, email, phone } = request.payload
        addContact({
          name,
          email,
          phone
        })
        const response = handler.response({ message: 'Contact added successfully' })
        response.code(201)
        return response
      }
    },
    {
      method: 'DELETE',
      path: '/contacts/{id}',
      handler: (request, handler) => {
        const { id } = request.params
        deleteContact(id)
        return { message: 'Contact deleted successfully' }
      }
    }
  ])

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
