const express = require('express')
const path = require('path')

const usersRoutes = require('./routes/usersRoute')
const createRoutes = require('./routes/create')
const registrationRoutes = require('./routes/registration')
const userRoutes = require('./routes/userRoute')
const lifeGRoutes = require('./routes/lifeGRoute')
const questionsRoutes = require('./routes/questionsRoute')
const answersRoutes = require('./routes/answersRoute')
const flatsRoutes = require('./routes/flatsRoute')
const complaintsRoutes = require('./routes/complaintsRoute')
const messagesRoutes = require('./routes/messagesRoute')

const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
  req.io = io
  next()
})

io.on('connection', () => {
  console.log('a user connected')
})

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/create', createRoutes)
app.use('/api/v1/registration', registrationRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/lifeG', lifeGRoutes)
app.use('/api/v1/questions', questionsRoutes)
app.use('/api/v1/answers', answersRoutes)
app.use('/api/v1/flats', flatsRoutes)
app.use('/api/v1/complaints', complaintsRoutes)
app.use('/api/v1/messages', messagesRoutes)

module.exports = server
