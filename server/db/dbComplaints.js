const connection = require('./connection')

function addComplaint(complaint, db = connection) {
  return db('complaints').insert(complaint)
}

function getCurrentComplaints(userId, db = connection) {
  return db('complaints')
    .select()
    .where({ culprit_id: null, complaint_raised_by: userId })
}

function updateCulpritDb(complaintId, userId, db = connection) {
  return db('complaints')
    .where('id', complaintId)
    .update({ culprit_id: userId })
}

module.exports = { addComplaint, updateCulpritDb, getCurrentComplaints }
