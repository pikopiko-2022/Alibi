import { setQuestions, fetchQuestions, SET_QUESTIONS } from '../questions'

import { getQuestionsApi } from '../../apis/questionsApi'

jest.mock('../../apis/questionsApi')

jest.spyOn(console, 'error')

const mockQuestions = [
  { id: 1, issue_id: 1, question: `When did you last wash?` },
  { id: 2, issue_id: 1, question: `How clean are you?` },
]

getQuestionsApi.mockReturnValue(Promise.resolve(mockQuestions))

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('setQuestions', () => {
  it('sets the questions to be the questions', () => {
    expect(setQuestions(mockQuestions).type).toBe(SET_QUESTIONS)
    expect(setQuestions(mockQuestions).payload).toBe(mockQuestions)
  })
})

describe('fetchQuestions', () => {
  it('dispatches fetchQuestions after api call', () => {
    return fetchQuestions(mockQuestions)(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(SET_QUESTIONS)
      expect(fakeDispatchAction.payload).toEqual(mockQuestions)
    })
  })
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    getQuestionsApi.mockImplementation(() => Promise.reject(new Error('error')))
    return fetchQuestions()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})
