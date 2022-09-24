const connection = require('./connection')

function getAnswers(messages, db = connection) {
  const questionIds = messages.map((message) => message.question_id)
  return db('answers').select().whereIn('question_id', questionIds)
}

module.exports = { getAnswers }
