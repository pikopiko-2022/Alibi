const express = require('express')
require('dotenv').config()
const { getSignedPutUrl } = require('./lib')
const { getIssues, addComplaint } = require('../db/create')

const router = express.Router()

router.get('/', (req, res) => {
  return getSignedPutUrl()
    .then((url) => {
      res.json(url)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

//get Issue
router.get('/issues', (req, res) => {
  return getIssues()
    .then((issues) => {
      res.json(issues)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

//post complaint to complaints db
//
router.post('/complaints', (req, res) => {
  const complaint = req.body
  return addComplaint(complaint)
    .then(() => {
      res.send(complaint.image)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('no worky')
    })
})

//getQuestions
// router.get('/questions/:id', (req, res) => {
//   //remember to change to req.body
//   const id = req.params.id
//   console.log(id)
//   return getQuestions(id)
//     .then((questions) => {
//       res.json(questions)
//     })
//     .catch((err) => {
//       res.status(500).send(err.message)
//     })
// })

//

// TODO add checkJwt middleware
// router.post('/', (req, res) => {
//   const { url } = req.body
// // const auth0Id = req.user?.sub
// addFood({
//   name,
//   description,
//   image_url: url,
// })
//   .then(() => getFoods())
//   .then((foods) => res.json(foods))
//   .catch((err) => {
//     console.error(err.message)
//     res.status(500).send(err.message)
//   })
// })

module.exports = router
