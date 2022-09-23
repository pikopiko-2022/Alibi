const express = require('express')
const db = require('../db/dbMessages')
const { getAnswers } = require('../db/dbAnswers')
const { getUserIdByAuth0Id } = require('../db/dbUsers')
const router = express.Router()
const checkJwt = require('../auth0')

router.get('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  let messagesResult = []
  getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => db.getMessages(userId))
    .then((messages) => {
      messagesResult = messages
      return getAnswers(messages)
    })
    .then((answers) => {
      messagesResult = messagesResult.map((message) => ({
        ...message,
        answers: answers.filter(
          (answer) => answer.question_id === message.question_id
        ),
      }))
      res.json(messagesResult)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.post('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  const message = req.body
  let authUserId = null
  let messagesResult = []
  getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => {
      authUserId = userId
      return db.addMessage({ ...message, recipient_id: userId })
    })
    .then((newMessage) => {
      console.log(newMessage)
      return db.getMessages(authUserId)
    })
    .then((messages) => {
      messagesResult = messages
      return getAnswers(messages)
    })
    .then((answers) => {
      messagesResult = messagesResult.map((message) => ({
        ...message,
        answers: answers.filter(
          (answer) => answer.question_id === message.question_id
        ),
      }))
      res.json(messagesResult)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
