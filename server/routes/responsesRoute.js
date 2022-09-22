const { response } = require('express')
const express = require('express')
const db = require('../db/dbResponses')
const router = express.Router()

router.get('/', (req, res) => {
  db.getResponses()
    .then((responses) => {
      res.json(responses)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
