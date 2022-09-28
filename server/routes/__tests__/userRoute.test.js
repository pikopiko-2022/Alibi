const request = require('supertest')
const server = require('../../server')
const checkJwt = require('../../auth0')
const {
  getUserIdByAuth0Id,
  getUser,
  addUser,
  userExists,
  updateUserScore,
  updateUserEnough,
} = require('../../db/dbUsers')

jest.mock('../../db/dbUsers')
jest.mock('../../auth0')

jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
  jest.clearAllMocks()
})

const emit = jest.fn()

checkJwt.mockImplementation((req, res, next) => {
  req.user = { sub: '1' }
  req.io = { emit }
  next()
})

getUser.mockReturnValue(Promise.resolve({ id: 1, name: 'Fred' }))
getUserIdByAuth0Id.mockReturnValue(Promise.resolve(1))
userExists.mockReturnValue(Promise.resolve(false))
updateUserScore.mockReturnValue(Promise.resolve(1))
addUser.mockReturnValue(Promise.resolve([3]))

describe('GET /api/v1/user', () => {
  it('returns current user', () => {
    return request(server)
      .get('/api/v1/user')
      .then((res) => {
        expect(res.body.name).toBe('Fred')
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    getUser.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/user')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})

describe('PUT /api/v1/user', () => {
  it('updates the user score and fires emit to let the other users know', () => {
    return request(server)
      .put('/api/v1/user')
      .send({ score: -1 })
      .then((res) => {
        expect(res.body).toBe(1)
        expect(emit).toHaveBeenCalledTimes(1)
        expect(emit).toHaveBeenCalledWith('users updated')
      })
  })
  it('updates culprit for a complaint', () => {
    return request(server)
      .put('/api/v1/user/enough')
      .send({ userId: 1 })
      .then(() => {
        //fix res
        expect(emit).toHaveBeenCalledWith('users updated')
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    updateUserScore.mockImplementation(() =>
      Promise.reject(new Error('This not working'))
    )
    return request(server)
      .put('/api/v1/user')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('This not working')
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    updateUserEnough.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .put('/api/v1/user/enough')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})

describe('POST /api/v1/user', () => {
  it('creates a new user and sends back the id of the new user, and broadcasts to all other users', () => {
    return request(server)
      .post(`/api/v1/user`)
      .send({
        name: 'Fred',
        flatId: '1',
        description: 'Likes potatoes',
        img_seed: '14',
      })
      .then((res) => {
        expect(res.body).toBe(3)
        expect(emit).toHaveBeenCalledTimes(1)
        expect(emit).toHaveBeenCalledWith('users updated')
      })
  })
  it('should return status 403 when username is taken', () => {
    userExists.mockImplementation(() =>
      Promise.reject(new Error('Username Taken'))
    )
    return request(server)
      .post('/api/v1/user')
      .then((res) => {
        expect(res.status).toBe(403)
        expect(res.text).toContain('Username Taken')
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    userExists.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .post('/api/v1/user')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})
