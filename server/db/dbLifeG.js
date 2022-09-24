const connection = require('./connection')

function getLifeG(db = connection) {
  return db('life_guidance').select()
}

function getLifeGforIssue(issue_id, db = connection) {
  return db('life_guidance').select().where('issue_id', issue_id)
}

module.exports = { getLifeG, getLifeGforIssue }
