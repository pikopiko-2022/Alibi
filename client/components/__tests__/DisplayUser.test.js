import React from 'react'
import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import DisplayUser from '../user/DisplayUser'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'

describe('<DisplayUser />', () => {
  const fakeStore = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => ({
      user: {
        id: 20,
        auth0id: '20',
        name: 'Test Name',
        description: 'A test user object',
        rating: 10,
        img_url: 'testimage.jpg',
        flatName: 'Test Flat',
        flatAddress: '123 Test Street',
      },
    }),
  }
  test('current users image and name is displayed', () => {
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <DisplayUser />
        </BrowserRouter>
      </Provider>
    )
    const profileImage = screen.getByRole('img')
    expect(profileImage.src).toContain('testimage.jpg')
    const name = screen.getByText('Name', { exact: false })
    expect(name.innerHTML).toBe('Test Name')
  })
})
