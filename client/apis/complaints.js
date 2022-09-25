import request from 'superagent'

const rootUrl = '/api/v1'

// export function updateCulprit(culprit_id) {
//   return request.put(rootUrl + '/create/complaints').send(culprit_id)
// }

export function addCulpritToComplaint(complaintId, culprit_id, token) {
  return request
    .put(`${rootUrl}/complaints/${complaintId}`)
    .set('authorization', `Bearer ${token}`)
    .send({ culprit_id })
}
