import React, { useEffect, useState } from 'react'
import styles from './Question.module.scss'
import { getQuestionsByIssueApi } from '../apis/questionsApi'
import { getAnswersByQuestionApi } from '../apis/answersApi'
function getRandomQuestion(questionArray) {
  return questionArray[Math.floor(Math.random() * questionArray.length)]
}

const Question = () => {
  const [question, setQuestion] = useState([])
  const [answer, setAnswer] = useState([])

  useEffect(() => {
    getQuestionsByIssueApi()
      .then((questions) => {
        return getRandomQuestion(questions)
      })
      .then((question) => {
        setQuestion(question)
        return getAnswersByQuestionApi(question.id)
      })
      .then((answers) => {
        return setAnswer(answers)
      })
      .catch((error) => {
        return console.error(error)
      })
  }, [])
  return (
    <>
      <div>{question.question}</div>
    </>
  )
}

export default Question
