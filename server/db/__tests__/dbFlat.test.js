const config = require('../knexfile')
const knex = require('knex')
const { getFlat } = require('../dbFlat')
const testCon = knex(config.test)

beforeAll(() => testCon.migrate.latest())

beforeEach(() => testCon.seed.run())

afterAll(() => testCon.destroy())

describe('getFlat', () => {
  it('gets a single flat from the database by id', () => {
    return getFlat(1, testCon).then((flat) => {
      expect(flat.name).toBe(`The cool kids' pad`)
    })
  })
})
