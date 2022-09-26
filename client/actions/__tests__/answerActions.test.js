import { SET_ANSWERS, fetchAnswers } from '../answers'
import { getAnswersApi } from '../../apis/answersApi'

jest.mock('../../apis/answersApi')

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

const fakeAnswer = [
  {
    id: 1,
    question_id: 1,
    answer: 'This morning at the gym',
    is_bad: 0,
    is_alibi: 1,
  },
  {
    id: 2,
    question_id: 1,
    answer: 'At Home watching TV',
    is_bad: 1,
    is_alibi: 0,
  },
]

describe('fetchAnswers', () => {
  it('dispatches SET_ANSWERS action', () => {
    getAnswersApi.mockReturnValue(Promise.resolve(fakeAnswer))
    return fetchAnswers()(fakeDispatch).then(() => {
      expect(fakeDispatch).toHaveBeenCalledWith({
        type: SET_ANSWERS,
        payload: fakeAnswer,
      })
    })
  })
  it('Should console.error() if request fails', () => {
    expect.assertions(1)
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
    getAnswersApi.mockImplementation(() =>
      Promise.reject(new Error('Api request Failed'))
    )
    return fetchAnswers()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('Api request Failled')
    })
  })
})
