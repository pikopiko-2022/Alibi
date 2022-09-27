const request = require('supertest')
const server = require('../../server')
const checkJwt = require('../../auth0')
const {
  getMessages,
  addMessage,
  updateMessage,
} = require('../../db/dbMessages')
const { getUserIdByAuth0Id } = require('../../db/dbUsers')

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

getMessages.mockReturnValue(
  Promise.resolve([
    { id: 1, recipient_id: 1 },
    { id: 2, message: 'Howdy' },
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
})
