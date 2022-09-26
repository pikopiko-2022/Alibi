const express = require('express')
const db = require('../db/dbAnswers')
const router = express.Router()

router.get('/', (req, res) => {
  db.getAllAnswers()
    .then((answers) => {
      res.json(answers)
      return null
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('there was a problem with the server')
    })
})

router.get('/:question_id', (req, res) => {
  const questionId = req.params.question_id
  db.getAnswers(questionId)
    .then((answers) => {
      res.json(answers)
      return null
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('there was a problem with the server')
    })
})

module.exports = router
