import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { newUser } from '../apis/authentication'
import { updateLoggedInUser } from '../actions/user'

function Register() {
  const user = useSelector((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    username: '',
    flatId: '',
    //placeholder doppleme avatar
  })

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (user?.username) navigate('/')
  }, [user])

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
        <button disabled={!(form.username && form.flatId)}>Save Profile</button>
      </form>
    </>
  )
}

export default Register
