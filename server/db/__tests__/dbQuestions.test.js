const knex = require('knex')
const config = require('../knexfile')
const testCon = knex(config.test)

const { getQuestions, getQuestionsForIssue } = require('../dbQuestions')
const { compilation } = require('webpack')

beforeAll(() => {
  return testCon.migrate.latest()
})

beforeEach(() => {
  return testCon.seed.run()
})

afterAll(() => {
  testCon.destroy()
})

describe('getQuestions', () => {
  it('get all questions', () => {
    return getQuestions(testCon).then((complaints) => {
      expect(complaints).toHaveLength(11)
      expect(complaints[0]).toMatchObject({
        id: 1,
        issue_id: 1,
        question: 'When did you last wash?',
      })
    })
  })
})

describe('getQuestionsForIssue', () => {
  it('get all questions by issue_id', () => {
    return getQuestionsForIssue(1, testCon).then((questions) => {
      expect(questions).toHaveLength(5)
      expect(questions[3]).toMatchObject({
        id: 4,
        issue_id: 1,
        question: 'Have you come up with any random ideas lately?',
      })
    })
  })
})
