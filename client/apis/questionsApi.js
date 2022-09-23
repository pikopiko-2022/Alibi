import request from 'superagent'

const rootUrl = '/api/v1'

export function getQuestionsApi() {
  return request.get(`${rootUrl}/questions`).then((res) => {
    console.log(res.body)
    return res.body
  })
}

const issueID = 1
export function getQuestionsByIssueApi() {
  return request.get(`${rootUrl}/questions/${issueID}`).then((res) => {
    console.log(res.body)
    return res.body
  })
}
// not sure if to pass issueID into ApiClient?

//get question by issue_id, relate to user id
