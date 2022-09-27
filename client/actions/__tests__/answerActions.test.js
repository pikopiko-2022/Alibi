import { SET_ANSWERS, fetchAnswers, updateCulprit } from '../answers'
import { getAnswersApi } from '../../apis/answersApi'
import { addCulpritToComplaint } from '../../apis/complaintsApi'

jest.mock('../../apis/answersApi')
jest.mock('../../apis/complaintsApi')

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
  it('Should console.error if request fails', () => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
    getAnswersApi.mockImplementation(() =>
      Promise.reject(new Error('Api request Failed'))
    )
    return fetchAnswers()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('Api request Failed')
    })
  })
})

const complaintId = 1
describe('updateCulprit', () => {
  it('dispatches SET_ANSWERS action after updateCulprit', () => {
    addCulpritToComplaint.mockReturnValue(Promise.resolve(complaintId))
    return updateCulprit(complaintId)(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(SET_ANSWERS)
      // expect(fakeDispatchAction.payload).toEqual(fakeAnswer)
    })
  })
  it('Should console.error if request fails', () => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
    getAnswersApi.mockImplementation(() =>
      Promise.reject(new Error('Api request Failed'))
    )
    return fetchAnswers()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('Api request Failed')
    })
  })
})
