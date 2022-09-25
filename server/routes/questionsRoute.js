const express = require('express')
const db = require('../db/dbQuestions')
const router = express.Router()

router.get('/', (req, res) => {
  db.getQuestions()
    .then((questions) => {
      res.json(questions)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

// router.get('/:issueId', (req, res) => {
//   const issueId = req.params.issueId
//   db.getQuestionsForIssue(issueId)
//     .then((questions) => {
//       res.json(questions)
//       return null
//     })
//     .catch((err) => {
//       res.status(500).send(err.message)
//     })
// })

router.get('/:id', (req, res) => {
  const id = req.params.id
  db.getQuestion(id)
    .then((question) => {
      res.json(question)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
