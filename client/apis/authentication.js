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
  return request
    .post(`${rootUrl}/registration`)
    .set('Authorization', `Bearer ${token}`)
    .send(user)
    .catch((err) => console.error(err.message))
}

export function addUserScore(score, token) {
  return request
    .put(`${rootUrl}/user`)
    .set('Authorization', `Bearer ${token}`)
    .send({ score })
    .then((res) => {
      console.log(res)
      return res.body
    })
    .catch((err) => console.error(err.message))
}