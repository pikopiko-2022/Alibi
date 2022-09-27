const connection = require('./connection')

function addComplaint(complaint, db = connection) {
  return db('complaints').insert(complaint)
}

function getCurrentComplaints(userId, db = connection) {
  return db('complaints').select().where({ culprit_id: null })
  // .whereNot({ complaint_raised_by: userId })
}

function getAllComplaints(db = connection) {
  return db('complaints').select()
}

function updateCulpritDb(complaintId, userId, db = connection) {
  return db('complaints')
    .where('id', Number(complaintId))
    .update({ culprit_id: userId })
}

module.exports = {
  addComplaint,
  updateCulpritDb,
  getCurrentComplaints,
  getAllComplaints,
}
