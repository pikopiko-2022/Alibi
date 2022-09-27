import {
  setMessages,
  fetchMessages,
  SET_MESSAGES,
  addMessage,
  addCustomMessage,
  addLifeGMessage,
  updateMessageAnswer,
} from '../messages'

import {
  addAnswerToMessage,
  getMessages,
  sendCustomMessage,
  sendLifeGuidance,
  sendMessage,
} from '../../apis/messagesApi'

jest.mock('../../apis/messagesApi')

jest.spyOn(console, 'error')

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

addAnswerToMessage.mockReturnValue(Promise.resolve(mockMessages))
getMessages.mockReturnValue(Promise.resolve(mockMessages))
sendCustomMessage.mockReturnValue(Promise.resolve(mockMessages))
sendLifeGuidance.mockReturnValue(Promise.resolve(mockMessages))
getMessages.mockReturnValue(Promise.resolve(mockMessages))
sendMessage.mockReturnValue(Promise.resolve(mockMessages))

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('setMessages', () => {
  it('sets the messages to be the messages', () => {
    expect(setMessages(mockMessages).type).toBe(SET_MESSAGES)
    expect(setMessages(mockMessages).payload).toBe(mockMessages)
  })
})

describe('fetchMessages', () => {
  it('dispatches setMessages after api call', () => {
    return fetchMessages(mockMessages)(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(SET_MESSAGES)
      expect(fakeDispatchAction.payload).toEqual(mockMessages)
    })
  })
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    getMessages.mockImplementation(() => Promise.reject(new Error('error')))
    return fetchMessages()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})

describe('addMessage', () => {
  //todo - test dispatch
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    sendMessage.mockImplementation(() => Promise.reject(new Error('error')))
    return addMessage()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})

describe('addCustomMessage', () => {
  //todo - test dispatch
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    sendCustomMessage.mockImplementation(() =>
      Promise.reject(new Error('error'))
    )
    return addCustomMessage()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})

describe('addLifeGMessage', () => {
  //todo - test dispatch
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    sendLifeGuidance.mockImplementation(() =>
      Promise.reject(new Error('error'))
    )
    return addLifeGMessage()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})

describe('updateMessageAnswer', () => {
  //todo - test dispatch
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    addAnswerToMessage.mockImplementation(() =>
      Promise.reject(new Error('error'))
    )
    return updateMessageAnswer()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})
