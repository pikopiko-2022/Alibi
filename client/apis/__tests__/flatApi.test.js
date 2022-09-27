import nock from 'nock'
import { getFlatApi } from '../flatApi'

const mockFlat = {
  id: 1,
  name: "The cool kids' pad",
  address: '5 Victoria Court',
  date_established: '2022-09-25 21:51:38',
  date_disolved: null,
}

describe('GET /api/v1/flat', () => {
  it('returns flat object', () => {
    expect.assertions(2)
    const scope = nock('http://localhost')
      .get('/api/v1/flat')
      .reply(200, JSON.stringify(mockFlat), {
        'Content-Type': 'application/json',
      })
    return getFlatApi().then((result) => {
      expect(result).toStrictEqual(mockFlat)
      expect(scope.isDone()).toBe(true)
    })
  })
})
