const express = require('express')
const db = require('../db/dbMessages')
const { getUserIdByAuth0Id, getUser } = require('../db/dbUsers')
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

router.get('/name', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  getUser(auth0_id)
    .then((user) => db.getMessagesByName(user?.name, user?.id))
    .then((messages) => {
      res.json(messages)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.post('/', checkJwt, (req, res) => {
  const message = req.body
  db.addMessage(message)
    .then((newMessage) => {
      message.sender_id && req.io.emit('update messages')
      res.json(newMessage)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.put('/:messageId', checkJwt, (req, res) => {
  const messageId = req.params.messageId
  const { answerId } = req.body
  db.updateMessage(messageId, { answer_id: answerId })
    .then((result) => {
      res.json(result)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
