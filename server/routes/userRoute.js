const express = require('express')
const db = require('../db/dbUsers')
const router = express.Router()
const checkJwt = require('../auth0')

router.get('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  db.getUser(auth0_id)
    .then((user) => {
      res.json(user)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.put('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  const { score } = req.body
  db.getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => {
      return db.updateUserScore(userId, score)
    })
    .then((result) => {
      req.io.emit('users updated')
      res.json(result)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.post('/', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  const { username, flatID } = req.body
  const userDetails = {
    auth0_id,
    name: username,
    flat_id: flatID,
  }
  db.userExists(username)
    .then((usernameTaken) => {
      if (usernameTaken) throw new Error('Username Taken')
    })
    .then(() => db.addUser(userDetails))
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error(err)
      if (err.message === 'Username Taken') {
        res.status(403).send('Username Taken')
      } else {
        res.status(500).send(err.message)
      }
    })
})

module.exports = router
