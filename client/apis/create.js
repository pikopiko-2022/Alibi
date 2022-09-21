import request from 'superagent'

const rootUrl = '/api/v1'

export function createComplaint({ image }) {
  return request
    .get(rootUrl + '/create')
    .then((res) => {
      const url = res.body
      return request.put(url).send(image)
    })
    .then((res) => {
      const url = res?.req?.url?.split?.('?')?.[0]
      return request.post(rootUrl + '/create').send({ url })
    })
    .then((res) => {
      return res.text
    })
    .catch((err) => {
      console.error(err.message)
    })
}
