const config = require('../knexfile')
const knex = require('knex')
const testCon = knex(config.test)

const { getUsers } = require('../dbUsers.js')

beforeAll(() => testCon.migrate.latest())

beforeEach(() => testCon.seed.run())

describe('test getUsers', () => {
  it('returns all records in users table', () => {
    return getUsers(testCon).then((data) => {
      expect(data).toHaveLength(2)
    })
  })
})
