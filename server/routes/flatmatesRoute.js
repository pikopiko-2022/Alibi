const express = require('express')
const db = require('../db/dbFlatmates')
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

module.exports = router
