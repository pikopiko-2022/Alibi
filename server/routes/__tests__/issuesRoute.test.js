const request = require('supertest')
const server = require('../../server')

const { getIssues } = require('../../db/dbIssues')
jest.mock('../../db/dbIssues')

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
  it('should return status 200 and the flat when database is successful.', () => {
    expect.assertions(2)
    getIssues.mockReturnValue(Promise.resolve(mockIssues))
    return request(server)
      .get('/api/v1/issues')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(mockIssues).toEqual(res.body)
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    getIssues.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/issues')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})
