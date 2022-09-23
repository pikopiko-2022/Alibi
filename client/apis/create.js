import request from 'superagent'

const rootUrl = '/api/v1'

export function createComplaint({ image }) {
  return request
    .get(rootUrl + '/create')
    .then((res) => {
      console.log(res)
      const url = res.body
      console.log(url)
      console.log(image)
      return request.put(url).send(image)
    })
    .then((res) => {
      const url = res?.req?.url?.split?.('?')?.[0]
      console.log(url)
      return request.post(rootUrl + '/create').send({ url })
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
