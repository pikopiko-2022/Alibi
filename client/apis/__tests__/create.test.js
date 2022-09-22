import nock from 'nock'
import { createComplaint } from '../create'

const mockUrl = 'http://mockUrl?string=something'
const foods = [
  { name: 'apple', description: 'apple', id: 2, imageUrl: 'appleUrl' },
]
const errorMessage = 'something went wrong'
jest.spyOn(console, 'error')
afterEach(() => {
  console.error.mockReset()
})

//MARKED AS TODO - still needs to be completed
describe('GET /api/v1/create', () => {
  test.todo('gets url from AWS and sends form data to database', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/create')
      .reply(200, JSON.stringify('http://mockUrl/'), {
        'Content-Type': 'application/json',
      })
    const scope2 = nock(mockUrl)
      .put('/')
      .reply(200, { req: { url: mockUrl } })
    const scope3 = nock('http://localhost')
      .post('/api/v1/create')
      .reply(200, foods)

    return createComplaint({
      name: 'cheesecake',
      description: 'yummy cheesecake',
      image: 'mockUrl',
    }).then((result) => {
      expect(result).toEqual(foods)
      expect(scope.isDone()).toBe(true)
      expect(scope2.isDone()).toBe(true)
      expect(scope3.isDone()).toBe(true)
    })
  })
  it('returns error message when it fails', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/create')
      .replyWithError(errorMessage)

    return createComplaint({
      name: 'cheesecake',
      description: 'yummy cheesecake',
      image: 'mockUrl',
    }).then(() => {
      console.error.mockImplementation(() => {})
      expect(scope.isDone()).toBe(true)
      expect(console.error).toHaveBeenCalledWith(errorMessage)
    })
  })
})
