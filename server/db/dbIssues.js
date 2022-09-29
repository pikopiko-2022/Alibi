const connection = require('./connection')

//get issue
function getIssues(db = connection) {
  return db('issues').select()
}

module.exports = { getIssues }
