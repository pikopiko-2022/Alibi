const knex = require('knex')
const config = require('../knexfile')
const testCon = knex(config.test)

const { getAllAnswers } = require('../dbAnswers')
// getAnswers, getAnswersForQuestions

beforeAll(() => {
  return testCon.migrate.latest()
})

beforeEach(() => {
  return testCon.seed.run()
})

afterAll(() => {
  testCon.destroy()
})

describe('getAllAnswers', () => {
  it('gets all of the answers', () => {
    return getAllAnswers(testCon).then((data) => {
      expect(data).toHaveLength(30)
    })
  })
})
