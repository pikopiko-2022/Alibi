const connection = require('./connection')

function updateCulpritDb(id, updatedComplaint, db = connection) {
  return db('complaints').where('id', id).update(updatedComplaint)
}

module.exports = { updateCulpritDb }
