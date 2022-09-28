const connection = require('./connection')

function getFlatmates(flat_id, db = connection) {
  return db('users').where('flat_id', flat_id).select()
}

module.exports = { getFlatmates }
