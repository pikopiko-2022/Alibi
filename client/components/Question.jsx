import React, { useState } from 'react'
import styles from './Question.module.scss'
// import { fetchQuestions } from '../actions/questions'
// import { fetchAnswers } from '../actions/answers'

// get all answers where answers.question_id is equal to question.id
// display the question (text)
// below it map the answers as <div>
// when an answer is clicked it should send the message to a function that handles the game logic

// <Question question={question} />

const Question = ({ question }) => {
  console.log(question)
  const [expanded, setExpanded] = useState(false)
  const handleAnswerClick = (answer) => {
    // Set answer_id as selected answer for the message
    // Set "date_responded" to current time
    // Handle any checks for if answer is alibi, is bad etc.
    console.log(answer)
  }
  return (
    <div className={styles.questionContainer}>
      <div
        className={styles.questionTitle}
        onClick={(expanded) => setExpanded(!expanded)}
        role="button"
      >
        {question.question}
      </div>
      <div
        className={`${styles.questionAnswersContainer} ${
          expanded ? styles.questionAnswersContainerExpanded : ''
        }`}
      >
        {question.answers?.map((answer) => (
          <div
            key={answer.id}
            className={styles.questionAnswer}
            onClick={() => handleAnswerClick(answer)}
            role="button"
          >
            {answer.answer}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Question
