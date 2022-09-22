import request from 'superagent'

const rootUrl = '/api/v1'

export function getLifeGApi() {
  return request.get(`${rootUrl}/lifeG`).then((res) => {
    console.log(res.body)
    return res.body
  })
}
