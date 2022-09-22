const connection = require('./connection')

function getResponses(db = connection) {
  return db('responses').select()
}

module.exports = { getResponses }
