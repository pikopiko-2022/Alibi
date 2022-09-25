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

//getIssue
export function getIssues() {
  return request.get(rootUrl + '/create/issues').then((res) => {
    return res.body
  })
}

//sendComplaint
export function sendComplaint(complaint) {
  console.log(complaint)
  return request.post(rootUrl + '/create/complaints').send(complaint)
}
//getQuestions
// export function getQuestions() {
//   return request.get(rootUrl + '/create/issues/:id').then((res) => {
//     return res.body
//   })
// }
