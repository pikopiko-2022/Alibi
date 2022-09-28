const knex = require('knex')
const config = require('../knexfile')
const testCon = knex(config.test)

const { getAllAnswers, getAnswers } = require('../dbAnswers')
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

describe('getAnswers', () => {
  it('gets all answers by question id', () => {
    return getAnswers(1, testCon).then((data) => {
      expect(data).toHaveLength(4)
      expect(data[0].answer).toContain('10 minutes')
      expect(data[1].question_id).not.toBe(2)
    })
  })
})
