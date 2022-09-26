import React from 'react'
import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Message from '../messages/Message'

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
  it('displays a message that was sent by a user', () => {
    render(
      <Provider store={fakeStore}>
        <Message
          message={{
            id: 200,
            sender_id: 1,
            recipient_id: 3,
            date_sent: new Date('2022-04-22 12:51:00'),
          }}
        />
      </Provider>
    )
    const datetime = screen.getByRole('time')
    expect(datetime.innerHTML).toBe('22 April 2022 at 12:51:00 pm')
    screen.debug()
    const link = screen.getByRole('link')
    expect(link.innerHTML).toBe('Learn More!')
    expect(link.href).toBe('http://www.cnn.com/')
    expect(link.target).toBe('_blank')
  })
})
