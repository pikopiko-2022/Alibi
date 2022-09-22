const express = require('express')
const path = require('path')

const usersRoutes = require('./routes/usersRoute')
const lifeGRoutes = require('./routes/lifeGRoute')
const questionsRoutes = require('./routes/questionsRoute')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/lifeG', lifeGRoutes)
server.use('/api/v1/questions', questionsRoutes)

module.exports = server
