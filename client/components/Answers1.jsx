import React from 'react'
import { useDispatch } from 'react-redux'
import { updateCulprit } from '../actions/answers'
import { updateUserScore } from '../actions/user'
import { updateMessageAnswer } from '../actions/messages'

export function Question() {
  const dispatch = useDispatch()

  function receiveAnswer(question, answer, message, complaint, user, token) {
    let culpritScore = 0
    if (message.complaint_id === null) {
      return null
    } else if (answer.is_alibi === 1) {
      return null
    } else if (answer.is_bad === 1) {
      culpritScore = -1
      complaint.culprit_id = user.id
      // complaints.culprit_id = users.id
      // updateCulprit({ culprit_id: users.id })
      dispatch(updateUserScore(culpritScore, token))
      dispatch(updateCulprit(complaint.id, complaint.culprit_id, token))
      // sendGuidance()
    } else {
      culpritScore = 1
      dispatch(updateUserScore(culpritScore, token))
      // addAnswerToMessage(messages.id, answers.id, token)
    }
    dispatch(updateMessageAnswer(question.id, answer.id, token))
    return user.rating + culpritScore
  }

  return <button onClick={receiveAnswer}>Submit!</button>
}
