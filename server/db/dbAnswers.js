const connection = require('./connection')

function getAnswers(db = connection) {
  return db('answers').select()
}

module.exports = { getAnswers }
