require('dotenv').config()
const AWS = require('aws-sdk')
const { v4: uuid } = require('uuid')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
})

const bucket = new AWS.S3({
  apiVersion: '2006-03-01',
  signatureVersion: 'v4',
  params: { Bucket: process.env.AWS_BUCKET },
  region: process.env.AWS_REGION,
})

const getSignedPutUrl = () => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: uuid(),
      Expires: 60,
    }
    bucket.getSignedUrl('putObject', params, (err, url) => {
      if (err) reject(err)
      else {
        resolve(url)
      }
    })
  })
}

module.exports = { getSignedPutUrl }
