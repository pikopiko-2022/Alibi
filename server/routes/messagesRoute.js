const express = require('express')
const db = require('../db/dbMessages')
const { getUserIdByAuth0Id } = require('../db/dbUsers')
const router = express.Router()
const checkJwt = require('../auth0')

router.get('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => db.getMessages(userId))
    .then((messages) => {
      res.json(messages)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.post('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub || 1
  const message = res.body
  getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => db.addMessage({ ...message, recipient_id: userId }))
    .then((message) => db.getMessages(message.recipient_id))
    .then((messages) => {
      res.json(messages)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
