import React, { useEffect, useState } from 'react'
import styles from './Question.module.scss'
import { getQuestionsByIssueApi } from '../apis/questionsApi'
import { getAnswersApi } from '../apis/answersApi'

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
    return getQuestionsByIssueApi().then((questions) => {
      setQuestion(getRandomQuestion(questions)),
        setAnswer(getAnswersApi(question))
      return null
    })
  }, [])

  console.log(question.question)
  console.log(answer)

  return (
    <>
      <div>{question.question}</div>
      <div>{answer.answer}</div>
      {/* div for Q, div for answers. drop-down */}
    </>
  )
}

export default Question

// {
//   id, issue_id, question
// }

// getAnswersForQuestion(question.id) // apis/
// get request to some route that will find all answers that match the question.id
// db.getAnswersForQuestion(question.id)
// db/

// function App() {
//   const [sharks, setSharks] = useState([])

//   useEffect(() => {
//     return getSharks().then((sharks) => {
//       setSharks(sharks)
//       return null
//     })
//   }, [])

//   const submitShark = (shark) => {
//     return postShark(shark).then((newShark) => {
//       setSharks([...sharks, newShark])
//       return null
//     })
//     // TODO: Need some error handling here in case db update fails!
//   }

//   return (
//     <div>
//       <h1>Shark family!</h1>
//       {sharks.map((shark) => (
//         <Shark key={shark.id} name={shark.name} colour={shark.colour} />
//       ))}
//       <br />
//       <SharkForm submitShark={submitShark} />
//     </div>
//   )
// }
