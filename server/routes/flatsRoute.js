const express = require('express')
const db = require('../db/dbFlats')
const router = express.Router()

router.get('/', (req, res) => {
  db.getFlats()
    .then((flats) => {
      res.json(flats)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
