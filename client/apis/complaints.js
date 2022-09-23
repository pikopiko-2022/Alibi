import request from 'superagent'

const rootUrl = '/api/v1'

export function updateCulprit(culprit_id) {
  return request.put(rootUrl + '/create/complaints').send(culprit_id)
}
