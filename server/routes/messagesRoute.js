const express = require('express')
const db = require('../db/dbMessages')
const { getUserIdByAuth0Id } = require('../db/dbUsers')
const router = express.Router()
const checkJwt = require('../auth0')

// TODO replace these with getQuestions, getAnswers, etc. from components

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
  const auth0_id = req.user?.sub
  const message = req.body
  getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => db.addMessage({ ...message, recipient_id: userId }))
    .then((newMessage) => {
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
