import nock from 'nock'
import { getAnswersApi, getAnswersByQuestionApi } from '../answersApi'

const questionID = 1

describe('getAnswersApi', () => {
  it('returns all answers', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/answers')
      .reply(200, JSON.stringify('I had a shower two hours ago'), {
        'Content-Type': 'application/json',
      })
    return getAnswersApi().then((result) => {
      expect(result).toContain('shower')
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('getAnswersByQuestionApi', () => {
  it('returns all answers', () => {
    const scope = nock('http://localhost')
      .get(`/api/v1/answers/${questionID}`)
      .reply(200, questionID)
    return getAnswersByQuestionApi(questionID).then((result) => {
      expect(result).toBe(1)
      expect(scope.isDone()).toBe(true)
    })
  })
})
