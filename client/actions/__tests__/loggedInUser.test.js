import {
  updateLoggedInUser,
  UPDATE_LOGGED_IN_USER,
  clearLoggedInUser,
  CLEAR_LOGGED_IN_USER,
} from '../loggedInUser'

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

describe('updateLoggedInUser', () => {
  it('sets the logged in user to be the user', () => {
    expect(updateLoggedInUser(mockUserToSave).type).toBe(UPDATE_LOGGED_IN_USER)
    expect(updateLoggedInUser(mockUserToSave).payload).toBe(mockUserToSave)
  })
})

describe('clearLoggedInUser', () => {
  it('clears the logged in user', () => {
    expect(clearLoggedInUser().type).toBe(CLEAR_LOGGED_IN_USER)
  })
})
