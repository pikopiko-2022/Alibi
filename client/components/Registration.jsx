import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from './Avatar'
import { getRandomNumber } from '../apis/messages'

import { newUser } from '../apis/authentication'
import { updateLoggedInUser } from '../actions/loggedInUser'

function Register() {
  const user = useSelector((state) => state.loggedInUser)

  const dispatch = useDispatch()

  const [seedData, setSeedData] = useState(getRandomNumber(1, 10000))

  const [form, setForm] = useState({
    username: '',
    flatId: '',
    description: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const userInfo = {
      auth0Id: user.auth0Id,
      img_url: seedData,
      ...form,
    }
    newUser(userInfo, user.token)
      .then(() => dispatch(updateLoggedInUser(userInfo)))
      .catch((err) => setErrorMsg(err.message))
  }

  const hideError = () => {
    setErrorMsg('')
  }

  return (
    <>
      <Avatar seedData={seedData} />

      <h2>Complete profile set up</h2>
      {errorMsg && <error onClick={hideError}>Error: {errorMsg}</error>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <label htmlFor="flat_Id">Which FlatID are you joining?</label>
        <input
          type="text"
          id="flatId"
          name="flatId"
          value={form.flatId}
          onChange={handleChange}
        />
        <label htmlFor="description">Enter a description of yourself</label>
        <input
          type="text"
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <button disabled={!(form.username && form.flatId && form.description)}>
          Save Profile
        </button>
      </form>
      <button onClick={() => setSeedData(getRandomNumber(1, 10000))}>
        Refresh Avatar
      </button>
    </>
  )
}

export default Register
