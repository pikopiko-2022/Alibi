import request from 'superagent'

const rootUrl = '/api/v1'

export function sendMessage(token) {
  return request
    .get(`${rootUrl}/complaints/current`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      const currentComplaints = res.body
      console.log(currentComplaints)
      if (currentComplaints.length > 0) {
        const complaint =
          currentComplaints[getRandomNumber(0, currentComplaints.length - 1)]
        return sendComplaintQuestion(complaint, token)
      } else return sendDecoyQuestion(token)
    })
}

function sendDecoyQuestion(token) {
  return request
    .get(`${rootUrl}/questions`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      const questions = res.body
      const question = questions[getRandomNumber(0, questions.length - 1)]
      return sendQuestionAsMessage({ question_id: question.id }, token)
    })
}

function sendComplaintQuestion(complaint, token) {
  return request
    .get(`${rootUrl}/questions/${complaint.issue_id}`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      const questions = res.body
      const question = getRandomQuestion(questions)
      return sendQuestionAsMessage(
        {
          question_id: question.id,
          complaint_id: complaint.id,
        },
        token
      )
    })
}

function getRandomQuestion(questionArray) {
  return questionArray[Math.floor(Math.random() * questionArray.length)]
}

function sendQuestionAsMessage(message, token) {
  return request
    .post(`${rootUrl}/messages`)
    .set('authorization', `Bearer ${token}`)
    .send(message)
    .then((res) => {
      const messages = res.body
      return messages
    })
    .catch((err) => console.error(err.message))
}

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getMessages(token) {
  return request
    .get(`${rootUrl}/messages`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err.message))
}

export function addAnswerToMessage(messageId, answerId, token) {
  return request
    .put(`${rootUrl}/messages/${messageId}`)
    .set('authorization', `Bearer ${token}`)
    .send({ answerId })
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err.message))
}

export function getLifeGforIssueApi(issueId, token) {
  return request
    .get(`${rootUrl}/lifeG/issue/${issueId}`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      const lifeG = res.body[0]
      return sendLifeGAsMessage({
        life_guidance_id: lifeG.id,
      })
    })
    .catch((err) => console.error(err.message))
}

function sendLifeGAsMessage(message, token) {
  return request
    .post(`${rootUrl}/messages`)
    .set('authorization', `Bearer ${token}`)
    .send(message)
    .then((res) => {
      const messages = res.body
      return messages
    })
    .catch((err) => console.error(err.message))
}
