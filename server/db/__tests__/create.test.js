const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)

const db = require('../../db/create.js')

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('GET issues', () => {
  test('returns an array of ISSUES of the correct length from seeds', () => {
    return db.getIssues(testDb).then((issues) => {
      expect(issues).toHaveLength(3)
      return null
    })
  })
})
