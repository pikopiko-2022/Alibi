const express = require('express')
const path = require('path')

const usersRoutes = require('./routes/usersRoute')
const userRoutes = require('./routes/userRoute')
const lifeGRoutes = require('./routes/lifeGRoute')
const questionsRoutes = require('./routes/questionsRoute')
const answersRoutes = require('./routes/answersRoute')
const flatsRoutes = require('./routes/flatsRoute')
const createRoutes = require('./routes/create')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/user', userRoutes)
server.use('/api/v1/lifeG', lifeGRoutes)
server.use('/api/v1/questions', questionsRoutes)
server.use('/api/v1/answers', answersRoutes)
server.use('/api/v1/flats', flatsRoutes)
server.use('/api/v1/create', createRoutes)

module.exports = server
