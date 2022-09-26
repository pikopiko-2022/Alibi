const express = require('express')
// const checkJwt = require('../auth0')
const db = require('../db/dbUsers')
const router = express.Router()

//----- Authentications user functions ------

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

module.exports = router
