const connection = require('./connection')

function getQuestions(db = connection) {
  return db('questions').select()
}

module.exports = { getQuestions }
