const express = require('express')
const db = require('../db/dbComplaints')
const { getUserIdByAuth0Id } = require('../db/dbUsers')
const router = express.Router()
const checkJwt = require('../auth0')

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

//remember to put checkJwt back in!!
//make sure req.body comes back as an object
router.put('/:complaintsId', checkJwt, (req, res) => {
  const complaintsId = req.params.complaintsId
  const culprit_id = req.body
  db.updateCulpritDb(complaintsId, culprit_id)
    .then((result) => {
      res.json(result)
      return null
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
