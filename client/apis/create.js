import request from 'superagent'

const rootUrl = '/api/v1'

export function createComplaint({ name, description, image }) {
  return request
    .get(rootUrl + '/create')
    .then((res) => {
      const url = res.body
      return request.put(url).send(image)
    })
    .then((res) => {
      // https://aws.com?expiry=34587389&key=345879689
      const url = res?.req?.url?.split?.('?')?.[0]
      return request.post(rootUrl + '/create').send({ name, description, url })
    })
    .then((res) => {
      return res.body
    })
    .catch((err) => {
      console.error(err.message)
    })
}
