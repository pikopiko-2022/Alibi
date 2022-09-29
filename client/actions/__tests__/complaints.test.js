import {
  setComplaint,
  SET_COMPLAINT,
  setComplaints,
  SET_COMPLAINTS,
  fetchComplaints,
  fetchComplaintCount,
} from '../complaints'

import { getAllComplaints, getComplaintCount } from '../../apis/complaintsApi'

jest.mock('../../apis/complaintsApi')

jest.spyOn(console, 'error')

beforeEach(() => {
  jest.clearAllMocks()
})

const fakeDispatch = jest.fn()

const mockComplaint = {
  issue_id: 1,
  image: null,
  complaint_raised_by: 1,
}

const mockComplaints = [
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

getAllComplaints.mockReturnValue(Promise.resolve(mockComplaints))
getComplaintCount.mockReturnValue(Promise.resolve(mockComplaintsCount))

describe('setComplaint', () => {
  it('sets the complaint to be the complaint', () => {
    expect(setComplaint(mockComplaint).type).toBe(SET_COMPLAINT)
    expect(setComplaint(mockComplaint).payload).toBe(mockComplaint)
  })
})

describe('setComplaints', () => {
  it('sets the complaint to be the complaint', () => {
    expect(setComplaints(mockComplaints).type).toBe(SET_COMPLAINTS)
    expect(setComplaints(mockComplaints).payload).toBe(mockComplaints)
  })
})

describe('fetchComplaints and complaintsCount', () => {
  it('dispatches setComplaints after api call', () => {
    return fetchComplaints()(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(SET_COMPLAINTS)
      expect(fakeDispatchAction.payload).toEqual(mockComplaints)
    })
  })
  it('Should console.error if request fails', () => {
    console.error.mockImplementation(() => {})
    getAllComplaints.mockImplementation(() =>
      Promise.reject(new Error('error'))
    )
    return fetchComplaints()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
  it('fetchComplaintCount dispatches setComplaints after api call', () => {
    return fetchComplaintCount()(fakeDispatch).then(() => {
      const fakeDispatchAction = fakeDispatch.mock.calls[0][0]
      expect(fakeDispatchAction.type).toBe(SET_COMPLAINTS)
      expect(fakeDispatchAction.payload).toEqual(mockComplaintsCount)
    })
  })
  it('Should error if request fails', () => {
    console.error.mockImplementation(() => {})
    getComplaintCount.mockImplementation(() =>
      Promise.reject(new Error('error'))
    )
    return fetchComplaintCount()(fakeDispatch).then(() => {
      expect(console.error).toHaveBeenCalledWith('error')
    })
  })
})
