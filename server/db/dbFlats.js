const connection = require('./connection')

function getFlats(db = connection) {
  return db('flats').select()
}

module.exports = { getFlats }
