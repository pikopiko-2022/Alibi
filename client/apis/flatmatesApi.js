import request from 'superagent'

const rootUrl = '/api/v1'

export function getflatmatesApi(token) {
  return request
    .get(`${rootUrl}/flatmates`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
}
