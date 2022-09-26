const express = require('express')
require('dotenv').config()
const router = express.Router()

const { getSignedPutUrl } = require('./lib')

//this route could probably be better named /api/v1/create isn't very descriptive
router.get('/', (req, res) => {
  return getSignedPutUrl()
    .then((url) => {
      res.json(url)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
