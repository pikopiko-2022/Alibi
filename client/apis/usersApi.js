import request from 'superagent'

const rootUrl = '/api/v1'

export function getUsersApi(token) {
  return request
    .get(`${rootUrl}/users`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log(res.body)
      return res.body
    })
}
