import request from 'superagent'

const rootUrl = '/api/v1'

export function getIssues() {
  return request.get(rootUrl + '/issues').then((res) => {
    return res.body
  })
}
