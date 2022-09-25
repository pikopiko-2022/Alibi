import request from 'superagent'

const rootUrl = '/api/v1'

export function getFlatsApi() {
  return request.get(`${rootUrl}/flats`).then((res) => {
    return res.body
  })
}
