import { UPDATE_LOGGED_IN_USER, CLEAR_LOGGED_IN_USER } from '../../actions/user'

import user from '../user'

const mockUser = {
  auth0Id: 'Test',
  username: 'Test',
  flat_Id: 'Test',
  img_url: 'Test',
  description: 'Test',
}

const emptyUser = {
  auth0Id: '',
  username: '',
  flat_Id: '',
  img_url: '',
  description: '',
}

describe('user reducer', () => {
  it('returns user payload for the type UPDATE_LOGGED_IN_USER', () => {
    // expect.assertions(2)
    const action = {
      type: UPDATE_LOGGED_IN_USER,
      payload: mockUser,
    }
    const expectedState = mockUser
    const outputState = user(emptyUser, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).not.toEqual(emptyUser)
  })
  it('returns user payload for the type CLEAR_LOGGED_IN_USER', () => {
    expect.assertions(2)
    const action = {
      type: CLEAR_LOGGED_IN_USER,
      payload: emptyUser,
    }
    const expectedState = emptyUser
    const outputState = user(emptyUser, action)
    expect(outputState).toEqual(expectedState)
    expect(outputState).toEqual(emptyUser)
  })
  it('returns default state', () => {
    expect.assertions(3)
    const randomUser = {
      auth0Id: '1234',
      name: 'This is a test',
    }
    const fakeAction = {
      type: 'fakeType',
      payload: 'fakePayload',
    }
    const newState = user(randomUser, fakeAction)
    expect(newState).toBe(randomUser)
    expect(newState.name).toBe('This is a test')
    expect(newState.auth0Id).toBe('1234')
  })
})
