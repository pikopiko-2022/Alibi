import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useSelector, useDispatch } from 'react-redux'

import Create from '../Create.jsx'
jest.mock('react-redux')

describe('<Create />', () => {
  it('renders the mocked data on screen', () => {
    useSelector.mockReturnValue([
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' },
    ])
    useDispatch.mockReturnValue(() => {})
    render(<Create />)
    const postsBody = screen.getAllByRole('listitem')
    expect(postsBody[0]).toHaveTextContent('test1')
  })
})
