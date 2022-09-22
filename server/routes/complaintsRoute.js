const express = require('express')
const db = require('../db/dbComplaints')
const router = express.Router()

router.get('/current', (req, res) => {
  db.getCurrentComplaints()
    .then((currentComplaints) => {
      res.json(currentComplaints)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
