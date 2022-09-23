import request from 'superagent'

const rootUrl = '/api/v1'

export function getUser(token) {
  return request
    .get(`${rootUrl}/registration`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch(() => {
      console.log('err')
    })
}

export function newUser(user, token) {
  return request
    .post(`${rootUrl}/registration`)
    .set('Authorization', `Bearer ${token}`)
    .send(user)
    .catch(() => {
      console.log('err')
    })
}
