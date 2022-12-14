const request = require('supertest')
const server = require('../../server')
const checkJwt = require('../../auth0')
const {
  getMessages,
  addMessage,
  updateMessage,
  getMessagesByName,
} = require('../../db/dbMessages')
const { getUserIdByAuth0Id, getUser } = require('../../db/dbUsers')

jest.mock('../../db/dbMessages')
jest.mock('../../db/dbUsers')
jest.mock('../../auth0')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
  jest.clearAllMocks()
})

const emit = jest.fn()

checkJwt.mockImplementation((req, res, next) => {
  req.user = { sub: '1' }
  req.io = { emit }
  next()
})

getUserIdByAuth0Id.mockReturnValue(Promise.resolve(1))

getUser.mockReturnValue(Promise.resolve({ name: 'Billy', id: 1 }))

getMessages.mockReturnValue(
  Promise.resolve([
    { id: 1, recipient_id: 1 },
    { id: 2, message: 'Howdy' },
  ])
)

getMessagesByName.mockReturnValue(
  Promise.resolve([
    { id: 1, message: 'Hey Billy' },
    { id: 2, message: 'I hate billy' },
  ])
)

addMessage.mockReturnValue(Promise.resolve(1))
updateMessage.mockReturnValue(Promise.resolve(1))

describe('GET /api/v1/messages', () => {
  it('returns all messages for user', () => {
    return request(server)
      .get('/api/v1/messages')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[1].message).toBe('Howdy')
      })
  })
  it('return status 500 and consoles error when problem', () => {
    getMessages.mockImplementation(() => Promise.reject(new Error('fail')))
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/api/v1/messages')
      .then((res) => {
        expect(res.status).toBe(500)
        return null
      })
  })
})

describe('GET /api/v1/messages/name/:userName', () => {
  it('returns all messages that mention the name', () => {
    return request(server)
      .get('/api/v1/messages/name')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[0].message).toBe('Hey Billy')
      })
  })
  it('return status 500 and consoles error when problem', () => {
    getMessagesByName.mockImplementation(() =>
      Promise.reject(new Error('fail'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/api/v1/messages/name')
      .then((res) => {
        expect(res.status).toBe(500)
        return null
      })
  })
})

describe('POST /api/v1/messages', () => {
  it('posts a new message and fires emit if message has a sender id', () => {
    return request(server)
      .post('/api/v1/messages')
      .send({ message: 'Gday', sender_id: 1 })
      .then((res) => {
        expect(res.body).toBe(1)
        expect(emit).toHaveBeenCalledTimes(1)
        expect(emit).toHaveBeenCalledWith('update messages')
      })
  })
  it(`doesn't fire emit when for questions with no sender id`, () => {
    return request(server)
      .post('/api/v1/messages')
      .send({ question_id: 2 })
      .then((res) => {
        expect(res.body).toBe(1)
        expect(emit).toHaveBeenCalledTimes(0)
      })
  })
  it('return status 500 and consoles error when problem', () => {
    addMessage.mockImplementation(() => Promise.reject(new Error('fail')))
    console.error.mockImplementation(() => {})
    return request(server)
      .post('/api/v1/messages')
      .then((res) => {
        expect(res.status).toBe(500)
        return null
      })
  })
})

describe('PUT /api/v1/messages', () => {
  it('updates a message when user clicks on an answer', () => {
    return request(server)
      .put('/api/v1/messages/2')
      .send({ answerId: 2 })
      .then((res) => {
        expect(res.body).toBe(1)
      })
  })
  it('return status 500 and consoles error when problem', () => {
    updateMessage.mockImplementation(() => Promise.reject(new Error('fail')))
    console.error.mockImplementation(() => {})
    return request(server)
      .put('/api/v1/messages/2')
      .then((res) => {
        expect(res.status).toBe(500)
        return null
      })
  })
})
