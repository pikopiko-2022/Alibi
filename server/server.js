const express = require('express')
const path = require('path')

const flatmateRoutes = require('./routes/flatmatesRoute')
const userRoutes = require('./routes/userRoute')
const imageUrlRoutes = require('./routes/imageUrlRoute')
const issuesRoutes = require('./routes/issuesRoute')
const lifeGRoutes = require('./routes/lifeGRoute')
const questionsRoutes = require('./routes/questionsRoute')
const answersRoutes = require('./routes/answersRoute')
const flatRoutes = require('./routes/flatRoute')
const complaintsRoutes = require('./routes/complaintsRoute')
const messagesRoutes = require('./routes/messagesRoute')

const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
  socket.on('update player', ({ player }) =>
    socket.broadcast.emit('update player', { player })
  )
  socket.on('update coins', ({ coins }) =>
    socket.broadcast.emit('update coins', { coins })
  )
  socket.on('coin collected', ({ coin }) =>
    socket.broadcast.emit('coin collected', { coin })
  )
  socket.on('coin added', ({ coin }) =>
    socket.broadcast.emit('coin added', { coin })
  )
  socket.on('new player arrived', () =>
    socket.broadcast.emit('new player arrived')
  )
})

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
  req.io = io
  next()
})

app.use('/api/v1/flatmates', flatmateRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/imageUrl', imageUrlRoutes)
app.use('/api/v1/issues', issuesRoutes)
app.use('/api/v1/lifeG', lifeGRoutes)
app.use('/api/v1/questions', questionsRoutes)
app.use('/api/v1/answers', answersRoutes)
app.use('/api/v1/flat', flatRoutes)
app.use('/api/v1/complaints', complaintsRoutes)
app.use('/api/v1/messages', messagesRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})

module.exports = server
