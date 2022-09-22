const express = require('express')
const db = require('../db/dbQuestions')
const router = express.Router()

router.get('/', (req, res) => {
  db.getQuestions()
    .then((question) => {
      res.json(question)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
