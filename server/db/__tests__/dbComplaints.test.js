const knex = require('knex')
const config = require('../knexfile')
const testCon = knex(config.test)

const {
  addComplaint,
  updateCulpritDb,
  getCurrentComplaints,
  getComplaintsForUser,
} = require('../dbComplaints')

const mockComplaints = [
  {
    issue_id: 1,
    image: `https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2017%2F09%2F01%2Fsink-of-dishes-2000.jpg`,
    complaint_raised_by: 3,
    date_raised: new Date(Date.now()),
    culprit_id: null,
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

describe('addComplaint', () => {
  it('post complaints to db', () => {
    return addComplaint(mockComplaints[0], testCon)
      .then(() => testCon('complaints').select())
      .then((complaints) => {
        expect(complaints).toHaveLength(3)
        expect(complaints[2]).toHaveProperty(
          'image',
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2017%2F09%2F01%2Fsink-of-dishes-2000.jpg'
        )
      })
  })
  it('get unressolved complaints', () => {
    expect.assertions(0)
    return getCurrentComplaints(1, testCon).then((complaints) =>
      console.log(complaints)
    )
  })
})
