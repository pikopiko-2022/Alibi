const express = require('express')
const path = require('path')

const usersRoutes = require('./routes/usersRoute')
const createRoutes = require('./routes/create')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/create', createRoutes)

module.exports = server

