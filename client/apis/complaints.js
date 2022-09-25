import request from 'superagent'

const rootUrl = '/api/v1'

export function createComplaint({ issue_id, complaint_raised_by, image }) {
  return request
    .get(rootUrl + '/create')
    .then((res) => {
      const url = res.body
      return request.put(url).send(image)
    })
    .then((res) => {
      const url = res?.req?.url?.split?.('?')?.[0]
      return request
        .post(rootUrl + '/create/complaints')
        .send({ issue_id, complaint_raised_by, image: url })
    })
    .then((res) => {
      console.log(res.text)
      return res.text
    })
    .catch((err) => {
      console.error(err.message)
    })
}

export function sendComplaint(complaint) {
  console.log(complaint)
  return request.post(rootUrl + '/complaints').send(complaint)
}

export function addCulpritToComplaint(complaintId, culpritId, token) {
  return request
    .put(`${rootUrl}/create/complaints/${complaintId}`)
    .set('authorization', `Bearer ${token}`)
    .send({ culpritId })
}
