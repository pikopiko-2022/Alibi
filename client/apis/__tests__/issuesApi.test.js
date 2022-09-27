import nock from 'nock'
import { getIssues } from '../issuesApi'

const mockIssues = [
  {
    id: 2,
    name: `Testing Dishes in the sink`,
    details: `Testing I can't make dinner because you used my favourite pan`,
  },
  {
    id: 3,
    name: `Testing Why is the power bill so high`,
    details: `Testing I can't afford avocados because you won't wear socks`,
  },
]
describe('GET /api/v1/issues', () => {
  it('returns all issues', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/issues')
      .reply(200, JSON.stringify(mockIssues), {
        'Content-Type': 'application/json',
      })
    return getIssues().then((result) => {
      expect(result).toStrictEqual(mockIssues)
      expect(scope.isDone()).toBe(true)
    })
  })
})
