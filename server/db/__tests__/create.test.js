const knex = require('knex')
const config = require('../knexfile').test
const testDb = knex(config)

const db = require('../../db/dbIssues')

// not sure create is the best name for this file, seems to be testing dbIssues

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

describe('GET issues', () => {
  test('returns an array of ISSUES of the correct length from seeds', () => {
    return db.getIssues(testDb).then((issues) => {
      expect(issues).toHaveLength(4)
      return null
    })
  })
})
