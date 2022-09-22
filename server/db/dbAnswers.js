const connection = require('./connection')

function getAnswers(question_id, db = connection) {
  return db('answers').select().where('question_id', question_id)
}

module.exports = { getAnswers }

//get questions - all questions
//get answers - all answers
//route get(quetions.id.params), get question at id, get answers at question_id
