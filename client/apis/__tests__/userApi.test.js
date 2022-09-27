import nock from 'nock'

import { getUser, newUser, addUserScore, addUserEnough } from '../userApi'

const errorMessage = 'please fix me, I am broken'
jest.spyOn(console, 'error')
afterEach(() => {
  console.error.mockReset()
})

describe('getUser', () => {
  it('returns data from local api', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/user')
      .reply(200, { id: 1, name: 'Trudy' })
    return getUser().then((result) => {
      expect(result.name).toContain('Trudy')
      expect(scope.isDone()).toBe(true)
    })
  })
  it('returns error message when it fails', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/user')
      .replyWithError(errorMessage)
    return getUser().then(() => {
      expect(scope.isDone()).toBe(true)
      expect(console.error).toHaveBeenCalledWith(errorMessage)
    })
  })
})

const mockUsers = [
  {
    id: 2,
    name: 'James',
    description: 'irate',
    rating: 6,
    had_enough: false,
  },
  {
    id: 1,
    name: 'Trudy',
    description: 'rude',
    rating: 4,
    had_enough: false,
  },
]

describe('newUser', () => {
  it('adds new user and stores in database', () => {
    const mockUser = mockUsers[0]
    const scope = nock('http://localhost')
      .post('/api/v1/user')
      .reply(200, mockUser)

    return newUser(mockUser).then((result) => {
      expect(scope.isDone()).toBe(true)
      expect(result.name).toBe('James')
      expect(result.had_enough).toBe(false)
      expect(result.description).toBe('irate')
    })
  })

  it('returns error message when it fails', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/user')
      .replyWithError(errorMessage)
    return getUser().then(() => {
      expect(scope.isDone()).toBe(true)
      expect(console.error).toHaveBeenCalledWith(errorMessage)
    })
  })
})
const score = 6

describe('addUserScore', () => {
  it('adds users score', () => {
    const scope = nock('http://localhost')
      .put('/api/v1/user')
      .reply(200, JSON.stringify(score), {
        'Content-Type': 'application/json',
      })
    return addUserScore(score).then((result) => {
      expect(result).toStrictEqual(score)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('returns error message when it fails', () => {
    const scope = nock('http://localhost')
      .put('/api/v1/user')
      .replyWithError(errorMessage)
    return addUserScore().then(() => {
      expect(scope.isDone()).toBe(true)
      expect(console.error).toHaveBeenCalledWith(errorMessage)
    })
  })
})
const mockHadEnough = false

describe('addUserEnough', () => {
  it('adds had_enough user database', () => {
    const scope = nock('http://localhost')
      .put('/api/v1/user/enough')
      .reply(200, JSON.stringify(mockHadEnough), {
        'Content-Type': 'application/json',
      })
    return addUserEnough(mockHadEnough).then((result) => {
      expect(result).toStrictEqual(mockHadEnough)
      expect(scope.isDone()).toBe(true)
    })
  })

  it('returns error message when it fails', () => {
    const scope = nock('http://localhost')
      .put('/api/v1/user/enough')
      .replyWithError(errorMessage)
    return addUserEnough().then(() => {
      console.error.mockImplementation(() => {})
      expect(scope.isDone()).toBe(true)
      expect(console.error).toHaveBeenCalledWith(errorMessage)
    })
  })
})
