const knex = require('knex')
const config = require('../knexfile')
const testCon = knex(config.test)

const { getFlatmates } = require('../dbFlatmates')

beforeAll(() => {
  return testCon.migrate.latest()
})

beforeEach(() => {
  return testCon.seed.run()
})

afterAll(() => {
  testCon.destroy()
})

describe('getFlatmates', () => {
  it('get all flatmates', () => {
    return getFlatmates(1, testCon).then((flatmate) => {
      expect(flatmate).toHaveLength(2)
      expect(flatmate[0]).not.toHaveProperty('flat_id', 2)
      expect(flatmate[1]).toMatchObject({
        auth0_id: '2',
        description: 'uptight and controlling',
        flat_id: 1,
        had_enough: 0,
        id: 2,
        img_seed:
          'https://imageresizer.static9.net.au/FUR-nf6ZUQBmQ_sBZvb3nRpSy58=/400x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F06d1a684-e25e-47e9-98ce-9b18323a0f0e',
        name: 'Bartholomeow',
        rating: 6,
      })
    })
  })
})
