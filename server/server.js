const express = require('express')
const path = require('path')

const usersRoutes = require('./routes/usersRoute')
<<<<<<< HEAD
const createRoutes = require('./routes/create')
const registrationRoutes = require('./routes/registration')
=======
const userRoutes = require('./routes/userRoute')
const lifeGRoutes = require('./routes/lifeGRoute')
const questionsRoutes = require('./routes/questionsRoute')
const answersRoutes = require('./routes/answersRoute')
const flatsRoutes = require('./routes/flatsRoute')
const createRoutes = require('./routes/create')
>>>>>>> 4e922c964baf22a5cb67eac6fa6721e9dff05d9f

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/users', usersRoutes)
<<<<<<< HEAD
server.use('/api/v1/create', createRoutes)
server.use('/api/v1/registration', registrationRoutes)
=======
server.use('/api/v1/user', userRoutes)
server.use('/api/v1/lifeG', lifeGRoutes)
server.use('/api/v1/questions', questionsRoutes)
server.use('/api/v1/answers', answersRoutes)
server.use('/api/v1/flats', flatsRoutes)
server.use('/api/v1/create', createRoutes)
>>>>>>> 4e922c964baf22a5cb67eac6fa6721e9dff05d9f

module.exports = server
