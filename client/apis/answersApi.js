import request from 'superagent'

const rootUrl = '/api/v1'

export function getAnswersApi() {
  return request.get(`${rootUrl}/answers`).then((res) => {
    return res.body
  })
}

export function getAnswersByQuestionApi(questionID) {
  console.log(questionID)
  return request.get(`${rootUrl}/answers/${questionID}`).then((res) => {
    console.log(res.body)
    console.log('hi')
    return res.body
  })
}
