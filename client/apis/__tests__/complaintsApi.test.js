import nock from 'nock'
import {
  addCulpritToComplaint,
  createComplaint,
  getAllComplaints,
  getComplaintCount,
  getComplaintsForUserCulprit,
} from '../complaintsApi'

const mockUrl = 'http://mockUrl?string=something'
const mockComplaint = {
  issue_id: 1,
  image: null,
  complaint_raised_by: 1,
}

const errorMessage = 'something went wrong'

const complaintId = 1

const mockAllComplaints = [
  {
    id: 1,
    issue_id: 1,
    image: null,
    complaint_raised_by: 1,
    date_raised: 1664142698628,
    culprit_id: null,
    resolved: 0,
  },
  {
    id: 2,
    issue_id: 2,
    image: null,
    complaint_raised_by: 2,
    date_raised: 1664142698628,
    culprit_id: null,
    resolved: 0,
  },
]

const mockComplaintsCount = [
  {
    id: 4,
    auth0_id: 'google-oauth2|101530734603928317148',
    flat_id: 1,
    name: '234',
    description: '1',
    img_url: '1011',
    rating: 0,
    issue_id: null,
    image:
      'https://alibi-alibi.s3.ap-southeast-2.amazonaws.com/87798d52-d2ba-43bf-b097-ca88876496cf',
    complaint_raised_by: 4,
    date_raised: '2022-09-26 03:57:29',
    culprit_id: null,
    resolved: 0,
    count: 2,
  },
]

jest.spyOn(console, 'error')
afterEach(() => {
  console.error.mockReset()
})

describe('GET /api/v1/imageUrl', () => {
  it('gets url from AWS and sends form data to database', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/imageUrl')
      .reply(200, JSON.stringify('http://mockUrl/'), {
        'Content-Type': 'application/json',
      })
    const scope2 = nock(mockUrl)
      .put('/')
      .reply(200, { req: { url: mockUrl } })
    const scope3 = nock('http://localhost')
      .post('/api/v1/complaints')
      .reply(200, mockComplaint)

    return createComplaint(mockComplaint).then((result) => {
      // expect(result).toEqual(mockComplaint)
      expect(result).toContain('complaint_raised_by')
      expect(scope.isDone()).toBe(true)
      expect(scope2.isDone()).toBe(true)
      expect(scope3.isDone()).toBe(true)
    })
  })
  it('returns error message when it fails', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/imageUrl')
      .replyWithError(errorMessage)

    return createComplaint({
      issue_id: '1',
      complaint_raised_by: '1',
      image: 'mockUrl',
    }).then(() => {
      console.error.mockImplementation(() => {})
      expect(scope.isDone()).toBe(true)
      expect(console.error).toHaveBeenCalledWith(errorMessage)
    })
  })
})

describe('PUT /api/v1/complaints/:id', () => {
  it('adds culprit to complaint based on complaintId', () => {
    const scope = nock('http://localhost')
      .put(`/api/v1/complaints/${complaintId}`)
      .reply(200, JSON.stringify(complaintId), {
        'Content-Type': 'application/json',
      })
    return addCulpritToComplaint(complaintId).then(() => {
      expect(complaintId).toBe(1)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('GET /api/v1/complaints/all', () => {
  it('returns flat object', () => {
    expect.assertions(2)
    const scope = nock('http://localhost')
      .get('/api/v1/complaints/all')
      .reply(200, JSON.stringify(mockAllComplaints), {
        'Content-Type': 'application/json',
      })
    return getAllComplaints().then((result) => {
      expect(result).toStrictEqual(mockAllComplaints)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('GET /api/v1/complaints/count', () => {
  it('returns flat object', () => {
    expect.assertions(2)
    const scope = nock('http://localhost')
      .get('/api/v1/complaints/count')
      .reply(200, JSON.stringify(mockComplaintsCount), {
        'Content-Type': 'application/json',
      })
    return getComplaintCount().then((result) => {
      expect(result).toStrictEqual(mockComplaintsCount)
      expect(scope.isDone()).toBe(true)
    })
  })
})

describe('GET /api/v1/complaints/culprit', () => {
  it('returns flat object', () => {
    expect.assertions(2)
    const scope = nock('http://localhost')
      .get('/api/v1/complaints/culprit')
      .reply(200, JSON.stringify(mockAllComplaints), {
        'Content-Type': 'application/json',
      })
    return getComplaintsForUserCulprit().then((result) => {
      expect(result).toStrictEqual(mockAllComplaints)
      expect(scope.isDone()).toBe(true)
    })
  })
  it('returns error message when it fails', () => {
    const scope = nock('http://localhost')
      .get('/api/v1/complaints/culprit')
      .replyWithError(errorMessage)

    return getComplaintsForUserCulprit().then(() => {
      console.error.mockImplementation(() => {})
      expect(scope.isDone()).toBe(true)
      expect(console.error).toHaveBeenCalledWith(errorMessage)
    })
  })
})
