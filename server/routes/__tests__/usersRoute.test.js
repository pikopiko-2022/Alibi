const request = require('supertest')
const server = require('../../server')
const { getFlatmates } = require('../../db/dbFlatmates')
const checkJwt = require('../../auth0')

jest.mock('../../db/dbFlatmates')
jest.mock('../../auth0')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
})

checkJwt.mockImplementation((req, res, next) => {
  req.user = { sub: '1' }
  next()
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
          img_url: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
          rating: 5,
        },
        {
          id: 2,
          auth0_id: 2,
          flat_id: 1,
          name: 'Sally',
          description: 'lazy and selfish',
          img_url: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
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
})
