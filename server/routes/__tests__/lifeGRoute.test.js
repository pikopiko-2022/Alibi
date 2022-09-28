const request = require('supertest')
const server = require('../../server')

const { getLifeG, getLifeGforIssue } = require('../../db/dbLifeG')
jest.mock('../../db/dbLifeG')

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
  it('should return status 200 and the lifeG when database is successful.', () => {
    expect.assertions(2)
    getLifeG.mockReturnValue(Promise.resolve(mockLifeG))
    return request(server)
      .get('/api/v1/lifeG')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(mockLifeG).toEqual(res.body)
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    getLifeG.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/lifeG')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
  it('should return status 200 and the lifeG by id when database is successful.', () => {
    expect.assertions(2)
    getLifeGforIssue.mockReturnValue(Promise.resolve(mockLifeG[0].issue_id))
    return request(server)
      .get('/api/v1/lifeG/issue/:id')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.text).toBe('1')
      })
  })
  it('should return status 500 and an error message when database by id fails.', () => {
    expect.assertions(2)
    getLifeGforIssue.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/lifeG/issue/:id')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})
