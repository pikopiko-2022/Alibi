const connection = require('./connection')

function getAllAnswers(db = connection) {
  return db('answers').select()
}

function getAnswers(id, db = connection) {
  return db('answers').select().where('question_id', id)
}

function getAnswersForQuestions(questions, db = connection) {
  const ids = questions.map((question) => question.question_id)
  return db('answers').select().whereIn('question_id', ids)
}

module.exports = { getAnswers, getAllAnswers, getAnswersForQuestions }

//get questions - all questions
//get answers - all answers
//route get(quetions.id.params), get question at id, get answers at question_id
