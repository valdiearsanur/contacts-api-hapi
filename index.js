'use strict'

const Hapi = require('@hapi/hapi')

const contacts = require('./contacts')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  server.route([
    {
      method: 'GET',
      path: '/contacts',
      handler: () => contacts
    },
    {
      method: 'GET',
      path: '/contacts/{id}',
      handler: (request, handler) => {
        const { id } = request.params
        const index = contacts.findIndex(contact => contact.id === Number(id))

        if (index === -1) {
          const response = handler.response({ message: 'Contact not found' })
          response.code(404)
          return response
        }

        const contact = contacts[index]

        return contact
      }
    },
    {
      method: 'POST',
      path: '/contacts',
      handler: (request, handler) => {
        const { name, email, phone } = request.payload
        const id = contacts[contacts.length - 1].id + 1

        contacts.push({
          id,
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
        const index = contacts.findIndex(contact => contact.id === Number(id))

        if (index === -1) {
          const response = handler.response({ message: 'Contact not found' })
          response.code(404)
          return response
        }

        contacts.splice(index, 1)

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
