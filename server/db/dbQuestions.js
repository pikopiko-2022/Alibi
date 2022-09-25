const connection = require('./connection')

function getQuestions(db = connection) {
  return db('questions').select()
}

function getQuestion(id, db = connection) {
  return db('questions').select().where('issue_id', id)
}

module.exports = { getQuestions, getQuestion }
