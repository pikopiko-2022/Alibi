import nock from 'nock'
import { getAnswersApi } from '../answersApi'

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
