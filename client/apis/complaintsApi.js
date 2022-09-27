import request from 'superagent'

const rootUrl = '/api/v1'

export function createComplaint(
  { issue_id, complaint_raised_by, image },
  token
) {
  return request
    .get(rootUrl + '/imageUrl')
    .then((res) => {
      const url = res.body
      return request.put(url).send(image)
    })
    .then((res) => {
      const url = res?.req?.url?.split?.('?')?.[0]
      return request
        .post(rootUrl + '/complaints')
        .set('Authorization', `Bearer ${token}`)
        .send({ issue_id, complaint_raised_by, image: url })
    })
    .then((res) => {
      return res.text
    })
    .catch((err) => {
      console.error(err.message)
    })
}

export function addCulpritToComplaint(complaintId, token) {
  return request
    .put(`${rootUrl}/complaints/${complaintId}`)
    .set('authorization', `Bearer ${token}`)
}

export function getComplaintsForUserCulprit(token) {
  return request
    .get(`${rootUrl}/complaints/user`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err.message))
}
