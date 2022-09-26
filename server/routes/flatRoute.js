const express = require('express')
const db = require('../db/dbFlat')
const router = express.Router()

router.get('/', (req, res) => {
  db.getFlat()
    .then((flat) => {
      res.json(flat)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
