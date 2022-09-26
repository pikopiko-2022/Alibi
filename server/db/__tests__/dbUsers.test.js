const config = require('../knexfile')
const knex = require('knex')
const testCon = knex(config.test)

const {
  updateUserScore,
  getUser,
  getUserIdByAuth0Id,
} = require('../dbUsers.js')

beforeAll(() => testCon.migrate.latest())

beforeEach(() => testCon.seed.run())

afterAll(() => testCon.destroy())

describe('test updateUserScore', () => {
  it('doesnt alter users rating if score is zero', () => {
    return updateUserScore(1, 0, testCon)
      .then(() => getUser(1, testCon))
      .then((user) => {
        expect(user.rating).toBe(5)
      })
  })
  it('adds to users rating if score is positive', () => {
    return updateUserScore(1, 1, testCon)
      .then(() => getUser(1, testCon))
      .then((user) => {
        expect(user.rating).toBe(6)
      })
  })
  it('subtracts from users rating if score is negative', () => {
    return updateUserScore(1, -1, testCon)
      .then(() => getUser(1, testCon))
      .then((user) => {
        expect(user.rating).toBe(4)
      })
  })
})

describe('getUser', () => {
  it('gets user based on auth0id', () => {
    return getUser(1, testCon).then((user) => {
      expect(user.id).toBe(1)
      expect(user.name).toBe('Gertrude')
    })
  })
})

describe('getUserIdByAuth0Id', () => {
  it('gets the user id based on auth0id', () => {
    return getUserIdByAuth0Id(1, testCon).then((res) =>
      expect(res.userId).toBe(1)
    )
  })
})
