import request from 'superagent'

const rootUrl = '/api/v1'

// TODO move issues routes to their own route rather than being inside create
// is this TODO stale?
export function getIssues() {
  return request.get(rootUrl + '/issues').then((res) => {
    return res.body
  })
}
