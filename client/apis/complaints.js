import request from 'superagent'

const rootUrl = '/api/v1'

export function createComplaint({ issue_id, complaint_raised_by, image }) {
  return request
    .get(rootUrl + '/complaints')
    .then((res) => {
      const url = res.body
      return request.put(url).send(image)
    })
    .then((res) => {
      const url = res?.req?.url?.split?.('?')?.[0]
      return request
        .post(rootUrl + '/complaints')
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

export function addCulpritToComplaint(complaintId, culpritId, token) {
  return request
    .put(`${rootUrl}/complaints/${complaintId}`)
    .set('authorization', `Bearer ${token}`)
    .send({ culpritId })
}
