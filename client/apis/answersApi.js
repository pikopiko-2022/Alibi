import request from 'superagent'

const rootUrl = '/api/v1'

export function getAnswersApi() {
  return request.get(`${rootUrl}/answers`).then((res) => {
    return res.body
  })
}

// /answers/${questionId}
