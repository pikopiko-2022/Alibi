const request = require('supertest')
const server = require('../../server')

const {
  getAllAnswers,
  getAnswers,
  getAnswersForQuestions,
} = require('../../db/dbAnswers')

jest.mock('../../db/dbAnswers')

describe('GET /api/v1/answers', () => {
  it('retrieves all answers from database', () => {
    const fakeAnswer = [
      {
        id: 3,
        question_id: 1,
        answer: 'This morning at the gym',
        is_bad: 0,
        is_alibi: 1,
      },
      { id: 4, question_id: 1, answer: 'Last night', is_bad: 0, is_alibi: 0 },
      { id: 5, question_id: 2, answer: 'Squeaky', is_bad: 1, is_alibi: 0 },
    ]

    getAllAnswers.mockReturnValue(Promise.resolve(fakeAnswer[0]))

    return request(server)
      .get('/api/v1/answers')
      .then((res) => {
        expect(res.body.answer).toContain('This morning at the gym')
      })
  })
})

describe('GET answers for questions used', () => {
  it('retrieves answers that correspond to the correct question id', () => {
    const fakeQuestionId = 1
    const fakeAnswersforQuestion = [
      {
        id: 3,
        question_id: 1,
        answer: 'This morning at the gym',
        is_bad: 0,
        is_alibi: 1,
      },
      { id: 4, question_id: 1, answer: 'Last night', is_bad: 0, is_alibi: 0 },
      { id: 5, question_id: 2, answer: 'Squeaky', is_bad: 1, is_alibi: 0 },
    ]

    getAnswers.mockReturnValue(Promise.resolve(fakeAnswersforQuestion))

    return request(server)
      .get(`/api/v1/answers/${fakeQuestionId}`)
      .then((res) => {
        expect(res.body).toHaveLength(3)
        expect(res.body[1].answer).toContain('Last night')
      })
  })
})
