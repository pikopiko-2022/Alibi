const express = require('express')
require('dotenv').config()
const { getSignedPutUrl } = require('./lib')

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

// TODO add checkJwt middleware
router.post('/', (req, res) => {
  // const { name, description, url } = req.body
  // const auth0Id = undefined
  // // const auth0Id = req.user?.sub
  // const mockAuth0Id = '42'
  res.send('Success')
  // addFood({
  //   name,
  //   description,
  //   image_url: url,
  //   uploader_id: auth0Id || mockAuth0Id,
  // })
  //   .then(() => getFoods())
  //   .then((foods) => res.json(foods))
  //   .catch((err) => {
  //     console.error(err.message)
  //     res.status(500).send(err.message)
  //   })
})

module.exports = router
