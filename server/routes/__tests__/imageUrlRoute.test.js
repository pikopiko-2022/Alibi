const request = require('supertest')
const server = require('../../server')
// const { addFood } = require('../../db/create')
const { getSignedPutUrl } = require('../lib')

jest.mock('../lib')
// jest.mock('../../db/create')
jest.spyOn(console, 'error')

getSignedPutUrl.mockReturnValue(Promise.resolve('alibi-alibi'))

afterEach(() => console.error.mockReset())

describe('GET /api/v1/imageUrl', () => {
  it('returns a signedUrl from AWS', () => {
    return request(server)
      .get('/api/v1/imageUrl')
      .then((res) => {
        expect(res.body).toContain('alibi-alibi')
        return null
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    getSignedPutUrl.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/imageUrl')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})
