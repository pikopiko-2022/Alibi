import {
  updateLoggedInUser,
  UPDATE_LOGGED_IN_USER,
  clearLoggedInUser,
  CLEAR_LOGGED_IN_USER,
  fetchUser,
  updateUserScore,
  updateUserEnough,
} from '../user'

import { getUser, addUserScore, addUserEnough } from '../../apis/userApi'

const mockUserToSave = {
  id: 1,
  auth0_id: 1,
  flat_id: 1,
  name: 'Gertrude',
  description: 'lazy and selfish',
  img_seed: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
  rating: 5,
  had_enough: false,
}

const mockScore = 1

jest.mock('../../apis/userApi')

jest.spyOn(console, 'error')

getUser.mockReturnValue(Promise.resolve(mockUserToSave))
addUserScore.mockReturnValue(Promise.resolve(mockScore))
addUserEnough.mockReturnValue(Promise.resolve())

const fakeDispatch = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

describe('updateLoggedInUser', () => {
  it('sets the logged in user to be the user', () => {
    expect(updateLoggedInUser(mockUserToSave).type).toBe(UPDATE_LOGGED_IN_USER)
    expect(updateLoggedInUser(mockUserToSave).payload).toBe(mockUserToSave)
  })
  it('dispatches after api call', () => {
    return updateUserScore(mockScore)(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(UPDATE_LOGGED_IN_USER)
      expect(fakeDispatchAction.payload).toEqual(mockUserToSave)
    })
  })
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    addUserScore.mockImplementation(() => Promise.reject(new Error('error')))
    return updateUserScore()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
  it('updateUserEnough should updateLoggedInUser after api call', () => {
    return updateUserEnough()(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(UPDATE_LOGGED_IN_USER)
      expect(fakeDispatchAction.payload).toEqual(mockUserToSave)
    })
  })
  it('Should console.error if fails', () => {
    console.error.mockImplementation(() => {})
    addUserEnough.mockImplementation(() => Promise.reject(new Error('error')))
    return updateUserEnough()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})

describe('clearLoggedInUser', () => {
  it('clears the logged in user', () => {
    expect(clearLoggedInUser().type).toBe(CLEAR_LOGGED_IN_USER)
  })
})

describe('fetchUser', () => {
  it('dispatches updateLoggedInUser after api call', () => {
    return fetchUser()(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(UPDATE_LOGGED_IN_USER)
      expect(fakeDispatchAction.payload).toBe(mockUserToSave)
    })
  })
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    getUser.mockImplementation(() => Promise.reject(new Error('error')))
    return fetchUser()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})
