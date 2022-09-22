const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/dbUsers')
const router = express.Router()

router.get('/', (req, res) => {
  db.getUsers()
    .then((users) => {
      res.json(users)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.post('/', checkJwt, (req, res) => {
  // console.log(req)
  console.log(req.user)
  const auth0_id = req?.user?.sub
  const { username, flatId } = req.body
  const userDetails = {
    auth0_id,
    name: username,
    flat_id: flatId,
  }
  console.log(userDetails)

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