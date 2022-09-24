import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Question.module.scss'
import { updateUserScore } from '../actions/user'
import { updateMessageAnswer } from '../actions/messages'
// import { fetchQuestions } from '../actions/questions'
// import { fetchAnswers } from '../actions/answers'

// get all answers where answers.question_id is equal to question.id
// display the question (text)
// below it map the answers as <div>
// when an answer is clicked it should send the message to a function that handles the game logic

// <Question question={question} />

const Question = ({ question }) => {
  return <div>{answer}</div> //div for Q, div for answers. drop-downs
}

export default Question
