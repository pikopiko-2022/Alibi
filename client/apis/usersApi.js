import request from 'superagent'

const rootUrl = '/api/v1'

export function getUsersApi() {
  return request.get(`${rootUrl}/users`).then((res) => {
    console.log(res.body)
    return res.body
  })
}

export function getUserApi() {
  return request.get(`${rootUrl}/user`).then((res) => {
    return res.body
  })
}
