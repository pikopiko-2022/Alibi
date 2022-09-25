const express = require('express')
const path = require('path')

const usersRoutes = require('./routes/usersRoute')
const userRoutes = require('./routes/userRoute')
const createRoutes = require('./routes/create')
const registrationRoutes = require('./routes/registration')
const lifeGRoutes = require('./routes/lifeGRoute')
const questionsRoutes = require('./routes/questionsRoute')
const answersRoutes = require('./routes/answersRoute')
const flatsRoutes = require('./routes/flatsRoute')
const complaintsRoutes = require('./routes/complaintsRoute')
const messagesRoutes = require('./routes/messagesRoute')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/user', userRoutes)
server.use('/api/v1/create', createRoutes)
server.use('/api/v1/registration', registrationRoutes)

server.use('/api/v1/lifeG', lifeGRoutes)
server.use('/api/v1/questions', questionsRoutes)
server.use('/api/v1/answers', answersRoutes)
server.use('/api/v1/flats', flatsRoutes)
server.use('/api/v1/complaints', complaintsRoutes)
server.use('/api/v1/messages', messagesRoutes)

module.exports = server
