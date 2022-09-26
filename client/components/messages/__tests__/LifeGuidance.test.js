import React from 'react'
import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import LifeGuidance from '../LifeGuidance'

describe('<LifeGuidance />', () => {
  const fakeStore = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => ({
      lifeG: [
        { id: 1, message: 'Clean up your act', url: 'http://www.google.com' },
        {
          id: 2,
          message: 'Try eating healthy',
          url: 'http://www.cnn.com',
        },
      ],
    }),
  }
  it('displays the life guidance based on the id in the message', () => {
    render(
      <Provider store={fakeStore}>
        <LifeGuidance
          message={{
            id: 200,
            life_guidance_id: 2,
            date_sent: new Date('2022-04-22 12:51:00'),
          }}
        />
      </Provider>
    )
    const datetime = screen.getByRole('time')
    expect(datetime.innerHTML).toBe('22 April 2022 at 12:51:00 pm')
    const link = screen.getByRole('link')
    expect(link.innerHTML).toBe('Learn More!')
    expect(link.href).toBe('http://www.cnn.com/')
    expect(link.target).toBe('_blank')
  })
})
