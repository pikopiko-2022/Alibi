const request = require('supertest')
const server = require('../../server')
// const { addFood } = require('../../db/create')
const { getSignedPutUrl } = require('../lib')

jest.mock('../lib')
// jest.mock('../../db/create')
jest.spyOn(console, 'error')

getSignedPutUrl.mockReturnValue(Promise.resolve('alibi-alibi'))

afterEach(() => console.error.mockReset())

describe('GET /api/v1/create', () => {
  it('returns a signedUrl from AWS', () => {
    return request(server)
      .get('/api/v1/create')
      .then((res) => {
        expect(res.body).toContain('alibi-alibi')
        return null
      })
  })
})

// describe('POST /api/v1/create', () => {
//   it('should post food to the database', () => {
//     addFood.mockImplementation(() => Promise.resolve(true))
//     return request(server)
//       .post('/api/v1/create')
//       .send({
//         name: 'John',
//         description: 'Something random',
//         url: 'test.jpg',
//       })
//       .then((res) => {
//         expect(res.body).toBeTruthy()
//         expect(addFood).toHaveBeenCalledWith({
//           description: 'Something random',
//           image_url: 'test.jpg',
//           name: 'John',
//           uploader_id: '42',
//         })
//         return null
//       })
//   })
//   it('should return status 500 and an error message when database fails.', () => {
//     expect.assertions(2)
//     addFood.mockImplementation(() =>
//       Promise.reject(new Error('Something went wrong'))
//     )
//     return request(server)
//       .post('/api/v1/create/')
//       .then((res) => {
//         expect(res.status).toBe(500)
//         expect(res.text).toContain('Something went wrong')
//       })
//   })
// })
