import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Avatar from '../widgets/Avatar'

describe('<Avatar />', () => {
  it('shows an image with url that uses seed', () => {
    render(<Avatar seedData={25} size={300} />)
    const image = screen.getByRole('img')
    expect(image.src).toBe(
      `https://avatars.dicebear.com/api/adventurer/25.svg?size=300`
    )
  })
  it('defaults to size of 150 if no size passed', () => {
    render(<Avatar seedData={25} />)
    const image = screen.getByRole('img')
    expect(image.src).toBe(
      `https://avatars.dicebear.com/api/adventurer/25.svg?size=150`
    )
  })
})
