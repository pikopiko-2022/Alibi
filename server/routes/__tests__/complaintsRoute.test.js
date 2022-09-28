const request = require('supertest')
const server = require('../../server')

const {
  addComplaint,
  getCurrentComplaints,
  getComplaintsForUser,
  updateCulpritDb,
} = require('../../db/dbComplaints')

const { getUserIdByAuth0Id } = require('../../db/dbUsers')

jest.mock('../../db/dbComplaints')
jest.mock('../../db/dbUsers')
jest.spyOn(console, 'error')

afterEach(() => {
  console.error.mockReset()
  jest.clearAllMocks()
})

const checkJwt = require('../../auth0')
jest.mock('../../auth0')

checkJwt.mockImplementation((req, res, next) => {
  req.user = { sub: 'testAuth0Id' }
  next()
})

const mockComplaint = {
  issue_id: 1,
  image: null,
  complaint_raised_by: 1,
}

getUserIdByAuth0Id.mockReturnValue(Promise.resolve(1))
getCurrentComplaints.mockReturnValue(
  Promise.resolve({ complaint: 'You left dirty clothes everywhere', id: 1 })
)
getComplaintsForUser.mockReturnValue(
  Promise.resolve([
    { id: 1, complaint: 'Hey' },
    { id: 2, complaint: 'Yo' },
  ])
)
updateCulpritDb.mockReturnValue(Promise.resolve(1, 1))

describe('POST /api/v1/complaints', () => {
  it('posts complaint to complaints array', () => {
    addComplaint.mockReturnValue(Promise.resolve(mockComplaint))
    return request(server)
      .post('/api/v1/complaints')
      .send(mockComplaint)
      .then((res) => {
        expect(res.status).toBe(200)
        expect(addComplaint.mock.calls[0][0]).toStrictEqual(mockComplaint)
        return null
      })
  })
  it('return status 500 and consoles error when problem', () => {
    addComplaint.mockImplementation(() => Promise.reject(new Error('fail')))
    console.error.mockImplementation(() => {})
    return request(server)
      .post('/api/v1/complaints')
      .then((res) => {
        expect(res.status).toBe(500)
        return null
      })
  })
})

describe('GET /api/v1/complaints/current', () => {
  it('should return status 200 and the flat when database is successful.', () => {
    expect.assertions(2)
    return request(server)
      .get('/api/v1/complaints/current')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body.complaint).toBe('You left dirty clothes everywhere')
      })
  })
  it('return status 500 and consoles error when fails', () => {
    getCurrentComplaints.mockImplementation(() =>
      Promise.reject(new Error('fail'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/api/v1/complaints/current')
      .then((res) => {
        expect(res.status).toBe(500)
        return null
      })
  })
})

describe('GET /api/v1/complaints/culprit', () => {
  it('should return status 200 and the flat when database is successful.', () => {
    expect.assertions(2)
    return request(server)
      .get('/api/v1/complaints/culprit')
      .then((res) => {
        expect(res.status).toBe(200)
        expect(res.body[1].complaint).toBe('Yo')
      })
  })
  it('return status 500 and consoles error when fails', () => {
    getComplaintsForUser.mockImplementation(() =>
      Promise.reject(new Error('fail'))
    )
    console.error.mockImplementation(() => {})
    return request(server)
      .get('/api/v1/complaints/culprit')
      .then((res) => {
        expect(res.status).toBe(500)
        return null
      })
  })
})

describe('PUT /api/v1/complaints/:complaintsId', () => {
  it('updates culprit for a complaint', () => {
    return request(server)
      .put('/api/v1/complaints/1')
      .send({ answerId: 1 })
      .then((res) => {
        expect(res.body).toBe(1)
      })
  })
  it('return status 500 and consoles error when fails', () => {
    updateCulpritDb.mockImplementation(() => Promise.reject(new Error('fail')))
    console.error.mockImplementation(() => {})
    return request(server)
      .put('/api/v1/complaints/1')
      .then((res) => {
        expect(res.status).toBe(500)
        return null
      })
  })
})
