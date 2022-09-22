import request from 'superagent'

const rootUrl = '/api/v1'

export function getQuestionsApi() {
  return request.get(`${rootUrl}/questions`).then((res) => {
    console.log(res.body)
    return res.body
  })
}
