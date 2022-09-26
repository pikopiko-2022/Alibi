import {
  addAnswerToMessage,
  getMessages,
  sendMessage,
} from '../apis/messagesApi'

export const SET_MESSAGES = 'SET_MESSAGES'

export function setMessages(messages) {
  return {
    type: SET_MESSAGES,
    payload: messages,
  }
}

export function fetchMessages(token) {
  return (dispatch) => {
    return getMessages(token)
      .then((messages) => {
        dispatch(setMessages(messages))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}

export function addMessage(token) {
  return (dispatch) => {
    return sendMessage(token)
      .then(() => getMessages(token))
      .then((messages) => dispatch(setMessages(messages)))
      .catch((err) => console.error(err.message))
  }
}

export function updateMessageAnswer(messageId, answerId, token) {
  return (dispatch) => {
    return addAnswerToMessage(messageId, answerId, token)
      .then(() => getMessages(token))
      .then((messages) => {
        dispatch(setMessages(messages))
      })
      .catch((err) => console.error(err.message))
  }
}
