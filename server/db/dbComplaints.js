const connection = require('./connection')

function addComplaint(complaint, db = connection) {
  return db('complaints').insert(complaint)
}

function getCurrentComplaints(userId, db = connection) {
  return db('complaints')
    .select()
    .where({ culprit_id: null, complaint_raised_by: userId })
}

function updateCulpritDb(id, updatedComplaint, db = connection) {
  return db('complaints').where('id', id).update(updatedComplaint)
}

module.exports = { addComplaint, updateCulpritDb, getCurrentComplaints }
