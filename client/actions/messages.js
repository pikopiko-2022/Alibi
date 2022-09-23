import { getMessages } from '../apis/messagesApi'

export const SET_MESSAGES = 'SET_MESSAGES'

export function setMessages(messages) {
  console.log(messages)
  return {
    type: SET_MESSAGES,
    payload: messages,
  }
}

export function fetchMessages(token) {
  console.log(token)
  return (dispatch) => {
    return getMessages(token)
      .then((messages) => {
        console.log(messages)
        dispatch(setMessages(messages))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}
