const connection = require('./connection')

function getMessages(userId, db = connection) {
  return db('messages')
    .leftJoin('questions', 'messages.question_id', '=', 'questions.id')
    .leftJoin(
      'life_guidance',
      'messages.life_guidance_id',
      '=',
      'life_guidance.id'
    )
    .select(
      'messages.*',
      'questions.question',
      'life_guidance.message as lifeGuidanceMessage',
      'life_guidance.url as lifeGuidanceUrl'
    )
    .where({ 'messages.recipient_id': userId, 'messages.answer_id': null })
    .orderBy('messages.id', 'desc')
}

function addMessage(message, db = connection) {
  return db('messages').returning(message).insert(message)
}

function updateMessage(messageId, update, db = connection) {
  return db('messages').where('id', messageId).update(update)
}

module.exports = { getMessages, addMessage, updateMessage }
