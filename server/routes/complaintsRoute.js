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
      res.status(500).send('something went wrong')
    })
})

router.get('/current', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => db.getCurrentComplaints(userId))
    .then((currentComplaints) => {
      res.json(currentComplaints)
      return null
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('something went wrong')
    })
})

router.put('/:complaintsId', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  const complaintsId = req.params.complaintsId
  getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => {
      return db.updateCulpritDb(complaintsId, userId)
    })
    .then((result) => {
      res.json(result)
      return null
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('something went wrong')
    })
})

module.exports = router
