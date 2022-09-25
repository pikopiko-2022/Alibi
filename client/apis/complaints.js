import request from 'superagent'

const rootUrl = '/api/v1'

// export function updateCulprit(culprit_id) {
//   return request.put(rootUrl + '/create/complaints').send(culprit_id)
// }

export function addCulpritToComplaint(complaintId, culpritId, token) {
  return request
    .put(`${rootUrl}/create/complaints/${complaintId}`)
    .set('authorization', `Bearer ${token}`)
    .send({ culpritId })
}
