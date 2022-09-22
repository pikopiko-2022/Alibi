const connection = require('./connection')

function getQuestion(id, db = connection) {
  return db('questions').select().where('id', id)
}

module.exports = { getQuestion }
