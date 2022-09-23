import request from 'superagent'

const rootUrl = '/api/v1'

export function getQuestionsApi(token) {
  return request
    .get(`${rootUrl}/questions`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      console.log(res.body)
      return res.body
    })
}
