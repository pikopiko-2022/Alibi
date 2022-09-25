import { updateCulprit, addCulpritToComplaint } from '../apis/complaints'
import { getMessages, addAnswerToMessage } from '../apis/messagesApi'

//                                  //
// Called by useTimeout in App.jsx  //
//                                  //

// function sendMessage
// Current complaints = all complaints where culprit_id = NULL or undefined
// Make API call to get these
// if current complaints > 0 then
//    sendQuestion()
// else send random question

// function sendRandomQuestion
// get any random question
// save message in Messages table
// leave complaint_id NULL

// send question from complaint
// function sendQuestion
// get question that has issue_id that matches the complaint.issue_id
// save message in Messages table
// save complaint_id in Messages

//                                                        //
//  Called when user clicks an answer option to question  //
//                                                        //
// function receiveAnswer()
// update the Message with answer_id and date_responded
// If there is no complaint_id in message, then do nothing (it's a decoy)
// else if alibi
//    do nothing
// else if bad answer
//    1. add -1 to culprits score
//    2. set answerer to the culprit for that Complaint
//    3. send the answerer a life guidance message (put into the messages table)
// else
//    add +1 to culprits score
export function receiveAnswer(messages, answers, complaints, users, token) {
  //we need to get messages answers complainst and users tables? How do we do this?
  const culpritScore = 0
  if (messages.complaint_id === null) {
    return null
  } else if (answers.is_alibi === 1) {
    return null
  } else if (answers.is_bad === 1) {
    culpritScore - 1
    complaints.culprit_id = users.id
    // complaints.culprit_id = users.id
    // updateCulprit({ culprit_id: users.id })
    addCulpritToComplaint(complaints.id, complaints.culprit_id, token)
    // sendGuidance()
  } else {
    culpritScore + 1
    addAnswerToMessage(messages.id, answers.id, token)
  }
  return users.rating + culpritScore
}