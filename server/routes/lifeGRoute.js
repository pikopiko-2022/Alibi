const express = require('express')
const db = require('../db/dbLifeG')
const router = express.Router()

router.get('/', (req, res) => {
  db.getLifeG()
    .then((advice) => {
      res.json(advice)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.get('/issue/:id', (req, res) => {
  const issue_id = req.params.id
  db.getLifeGforIssue(issue_id)
    .then((directive) => {
      res.json(directive)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
