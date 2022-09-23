const connection = require('./connection')

function getCurrentComplaints(userId, db = connection) {
  return db('complaints')
    .select()
    .where({ culprit_id: null, complaint_raised_by: userId })
}

module.exports = { getCurrentComplaints }
