const request = require('supertest')
const server = require('../../server')
const { getUsers, addUser, userExists } = require('../../db/dbUsers')
const checkJwt = require('../../auth0')
// const { newUser } = require('../../../client/apis/authentication')

jest.mock('../../db/dbUsers')
jest.mock('../../auth0')

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
      {
        id: 1,
        auth0_id: 2,
        flat_id: 1,
        name: 'Barty',
        description: 'Energetic and clean',
        img_url:
          'https://imageresizer.static9.net.au/FUR-nf6ZUQBmQ_sBZvb3nRpSy58=/400x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F06d1a684-e25e-47e9-98ce-9b18323a0f0e',
        rating: 5,
      },
    ]

    getUsers.mockReturnValue(Promise.resolve(fakeUser))

    expect.assertions(3)

    return request(server)
      .get('/api/v1/registration')
      .then((res) => {
        expect(res.body[0].name).toBe('Holloway'),
          expect(res.body).toHaveLength(2),
          expect(res.body[0].description).toContain('lazy')
      })
  })
})

checkJwt.mockImplementation((req, res, next) => {
  req.user = { sub: '1' }
  next()
})

describe('POST /api/v1/registration', () => {
  it('Post new user to database', () => {
    addUser.mockImplementation(() => Promise.resolve(true))

    return request(server)
      .post('/api/v1/registration')
      .send({
        flat_id: '1',
        name: 'Homer',
      })
      .then((res) => {
        expect(res.body).toBeTruthy()
        return null
      })
  })

  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    userExists.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .post('/api/v1/registration')
      .then((res) => {
        console.log(res)
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})