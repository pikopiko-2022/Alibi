const express = require('express')
const db = require('../db/dbUsers')
const router = express.Router()

//-----Get user by auth0 id -----
// add jwt middleware
router.get('/', (req, res) => {
  const auth0_id = req.user?.sub || '2'
  db.getUser(auth0_id)
    .then((user) => {
      res.json(user)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
