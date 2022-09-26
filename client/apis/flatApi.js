import request from 'superagent'

const rootUrl = '/api/v1'

export function getFlatApi() {
  return request.get(`${rootUrl}/flat`).then((res) => {
    return res.body
  })
}
