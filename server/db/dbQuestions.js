const connection = require('./connection')

function getQuestions(db = connection) {
  return db('questions').select()
}

function getQuestion(id, db = connection) {
  return db('questions').select().where('id', id).first()
}

module.exports = { getQuestions, getQuestion }
