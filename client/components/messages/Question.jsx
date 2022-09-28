import React, { useEffect, useState } from 'react'
import styles from './Message.module.scss'
import { getAnswersByQuestionApi } from '../../apis/answersApi'
import { updateCulprit } from '../../actions/answers'
import { updateUserScore } from '../../actions/user'
import { updateMessageAnswer, addLifeGMessage } from '../../actions/messages'
import { useDispatch, useSelector } from 'react-redux'
import { getRandomNumber } from '../../apis/messagesApi'
import MessageDate from './MessageDate'

const Question = ({ message }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user?.token)
  const userId = useSelector((state) => state.user?.id)
  const questions = useSelector((state) => state.questions)

  const [expanded, setExpanded] = useState(false)
  const [question, setQuestion] = useState([])
  const [answers, setAnswers] = useState([])

  const disabled = Boolean(message.answer_id)

  const handleAnswerSelect = (answer) => {
    let culpritScore = 0
    if (message.complaint_id === null) {
      // This is a dummy question
    } else if (answer.is_alibi === 1) {
      // This is an alibi answer
    } else if (answer.is_bad === 1) {
      // This is a bad answer
      culpritScore = -1
      setTimeout(
        () => dispatch(addLifeGMessage(userId, question.issue_id, token)),
        getRandomNumber(500, 10000)
      )
    } else {
      // This is a good answer
      culpritScore = 1
    }
    if (message.complaint_id !== null) {
      dispatch(updateCulprit(message.complaint_id, token))
      dispatch(updateUserScore(culpritScore, token))
    }
    dispatch(updateMessageAnswer(message.id, answer.id, token))
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
        setAnswers(answers)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [questions?.length])

  return (
    <div className={styles.messageContainer}>
      <div
        className={styles.questionTitleContainer}
        onClick={() => setExpanded((expanded) => !expanded)}
        role="button"
        onKeyDown={handleExpandKey}
        tabIndex={0}
      >
        <MessageDate message={message} />
        <div className={styles.questionTitle}>{question?.question}</div>
      </div>
      {expanded && (
        <div>
          {answers?.map((answer, i) => (
            <div
              key={i}
              className={
                answer?.id === message?.answer_id
                  ? styles.questionAnswerSelected
                  : disabled
                  ? styles.questionAnswerDisabled
                  : styles.questionAnswer
              }
              onClick={() => (disabled ? null : handleAnswerSelect(answer))}
              role="button"
              onKeyDown={(e) => (disabled ? null : handleAnswerKey(e, answer))}
              tabIndex={i + 1}
            >
              {answer?.answer}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Question
