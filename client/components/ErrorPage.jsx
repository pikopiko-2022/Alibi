import React from 'react'
import Nav from './Nav'

export default function ErrorPage() {
  return (
    <>
      <Nav />
      <div>
        <h1>Page Not Found</h1>
        <br />
        <p>
          Our Apologies but this link is currently in development.
          <br />
          If you have any question or complaints please{' '}
          <a href="#">contact us here</a>
        </p>
      </div>
    </>
  )
}
