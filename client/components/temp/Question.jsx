import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Question.module.scss'
import { updateUserScore } from '../../actions/user'
import { updateMessageAnswer } from '../../actions/messages'
// import { fetchQuestions } from '../actions/questions'
// import { fetchAnswers } from '../actions/answers'

// get all answers where answers.question_id is equal to question.id
// display the question (text)
// below it map the answers as <div>
// when an answer is clicked it should send the message to a function that handles the game logic

// <Question question={question} />

const Question = ({ question }) => {
  const [expanded, setExpanded] = useState(false)
  const token = useSelector((state) => state.user?.token)
  const dispatch = useDispatch()
  const handleAnswerClick = (answer) => {
    // Set answer_id as selected answer for the message
    // Set "date_responded" to current time
    // Handle any checks for if answer is alibi, is bad etc.
    console.log(answer)
    // add answer id to message
    let userScore = 0
    if (!question.complaint_id) {
      // do nothing
    } else if (answer.is_alibi) {
      // do alibi
    } else if (answer.is_bad) {
      // do bad
      userScore = -1
    } else {
      // other
      userScore = 1
    }
    dispatch(updateUserScore(userScore, token))
    dispatch(updateMessageAnswer(question.id, answer.id, token))
  }

  return (
    <div className={styles.questionContainer}>
      <div
        className={styles.questionTitleContainer}
        onClick={(expanded) => setExpanded(!expanded)}
        role="button"
      >
        <div className={styles.questionDate}>{question.date_sent}</div>
        <div className={styles.questionTitle}>{question.question}</div>
      </div>
      <div
        className={`${styles.questionAnswersContainer} ${
          expanded ? styles.questionAnswersContainerExpanded : ''
        }`}
      >
        {question.answers?.map((answer, i) => (
          <div
            key={i}
            className={styles.questionAnswer}
            onClick={() => handleAnswerClick(answer)}
            role="button"
          >
            {answer.answer}
            {answer.id === question.answer_id && (
              <div style={{ backgroundColor: 'red' }}>SELECTED</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Question
