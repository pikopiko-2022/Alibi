import nock from 'nock'
import { getflatmatesApi } from '../flatmatesApi'

const mockFlatmates = [
  {
    id: 1,
    auth0_id: '1',
    flat_id: 1,
    name: 'Gertrude',
    description: 'lazy and selfish',
    img_url: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
    rating: 5,
  },
  {
    id: 2,
    auth0_id: '2',
    flat_id: 1,
    name: 'Bartholomeow',
    description: 'uptight and controlling',
    img_url:
      'https://imageresizer.static9.net.au/FUR-nf6ZUQBmQ_sBZvb3nRpSy58=/400x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F06d1a684-e25e-47e9-98ce-9b18323a0f0e',
    rating: 6,
  },
]

describe('GET /api/v1/flatmates', () => {
  it('returns a list of flatmates', () => {
    expect.assertions(2)
    const scope = nock('http://localhost')
      .get('/api/v1/flatmates')
      .reply(200, JSON.stringify(mockFlatmates), {
        'Content-Type': 'application/json',
      })
    return getflatmatesApi().then((result) => {
      expect(result).toStrictEqual(mockFlatmates)
      expect(scope.isDone()).toBe(true)
    })
  })
})
