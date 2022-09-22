const request = require('supertest')
const server = require('../../server')
const { getUsers } = require('../../db/dbUsers')
// const { newUser } = require('../../../client/apis/authentication')

jest.mock('../../db/dbUsers')

jest.spyOn(console, 'error')
afterEach(() => {
  console.error.mockReset()
})

describe('GET /api/v1/registration', () => {
  it('Get Users from database', () => {
    const fakeUser = [
      {
        id: 1,
        auth0_id: 1,
        flat_id: 1,
        name: 'Holloway',
        description: 'lazy and boring',
        img_url: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
        rating: 2,
      },
    ]

    getUsers.mockReturnValue(Promise.resolve(fakeUser))

    return request(server)
      .get('/api/v1/registration')
      .then((res) => {
        console.log(res.body)
        expect(res.body[0].name).toBe('Holloway')
      })
  })
})
