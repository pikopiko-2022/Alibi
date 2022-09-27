const config = require('../knexfile')
const knex = require('knex')
const {
  getMessages,
  addMessage,
  updateMessage,
  getMessagesByName,
} = require('../dbMessages')
const testCon = knex(config.test)

beforeAll(() => testCon.migrate.latest())

beforeEach(() => testCon.seed.run())

afterAll(() => testCon.destroy())

describe('getMessages', () => {
  test('Only messages the user should see are received from the database', () => {
    return getMessages(1, testCon).then((messages) => {
      expect(messages).toHaveLength(4)
      expect(messages[0]?.id).toBe(2)
      expect(
        messages?.filter(
          (message) =>
            message.sender_id === 1 ||
            message.recipient_id === 1 ||
            message.recipient_id === null
        )
      ).toHaveLength(4)
    })
  })
})

describe('getMessageByName', () => {
  it('gets a list of messages that mention the user name, excluding messages the user has already seen', () => {
    return getMessagesByName('Billy', 1, testCon).then((messages) => {
      expect(messages).toHaveLength(1)
      expect(messages[0]?.message).toContain('Billy')
    })
  })
})

describe('addMessage', () => {
  it('adds a message to the database', () => {
    return addMessage({ message: `Hello, I'm new here`, sender_id: 1 }, testCon)
      .then(() => getMessages(1, testCon))
      .then((messages) => {
        expect(messages).toHaveLength(5)
        expect(messages[4]?.sender_id).toBe(1)
      })
  })
})

describe('updateMessage', () => {
  it('updates a message', () => {
    return updateMessage(2, { recipient_id: 2 }, testCon)
      .then((res) => {
        expect(res).toBe(1)
        return getMessages(1, testCon)
      })
      .then((messages) => {
        expect(messages).toHaveLength(3)
        expect(messages[0]?.id).toBe(3)
      })
  })
})
