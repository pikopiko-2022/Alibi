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
    .where('messages.recipient_id', '=', userId)
}

function addMessage(message, db = connection) {
  return db('messages').returning(message).insert(message)
}

module.exports = { getMessages, addMessage }
