const connection = require('./connection')

function getFlat(id = 1, db = connection) {
  return db('flats').select().where({ id }).first()
}

module.exports = { getFlat }
