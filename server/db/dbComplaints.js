const connection = require('./connection')

function getCurrentComplaints(db = connection) {
  return db('complaints').select().where('culprit_id', null)
}

module.exports = { getCurrentComplaints }
