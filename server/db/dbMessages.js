const connection = require('./connection')

function getMessages(userId, db = connection) {
  return db('messages')
    .select()
    .where('recipient_id', userId)
    .orderBy('id', 'desc')
}

function addMessage(message, db = connection) {
  return db('messages').returning(message).insert(message)
}

function updateMessage(messageId, update, db = connection) {
  return db('messages').where('id', messageId).update(update)
}

module.exports = { getMessages, addMessage, updateMessage }
