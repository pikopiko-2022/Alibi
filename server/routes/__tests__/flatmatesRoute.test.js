const request = require('supertest')
const server = require('../../server')
const { getFlatmates } = require('../../db/dbFlatmates')

jest.mock('../../db/dbFlatmates')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

describe('GET /api/v1/flatmates', () => {
  it('returns all flatmates', () => {
    getFlatmates.mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          auth0_id: 1,
          flat_id: 1,
          name: 'Harry',
          description: 'lazy and selfish',
          img_seed: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
          rating: 5,
        },
        {
          id: 2,
          auth0_id: 2,
          flat_id: 1,
          name: 'Sally',
          description: 'lazy and selfish',
          img_seed: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
          rating: 5,
        },
      ])
    )
    return request(server)
      .get('/api/v1/flatmates')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[1].name).toBe('Sally')
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    getFlatmates.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/flatmates')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})
