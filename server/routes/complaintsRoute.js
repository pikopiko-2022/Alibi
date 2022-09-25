const express = require('express')
const db = require('../db/dbComplaints')
const { getUserIdByAuth0Id } = require('../db/dbUsers')
const router = express.Router()
const checkJwt = require('../auth0')

router.post('/', checkJwt, (req, res) => {
  const complaint = req.body
  db.addComplaint(complaint)
    .then(() => {
      res.send(complaint.image)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('no worky')
    })
})

router.get('/current', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub || 1
  getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => db.getCurrentComplaints(userId))
    .then((currentComplaints) => {
      res.json(currentComplaints)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.put('/:complaintsId', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  const complaintsId = req.params.complaintsId
  console.log(complaintsId)
  db.getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => {
      return db.updateCulpritDb(complaintsId, userId)
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

module.exports = router
