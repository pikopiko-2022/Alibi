const request = require('supertest')
const server = require('../../server')
const knex = require('knex')
const config = require('../../db/knexfile')
const testCon = knex(config.test)
const {
  addComplaint,
  getCurrentComplaints,
  updateCulpritDb,
} = require(`../../db/dbComplaints`)
// const { getUserIdByAuth0Id } = require(`../../db/dbUsers`)

jest.mock('../../db/dbComplaints')
jest.mock(`../../db/dbUsers`)
jest.spyOn(console, 'error')

// getUserIdByAuth0Id.mockReturnValue(Promise.resolve(`alibi-alibi`))

beforeAll(() => testCon.migrate.latest())
beforeEach(() => testCon.seed.run())
afterEach(() => console.error.mockReset())

describe('POST /api/v1/complaints', () => {
  it('adds a complaint to the database', () => {
    addComplaint.mockImplementation(() => Promise.resolve(true))
    return request(server)
      .post(`/api/v1/complaints`)
      .then((res) => {
        expect(res.body).toBeTruthy()
        return null
      })
  })
  test.todo(
    'returns status 500 and consoles error' //, () => {
    //   addComplaint.mockImplementation(() =>
    //     Promise.reject(new Error('mock no worky'))
    //   )
    //   console.error.mockImplementation(() => {})
    //   return request(server)
    //     .get('/api/v1/complaints/')
    //     .then((res) => {
    //       expect(res.status).toBe(404) //this should be 500
    //       //expect(console.error).toHaveBeenCalledWith('mock no worky')
    //     })
    // }
  )
})

describe('GET /api/v1/complaints/current', () => {
  it('gets the list of current complaints from the database', () => {
    const fakeComplaints = [
      {
        id: 1,
        issue_id: 1,
        image: null,
        complaint_raised_by: 1,
        date_raised: '2202-09-26 03:08:16',
        culprit_id: null,
        resolved: 0,
      },
      {
        id: 2,
        issue_id: 2,
        image: null,
        complaint_raised_by: 2,
        date_raised: '2202-09-26 03:08:16',
        culprit_id: null,
        resolved: 0,
      },
    ]

    getCurrentComplaints.mockReturnValue(Promise.resolve(fakeComplaints))

    return request(server)
      .get('/api/v1/complaints/current')
      .then((res) => {
        expect(res.body).toHaveLength(2)
        expect(res.body[0].issue_id).toBe(1)
      })
  })
})
