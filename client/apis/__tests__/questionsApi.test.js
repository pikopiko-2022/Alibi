import nock from 'nock'
import { getQuestionsApi, getQuestionsByIssueApi } from '../questionsApi'

describe('getQuestionsApi', () => {
  it('gets questions from local api', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/questions')
      .reply(200, JSON.stringify('When did you last shower?'), {
        'Content-Type': 'application/json',
      })
    return getQuestionsApi().then((result) => {
      expect(result).toContain('When')
      expect(scope.isDone()).toBe(true)
    })
  })
})
const issueID = 1

describe('getQuestionsByIssueApi', () => {
  it('returns questions by issueID', () => {
    const scope = nock('http://localhost')
      .get(`/api/v1/questions/${issueID}`)
      .reply(200, issueID)
    return getQuestionsByIssueApi(issueID).then((result) => {
      expect(result).toBe(1)
      expect(scope.isDone()).toBe(true)
    })
  })
})
