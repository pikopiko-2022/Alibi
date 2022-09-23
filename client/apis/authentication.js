import request from 'superagent'

const rootUrl = '/api/v1'

export function getUser(token) {
  return request
    .get(`${rootUrl}/user`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch((err) => console.error(err.message))
}

export function newUser(user, token) {
  console.log('NewUser', user)
  return request
    .post(`${rootUrl}/registration`)
    .set('Authorization', `Bearer ${token}`)
    .send(user)
    .catch((err) => console.error(err.message))
}
