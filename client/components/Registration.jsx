import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import { getRandomNumber } from '../apis/messages'
import { newUser } from '../apis/userApi'
import { updateLoggedInUser } from '../actions/user'
import videoBg from '../../server/public/assets/videoBG.mp4'
import styles from './Create.module.scss'

function Register() {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      img_url: seedData,
      ...form,
    }
    newUser(userInfo, user.token)
      .then(() => dispatch(updateLoggedInUser(userInfo)))
      .catch((err) => setErrorMsg(err.message))
    navigate('/')
  }

  const hideError = () => {
    setErrorMsg('')
  }

  return (
    <div className={styles.container}>
      <video src={videoBg} autoPlay loop muted />
      <Avatar seedData={seedData} />

      <h2>Complete profile set up</h2>
      {errorMsg && <error onClick={hideError}>Error: {errorMsg}</error>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
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
        <button disabled={!(form.name && form.flatId && form.description)}>
          Save Profile
        </button>
      </form>
      <button onClick={() => setSeedData(getRandomNumber(1, 10000))}>
        Refresh Avatar
      </button>
    </div>
  )
}

export default Register
