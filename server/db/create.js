const connection = require('./connection')

//get issue
function getIssues(db = connection) {
  return db('issues').select()
}

//post question to database
function addComplaint(complaint, db = connection) {
  return db('complaints').insert(complaint)
}

//get question
// function getQuestions(id, db = connection) {
//   return db('questions')
//     .join('issues', 'questions.issue_id', 'issues.id')
//     .select(
//       'questions.id as questionsId',
//       'questions.issue_id as issueId',
//       'question'
//     )
//     .where('issueId', id)
// }

module.exports = { getIssues, addComplaint }
