const request = require('supertest')
const server = require('../server')
const { getUsers } = require('../db/dbUsers.js')

jest.mock('../db/dbUsers.js')

jest.spyOn(console, 'error')
afterEach(() => {
  console.error.mockReset()
})

describe('GET /api/v1/users', () => {
  it('returns all users', () => {
    getUsers.mockReturnValue(
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
    return request
      .agent(server)
      .get('api/v1/users')
      .then((res) => {
        expect(res.body.users).toHaveLength(2)
        expect(res.body.users[1].name).toBe('Sally')
      })
  })
})
