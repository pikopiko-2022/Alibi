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
        img_seed: '90',
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
    expect(profileImage.src).toBe(
      `https://avatars.dicebear.com/api/adventurer/90.svg?size=300`
    )
    const name = screen.getByText('Name', { exact: false })
    expect(name.innerHTML).toBe('Test Name')
  })

  const fakeStore2 = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => ({
      user: {},
    }),
  }

  it(`displays loading widget if user not loaded`, () => {
    render(
      <Provider store={fakeStore2}>
        <BrowserRouter>
          <DisplayUser />
        </BrowserRouter>
      </Provider>
    )
    const spinner = screen.queryAllByRole('alert')
    const image = screen.queryAllByRole('img')
    expect(spinner).toHaveLength(1)
    expect(image).toHaveLength(0)
  })
})
