const express = require('express')
const db = require('../db/dbAnswers')
const router = express.Router()

router.get('/', (req, res) => {
  db.getAnswers()
    .then((answer) => {
      res.json(answer)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
