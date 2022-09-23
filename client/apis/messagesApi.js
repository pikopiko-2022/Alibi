import request from 'superagent'

const rootUrl = '/api/v1'

//                                  //
// Called by useTimeout in App.jsx  //
//                                  //

// function sendMessage
// Current complaints = all complaints where culprit_id = NULL or undefined
// Make API call to get these
// if current complaints > 0 then
//    sendQuestion()
// else send random question
export function sendMessage(token) {
  return request
    .get(`${rootUrl}/complaints/current`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      const currentComplaints = res.body
      if (currentComplaints.length > 0) {
        const complaint =
          currentComplaints[getRandomNumber(0, currentComplaints.length - 1)]
        sendComplaintQuestion(complaint, token)
      } else sendDecoyQuestion(token)
    })
}

// function sendRandomQuestion
// get any random question
// save message in Messages table
// leave complaint_id NULL
function sendDecoyQuestion(token) {
  return request
    .get(`${rootUrl}/questions`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      const questions = res.body
      const question = questions[getRandomNumber(0, questions.length - 1)]
      sendQuestionAsMessage({ question_id: question.id }, token)
    })
}

// send question from complaint
// function sendQuestion
// get question that has issue_id that matches the complaint.issue_id
// save message in Messages table
// save complaint_id in Messages
function sendComplaintQuestion(complaint, token) {
  return request
    .get(`${rootUrl}/questions/${complaint.id}`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      const questions = res.body
      const question = questions[getRandomNumber(0, questions.length - 1)]
      sendQuestionAsMessage(
        {
          question_id: question.id,
          complaint_id: complaint.id,
        },
        token
      )
    })
}

function sendQuestionAsMessage(message, token) {
  return request
    .post(`${rootUrl}/messages`)
    .set('authorization', `Bearer ${token}`)
    .send(message)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.error(err.message))
}

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

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getMessages(token) {
  return request
    .get(`${rootUrl}/messages`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      console.log(res)
      return res.body
    })
    .catch((err) => console.error(err.message))
}
