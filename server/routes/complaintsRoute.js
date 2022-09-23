const express = require('express')
const db = require('../db/dbComplaints')
const router = express.Router()
const checkJwt = require('../auth0')

router.get('/current', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub || 1
  db.getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => db.getCurrentComplaints(userId))
    .then((currentComplaints) => {
      res.json(currentComplaints)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
