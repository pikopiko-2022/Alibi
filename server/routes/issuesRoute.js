const express = require('express')
const { getIssues } = require('../db/dbIssues')

const router = express.Router()

router.get('/', (req, res) => {
  return getIssues()
    .then((issues) => {
      res.json(issues)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
