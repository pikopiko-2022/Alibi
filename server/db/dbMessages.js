const connection = require('./connection')

function getMessages(userId, db = connection) {
  return db('messages').select().where({ recipient_id: userId })
}

function addMessage(message, db = connection) {
  return db('messages').returning(message).insert(message)
}

module.exports = { getMessages, addMessage }
