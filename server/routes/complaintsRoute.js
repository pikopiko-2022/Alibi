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
  const auth0_id = req.user?.sub
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

<<<<<<< HEAD
router.get('/all', (req, res) => {
  db.getAllComplaints()
    .then((complaints) => {
      res.json(complaints)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.get('/count', (req, res) => {
  db.getHighestComplainant()
=======
router.get('/culprit', checkJwt, (req, res) => {
  const auth0_id = req.user?.sub
  getUserIdByAuth0Id(auth0_id)
    .then(({ userId }) => db.getComplaintsForUser(userId))
>>>>>>> fd80e54fdec8b0e8e746859fdc0b7a629e822590
    .then((complaints) => {
      res.json(complaints)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
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
      res.status(500).send(err.message)
    })
})

module.exports = router
