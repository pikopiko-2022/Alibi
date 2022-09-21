const connection = require('./connection')

//get issue
function getIssues(db = connection) {
  return db('issues').select()
}

//get question
function getQuestions(id, db = connection) {
  return db('questions')
    .join('issues', 'questions.issues_id', 'issues.id')
    .select('questions.id as questionsId', 'issues.id as issuesId', 'question')
    .where('issuesId', id)
}

module.exports = { getIssues, getQuestions }
