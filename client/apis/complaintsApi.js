import request from 'superagent'

const rootUrl = '/api/v1'

export function createComplaint(
  { issue_id, complaint_raised_by, image },
  token
) {
  return request
    .get(rootUrl + '/create') //create route could probably be better named
    .then((res) => {
      const url = res.body
      console.log(url) //remove debugging code
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
      console.log(res.text) //remove debugging code
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
