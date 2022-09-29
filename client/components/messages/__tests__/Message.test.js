import React from 'react'
import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Message from '../Message'

describe('<Message />', () => {
  const fakeStore = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => ({
      user: {
        id: 1,
      },
      flatmates: [
        { id: 2, name: 'Jeff' },
        { id: 3, name: 'Alice' },
        { id: 4, name: 'Hannah' },
      ],
    }),
  }
  it('displays a message that was sent by yourself to another user', () => {
    render(
      <Provider store={fakeStore}>
        <Message
          message={{
            id: 200,
            sender_id: 1,
            recipient_id: 3,
            message: 'Hey Alice',
            date_sent: new Date('2022-04-22 12:51:00'),
          }}
        />
      </Provider>
    )
    const datetime = screen.getByRole('time')
    expect(datetime.innerHTML).toContain('22 April 2022')
    const sentTo = screen.getByText('Sent to', { exact: false })
    expect(sentTo.innerHTML).toBe('Sent to Alice')
    const message = screen.getByText('Hey Alice')
    expect(message).toBeDefined()
  })
  it('displays a message that to you by another user', () => {
    render(
      <Provider store={fakeStore}>
        <Message
          message={{
            id: 200,
            sender_id: 3,
            recipient_id: 1,
            message: 'Hey Friend',
            date_sent: new Date('2022-04-22 12:51:00'),
          }}
        />
      </Provider>
    )
    const datetime = screen.getByRole('time')
    expect(datetime.innerHTML).toContain('22 April 2022')
    const sentBy = screen.getByText('Alice')
    expect(sentBy).toBeDefined()
    const sentTo = screen.getByText('Sent to', { exact: false })
    expect(sentTo.innerHTML).toBe('Sent to You')
    const message = screen.getByText('Hey Friend')
    expect(message).toBeDefined()
  })
  it('displays a message that you sent to everyone', () => {
    render(
      <Provider store={fakeStore}>
        <Message
          message={{
            id: 200,
            sender_id: 1,
            message: 'Hey Everyone',
            date_sent: new Date('2022-04-22 12:51:00'),
          }}
        />
      </Provider>
    )
    const datetime = screen.getByRole('time')
    expect(datetime.innerHTML).toContain('22 April 2022')
    const sentTo = screen.getByText('Sent to', { exact: false })
    expect(sentTo.innerHTML).toBe('Sent to Everyone')
    const message = screen.getByText('Hey Everyone')
    expect(message).toBeDefined()
  })
  it('displays a message that another user sent to everyone', () => {
    render(
      <Provider store={fakeStore}>
        <Message
          message={{
            id: 200,
            sender_id: 4,
            message: 'Hey Everyone, my name is Hannah',
            date_sent: new Date('2022-04-22 12:51:00'),
          }}
        />
      </Provider>
    )
    const datetime = screen.getByRole('time')
    expect(datetime.innerHTML).toContain('22 April 2022')
    const sentBy = screen.getByText('Hannah')
    expect(sentBy).toBeDefined()
    const sentTo = screen.getByText('Sent to', { exact: false })
    expect(sentTo.innerHTML).toBe('Sent to Everyone')
    const message = screen.getByText('Hey Everyone, my name is Hannah')
    expect(message).toBeDefined()
  })
})
