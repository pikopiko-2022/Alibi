import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from './widgets/Avatar'

import { newUser } from '../apis/userApi'
import { updateLoggedInUser } from '../actions/user'
import { getRandomNumber } from '../apis/messagesApi'

import styles from './App.module.scss'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [seedData, setSeedData] = useState(getRandomNumber(1, 10000))
  const [form, setForm] = useState({
    name: '',
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
      img_seed: seedData,
      ...form,
    }
    newUser(userInfo, user.token)
      .then((id) => {
        dispatch(updateLoggedInUser({ ...userInfo, id }))
      })
      .catch((err) => setErrorMsg(err.message))
    navigate('/')
  }

  const hideError = () => {
    setErrorMsg('')
  }

  return (
    <div className={styles.registrationPage}>
      <div className={styles.registrationContainer}>
        <h1>ALIBI</h1>

        <Avatar seedData={seedData} />
        <button
          className={styles.actionButton}
          onClick={() => setSeedData(getRandomNumber(1, 10000))}
        >
          Refresh Avatar
        </button>
        <h2>Complete profile set up</h2>
        {errorMsg && <error onClick={hideError}>Error: {errorMsg}</error>}
        <form onSubmit={handleSubmit} className={styles.registrationForm}>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <label htmlFor="flatId">Which FlatID are you joining?</label>
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
          <button
            className={styles.actionButton}
            disabled={!(form.name && form.flatId && form.description)}
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
