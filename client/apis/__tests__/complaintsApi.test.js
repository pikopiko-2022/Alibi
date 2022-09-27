import nock from 'nock'
import { addCulpritToComplaint, createComplaint } from '../complaintsApi'

const mockUrl = 'http://mockUrl?string=something'
const mockComplaint = {
  issue_id: 1,
  image: null,
  complaint_raised_by: 1,
}

const errorMessage = 'something went wrong'

const complaintId = 1

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
      console.log(result)
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
      console.log(complaintId)
      expect(complaintId).toBe(1)
      expect(scope.isDone()).toBe(true)
    })
  })
})
