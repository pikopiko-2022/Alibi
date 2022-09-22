const express = require('express')
const db = require('../db/dbAnswers')
const router = express.Router()

router.get('/:question_id', (req, res) => {
  const questionId = req.params.question_id
  db.getAnswers(questionId)
    .then((answers) => {
      res.json(answers)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
