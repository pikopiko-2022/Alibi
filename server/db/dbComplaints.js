const connection = require('./connection')

function addComplaint(complaint, db = connection) {
  return db('complaints').insert(complaint)
}

function getCurrentComplaints(userId, db = connection) {
  return db('complaints')
    .select()
    .where({ culprit_id: null })
    .whereNot({ complaint_raised_by: userId })
}

function getComplaintsForUser(userId, db = connection) {
  return db('complaints').select().where({ culprit_id: userId })
}

function getAllComplaints(db = connection) {
  return db('complaints').select()
}

function getHighestComplainant(db = connection) {
  return db('complaints')
    .select('*')
    .from('users')
    .count('complaints.complaint_raised_by AS count')
    .join('complaints', 'users.id', 'complaints.complaint_raised_by')
    .groupBy('complaints.complaint_raised_by')
    .orderBy('count', 'desc')
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
  getHighestComplainant,
  getComplaintsForUser,
}
