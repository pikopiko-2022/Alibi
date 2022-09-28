const request = require('supertest')
const server = require('../../server')

const { getFlat } = require('../../db/dbFlat')
jest.mock('../../db/dbFlat')

const mockFlat = {
  id: 1,
  name: "The cool kids' pad",
  address: '5 Victoria Court',
  date_established: '2022-09-25 21:51:38',
  date_disolved: null,
}

describe('GET /api/v1/flat', () => {
  it('should return status 200 and the flat when database is successful.', () => {
    expect.assertions(2)
    getFlat.mockReturnValue(Promise.resolve(mockFlat))
    return request(server)
      .get('/api/v1/flat')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(mockFlat).toEqual(res.body)
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    getFlat.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/flat')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})
