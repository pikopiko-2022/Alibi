const request = require('supertest')
const server = require('../../server')

const { getQuestions, getQuestionsForIssue } = require('../../db/dbQuestions')
jest.mock('../../db/dbQuestions')

const mockQuestions = [
  { id: 1, issue_id: 1, question: `When did you last wash?` },
  { id: 2, issue_id: 1, question: `How clean are you?` },
]

describe('GET /api/v1/lifeG', () => {
  it('should return status 200 and the lifeG when database is successful.', () => {
    expect.assertions(2)
    getQuestions.mockReturnValue(Promise.resolve(mockQuestions))
    return request(server)
      .get('/api/v1/questions')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(mockQuestions).toEqual(res.body)
      })
  })
  it('should return status 500 and an error message when database fails.', () => {
    expect.assertions(2)
    getQuestions.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/questions')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
  it('should return status 200 and the lifeG by id when database is successful.', () => {
    expect.assertions(2)
    getQuestionsForIssue.mockReturnValue(
      Promise.resolve(mockQuestions[0].issue_id)
    )
    return request(server)
      .get('/api/v1/questions/:id')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.text).toBe('1')
      })
  })
  it('should return status 500 and an error message when database by id fails.', () => {
    expect.assertions(2)
    getQuestionsForIssue.mockImplementation(() =>
      Promise.reject(new Error('Something went wrong'))
    )
    return request(server)
      .get('/api/v1/questions/:id')
      .then((res) => {
        expect(res.status).toBe(500)
        expect(res.text).toContain('Something went wrong')
      })
  })
})
