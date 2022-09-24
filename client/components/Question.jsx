import React from 'react'
import styles from './Question.module.scss'
// import { fetchQuestions } from '../actions/questions'
// import { fetchAnswers } from '../actions/answers'

// get all answers where answers.question_id is equal to question.id
// display the question (text)
// below it map the answers as <div>
// when an answer is clicked it should send the message to a function that handles the game logic

// <Question question={question} />

const Question = ({ question }) => {
<<<<<<< HEAD
  return
  ;<div> {answer}</div>
=======
  return <div>{answer}</div> //div for Q, div for answers. drop-down
>>>>>>> e7983ef0755e2f10fa25a6748505dff17530969e
}

export default Question

{
  id, issue_id, question
}

getAnswersForQuestion(question.id) // apis/
// get request to some route that will find all answers that match the question.id
// db.getAnswersForQuestion(question.id)
// db/
