const connection = require('./connection')

function getAllAnswers(db = connection) {
  return db('answers').select()
}

function getAnswers(id, db = connection) {
  return db('answers').select().where('question_id', id)
}

module.exports = { getAnswers, getAllAnswers }
