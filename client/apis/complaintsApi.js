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

export function getAllComplaints() {
  return request.get(`${rootUrl}/complaints/all`).then((res) => {
    return res.body
  })
}

export function getComplaintCount() {
  return request.get(`${rootUrl}/complaints/count`).then((res) => {
    return res.body
  })
}

export function getComplaintsForUserCulprit(token) {
  console.log('getting complaints')
  return request
    .get(`${rootUrl}/complaints/culprit`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => {
      return res.body
    })
    .catch((err) => console.error(err.message))
}
