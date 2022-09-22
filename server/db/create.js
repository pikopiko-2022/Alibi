const connection = require('./connection')

//get issue
function getIssues(db = connection) {
  return db('issues').select()
}

//get question
function getQuestions(id, db = connection) {
  return db('questions')
    .join('issues', 'questions.issue_id', 'issues.id')
    .select(
      'questions.id as questionsId',
      'questions.issue_id as issueId',
      'question'
    )
    .where('issueId', id)
}

module.exports = { getIssues, getQuestions }
