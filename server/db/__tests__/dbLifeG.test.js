const config = require('../knexfile')
const knex = require('knex')
const testCon = knex(config.test)

const { getLifeG, getLifeGforIssue } = require('../dbLifeG')

beforeAll(() => testCon.migrate.latest())

beforeEach(() => testCon.seed.run())

afterAll(() => testCon.destroy())

describe('getLifeG', () => {
  it('gets life guidance advice objects', () => {
    return getLifeG(testCon).then((advice) => {
      expect(advice[0]).toMatchObject({
        id: 1,
        issue_id: 1,
        message: "Here's a handy timer",
        url: 'https://www.timerminutes.com/7-minutes-timer',
      })
      expect(advice).toHaveLength(3)
    })
  })
})
describe('getLifeGforIssue', () => {
  it('gets life guidance relevant to issue', () => {
    return getLifeGforIssue(1, testCon).then((advice) => {
      expect(advice[0]).toMatchObject({
        id: 1,
        issue_id: 1,
        message: "Here's a handy timer",
        url: 'https://www.timerminutes.com/7-minutes-timer',
      })
      expect(advice).toHaveLength(1)
      expect(advice[0]).not.toHaveProperty('issue_id', !1)
    })
  })
})
