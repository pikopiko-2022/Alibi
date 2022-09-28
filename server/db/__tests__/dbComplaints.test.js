const knex = require('knex')
const config = require('../knexfile')
const testCon = knex(config.test)

const {
  addComplaint,
  updateCulpritDb,
  getCurrentComplaints,
  getAllComplaints,
  getHighestComplainant,
  getComplaintsForUser,
} = require('../dbComplaints')

const mockComplaints = [
  {
    issue_id: 1,
    image: `https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2017%2F09%2F01%2Fsink-of-dishes-2000.jpg`,
    complaint_raised_by: 3,
    date_raised: new Date(Date.now()),
    culprit_id: 1,
    resolved: 0,
  },
]

beforeAll(() => {
  return testCon.migrate.latest()
})

beforeEach(() => {
  return testCon.seed.run()
})

afterAll(() => {
  testCon.destroy()
})

describe('getAllComplaints', () => {
  it('get all complaints', () => {
    return getAllComplaints(testCon).then((complaints) => {
      expect(complaints).toHaveLength(3)
      expect(complaints[0]).toHaveProperty('issue_id', 1)
    })
  })
})

describe('addComplaint', () => {
  it('post complaints to db', () => {
    return addComplaint(mockComplaints[0], testCon)
      .then(() => testCon('complaints').select())
      .then((complaints) => {
        expect(complaints).toHaveLength(4)
        expect(complaints[3]).toHaveProperty(
          'image',
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2017%2F09%2F01%2Fsink-of-dishes-2000.jpg'
        )
      })
  })
})

describe('getCurrentComplaints', () => {
  it('get unressolved complaints', () => {
    return getCurrentComplaints(1, testCon).then((complaints) => {
      expect(complaints[0]).toHaveProperty('culprit_id', null)
      expect(complaints[0]).not.toHaveProperty('complaint_raised_by', 1)
    })
  })
})

describe('updateCulpritDb', () => {
  it('updates culprit_id', () => {
    return updateCulpritDb(1, 2, testCon)
      .then(() => testCon('complaints').select())
      .then((complaints) => {
        expect(complaints[0]).toHaveProperty('culprit_id', 2)
      })
  })
})

describe('getComplaintsForUser', () => {
  it('get all complaints where culprit is same', () => {
    return getComplaintsForUser(2, testCon).then((complaints) => {
      expect(complaints[0]).toHaveProperty('culprit_id', 2)
      expect(complaints).toHaveLength(1)
    })
  })
})

describe('getHighestComplainant', () => {
  it('get highest amount of commplaints made by one person', () => {
    return getHighestComplainant(testCon).then((user) => {
      expect(user[0].name).toBe('Gertrude')
      expect(user[0]).toHaveProperty('count', 2)
    })
  })
})
