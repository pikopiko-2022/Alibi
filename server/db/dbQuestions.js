const connection = require('./connection')

function getQuestions(db = connection) {
  return db('questions').select()
}

function getQuestion(id, db = connection) {
  return db('questions').select().where('id', id).first()
}

function getQuestionsForIssue(issueId, db = connection) {
  return db('questions').select().where('issue_id', issueId)
}

module.exports = { getQuestion, getQuestions, getQuestionsForIssue }
