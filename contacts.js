const { db } = require('./firestore')

async function getAllContact () {
  const querySnapshot = await db.collection('contact').get()
  const contacts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return contacts
}

async function getContact (id) {
  const contact = await db.collection('contact').doc(id).get()
    .then(doc => {
      if (doc.exists) {
        return { id: doc.id, ...doc.data() }
      } else {
        return null
      }
    })

  return contact
}

async function addContact (contact) {
  await db.collection('contact').add(contact)
  return contact
}

async function deleteContact (id) {
  await db.collection('contact').doc(id).delete()
  return id
}

module.exports.getAllContact = getAllContact
module.exports.getContact = getContact
module.exports.addContact = addContact
module.exports.deleteContact = deleteContact
