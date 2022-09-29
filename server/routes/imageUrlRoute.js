const express = require('express')
require('dotenv').config()
const router = express.Router()

const { getSignedPutUrl } = require('./lib')

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
