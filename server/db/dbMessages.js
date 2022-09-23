const connection = require('./connection')

function getMessages(userId, db = connection) {
  return db('messages').select().where({ recipient_id: userId })
}

module.exports = { getMessages }
