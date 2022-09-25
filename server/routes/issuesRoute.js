const express = require('express')
require('dotenv').config()
const { getSignedPutUrl } = require('./lib')
const { getIssues } = require('../db/dbIssues')

const router = express.Router()

router.get('/', (req, res) => {
  return getSignedPutUrl()
    .then((url) => {
      res.json(url)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

//Create Form
//get Issue
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
