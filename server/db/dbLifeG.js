const connection = require('./connection')

function getLifeG(db = connection) {
  return db('life_guidance').select()
}

function getLifeGforIssue(issueId, db = connection) {
  return db('life_guidance').select().where('issue_id', issueId)
}

module.exports = { getLifeG, getLifeGforIssue }
