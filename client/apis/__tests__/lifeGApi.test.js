import nock from 'nock'
import { getLifeGApi } from '../lifeGApi'

const mockLifeG = [
  {
    id: 1,
    issue_id: 1,
    message: "Here's a handy timer",
    url: 'https://www.timerminutes.com/7-minutes-timer',
  },
  {
    id: 2,
    issue_id: 2,
    message: 'How to hand-wash dishes',
    url: 'https://www.livingonadime.com/hand-wash-dishes/#:~:text=How%20To%20Hand%20Wash%20Dishes%20Rinse%20dishes%20and,%28or%20more%20if%20you%20have%20a%20large%20sink%29.',
  },
]
describe('GET /api/v1/lifeG', () => {
  it('returns all lifeG', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/lifeG')
      .reply(200, JSON.stringify(mockLifeG), {
        'Content-Type': 'application/json',
      })
    return getLifeGApi().then((result) => {
      expect(result).toStrictEqual(mockLifeG)
      expect(scope.isDone()).toBe(true)
    })
  })
})
