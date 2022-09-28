const config = require('../knexfile')
const knex = require('knex')
const testCon = knex(config.test)

const {
  addUser,
  userExists,
  getUser,
  getUserIdByAuth0Id,
  updateUserScore,
  updateUserEnough,
} = require('../dbUsers.js')

beforeAll(() => testCon.migrate.latest())

beforeEach(() => testCon.seed.run())

afterAll(() => testCon.destroy())

const mockUser = [
  {
    flat_id: 1,
    name: 'Tester',
    description: 'Nuts about Testing',
    img_seed: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
  },
]

describe('addUser', () => {
  it('new user added to database', () => {
    return addUser(mockUser, testCon)
      .then(() => testCon('users').select())
      .then((users) => {
        expect(users).toHaveLength(3)
        expect(users[2]).toMatchObject({
          id: 3,
          auth0_id: null,
          flat_id: 1,
          name: 'Tester',
          description: 'Nuts about Testing',
          img_seed: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
          rating: 0,
          had_enough: 0,
        })
      })
  })
})

describe('userExists', () => {
  it('returns true if username exists in database', () => {
    return userExists('Gertrude', testCon).then((user) =>
      expect(user).toBeTruthy()
    )
  })
  it('returns false if username doess not exist in database', () => {
    return userExists('Bertha', testCon).then((user) =>
      expect(user).not.toBeTruthy()
    )
  })
})

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
  it('gets user by id', () => {
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

describe('updateUserEnough', () => {
  it('updates the users hadEnoguh property to true', () => {
    return updateUserEnough(1, testCon)
      .then(() => testCon('users').select())
      .then((users) => {
        expect(users[0]).toHaveProperty('had_enough', 1)
      })
  })
})
