
import React, { useEffect, useState } from 'react'
import styles from './Question.module.scss'
import { getQuestionsByIssueApi } from '../apis/questionsApi'
import { getAnswersByQuestionApi } from '../apis/answersApi'

// import { fetchQuestions } from '../actions/questions'
// import { fetchAnswers } from '../actions/answers'

// get all answers where answers.question_id is equal to question.id
// display the question (text)
// below it map the answers as <div>
// when an answer is clicked it should send the message to a function that handles the game logic

//arr[Math.floor(Math.random() * arr.length)]

function getRandomQuestion(questionArray) {
  // questionArray = null
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
  console.log(answer)
  console.log(question.question)
  return (
    <>
      <div>{question.question}</div>
      {/* <div>{answer.answer}</div> */}
      {/* div for Q, div for answers. drop-down */}
    </>
  )
}

export default Question

{
  /* <li>
          {flatmates.map((flatmate) => (
            <Flatmate key={flatmate.id} flatmate={flatmate} />
          ))}
        </li> */
}

