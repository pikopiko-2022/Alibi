const express = require('express')
const db = require('../db/dbFlatmates')
const { getAlibiAnswers } = require('../db/dbAnswers')
const { getAlibiMessages } = require('../db/dbMessages')
const router = express.Router()

router.get('/', (req, res) => {
  db.getFlatmates()
    .then((users) => {
      res.json(users)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.get('/alibi/', (req, res) => {
  getAlibiAnswers()
    .then((answers) => getAlibiMessages(answers))
    .then((messages) => {
      res.json(
        Object.entries(
          messages
            .map((message) => message.recipient_id)
            .reduce((a, v) => {
              a[v] = a[v] ? a[v] + 1 : 1
              return a
            }, {})
        ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0]
      )
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
