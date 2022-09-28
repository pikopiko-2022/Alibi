import nock from 'nock'
import {
  addAnswerToMessage,
  getMessages,
  sendCustomMessage,
} from '../messagesApi'

const mockCustomMessage = {
  id: 1,
  message: 'Hello',
  recipient_id: 2,
}

const mockMessages = [
  {
    id: 3,
    message: 'Hi there',
    recipient_id: 1,
  },
  {
    id: 4,
    message: 'How are you?',
    recipient_id: 2,
    sender_id: 3,
  },
]

jest.spyOn(console, 'error')
afterEach(() => {
  console.error.mockReset()
})

const errorMessage = 'something went wrong'

//sendMessages()

//sendCustomMessage()
describe('POST /api/v1/messages', () => {
  it('sends custom message', () => {
    const scope = nock('http://localhost')
      .post('/api/v1/messages')
      .reply(200, JSON.stringify(mockCustomMessage), {
        'Content-Type': 'application/json',
      })
    return sendCustomMessage(mockCustomMessage).then((result) => {
      expect(result).toStrictEqual(mockCustomMessage)
      expect(scope.isDone()).toBe(true)
    })
  })
  it('returns error message when custom message fails', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/messages')
      .replyWithError(errorMessage)

    return getMessages().then(() => {
      console.error.mockImplementation(() => {})
      expect(scope.isDone()).toBe(true)
      expect(console.error).toHaveBeenCalledWith(errorMessage)
    })
  })
})

//getMessages()
describe('GET /api/v1/messages', () => {
  it('returns all messages', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/messages')
      .reply(200, JSON.stringify(mockMessages), {
        'Content-Type': 'application/json',
      })
    return getMessages().then((result) => {
      expect(result).toStrictEqual(mockMessages)
      expect(scope.isDone()).toBe(true)
    })
  })
  it('returns error message when it fails', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/messages')
      .replyWithError(errorMessage)

    return getMessages().then(() => {
      console.error.mockImplementation(() => {})
      expect(scope.isDone()).toBe(true)
      expect(console.error).toHaveBeenCalledWith(errorMessage)
    })
  })
})

const messageId = 1
const answerId = 1
//addAnswerToMessage
describe('PUT /api/v1/messages/:id', () => {
  it('adds answer to message based on id', () => {
    const scope = nock('http://localhost')
      .put(`/api/v1/messages/${messageId}`)
      .reply(200, JSON.stringify(answerId), {
        'Content-Type': 'application/json',
      })
    return addAnswerToMessage(messageId, answerId).then((result) => {
      expect(result).toStrictEqual(answerId)
      expect(scope.isDone()).toBe(true)
    })
  })
  it('returns error message when custom message fails', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/messages')
      .replyWithError(errorMessage)

    return getMessages().then(() => {
      console.error.mockImplementation(() => {})
      expect(scope.isDone()).toBe(true)
      expect(console.error).toHaveBeenCalledWith(errorMessage)
    })
  })
})
