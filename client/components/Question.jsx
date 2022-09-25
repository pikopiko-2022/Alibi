import React, { useEffect, useState } from 'react'
import styles from './Question.module.scss'
import { getQuestionsByIssueApi } from '../apis/questionsApi'
import { getAnswersByQuestionApi } from '../apis/answersApi'
import { updateUserScore } from '../actions/user'
import { updateMessageAnswer } from '../actions/messages'
import { useDispatch, useSelector } from 'react-redux'

const Question = ({ message }) => {
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user?.token)
  const questions = useSelector((state) => state.questions)
  const [question, setQuestion] = useState([])
  const [answer, setAnswer] = useState([])

  const handleAnswerSelect = (answer) => {
    // TODO Add Answer logic here
    console.log('clicked: ', answer)
    // dispatch(updateUserScore(userScore, token))
    // dispatch(updateMessageAnswer(question.id, answer.id, token))
  }
  const handleAnswerKey = (e, answer) => {
    if (e.key === 'Enter' || e.key === 'Space') handleAnswerSelect(answer)
  }

  const handleExpandKey = (e) => {
    if (e.key === 'ArrowDown') setExpanded(true)
    else if (e.key === 'ArrowUp') setExpanded(false)
    else if (e.key === 'Enter' || e.key === 'Space')
      setExpanded((expanded) => !expanded)
  }

  useEffect(() => {
    setQuestion(
      questions.find((question) => question.id === message.question_id)
    )
    getAnswersByQuestionApi(message.question_id)
      .then((answers) => {
        return setAnswer(answers)
      })
      .catch((error) => {
        return console.error(error)
      })
  }, [questions])

  return (
    <div className={styles.questionContainer}>
      <div
        className={styles.questionTitleContainer}
        onClick={() => setExpanded((expanded) => !expanded)}
        role="button"
        onKeyDown={handleExpandKey}
        tabIndex={0}
      >
        <div className={styles.questionDate}>{question?.date_sent}</div>
        <div className={styles.questionTitle}>{question?.question}</div>
      </div>
      {expanded && (
        <div
          className={`${styles.questionAnswersContainer} ${
            expanded ? styles.questionAnswersContainerExpanded : ''
          }`}
        >
          {answer?.map((answer, i) => (
            <div
              key={i}
              className={styles.questionAnswer}
              onClick={() => handleAnswerSelect(answer)}
              role="button"
              onKeyDown={(e) => handleAnswerKey(e, answer)}
              tabIndex={i + 1}
            >
              {answer?.answer}
              {answer?.id === question?.answer_id && (
                <div style={{ backgroundColor: 'red' }}>SELECTED</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Question
