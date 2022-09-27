const connection = require('./connection')

function getMessages(userId, db = connection) {
  return db('messages')
    .select()
    .where({ recipient_id: userId })
    .orWhere({ recipient_id: null })
    .orWhere({ sender_id: userId })
    .orderBy('id', 'asc')
}

function getMessagesByName(userName, userId, db = connection) {
  return db('messages')
    .select()
    .whereLike('message', `%${userName}%`)
    .andWhereNot('recipient_id', userId)
    .andWhereNot('sender_id', userId)
    .orderBy('id', 'asc')
}

function addMessage(message, db = connection) {
  return db('messages').insert(message)
}

function updateMessage(messageId, update, db = connection) {
  return db('messages').where('id', messageId).update(update)
}

function getAlibiMessages(answers, db = connection) {
  return db('messages').whereIn(
    'answer_id',
    answers.map((answer) => answer.id)
  )
}

module.exports = {
  getMessages,
  addMessage,
  updateMessage,
  getAlibiMessages,
  getMessagesByName,
}
