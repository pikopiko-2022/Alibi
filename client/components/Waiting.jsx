import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResolvedPath, useNavigate } from 'react-router-dom'
import { fetchUsers } from '../actions/users'

const Waiting = () => {
  const token = useSelector((state) => state.user?.token)
  const flatmates = useSelector((state) => state.flatmates)
  const dispatch = useDispatch()
  const [bomb, setBomb] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('users updated', () => dispatch(fetchUsers()))
  }, [])

  const nuclear = () => {
    let count = 0
    flatmates.array.forEach((element) => {
      ;(element) => {
        if (element.had_enough == false) {
          count++
        }
      }
    })

    if (count == 0) {
      return true
    }
  }

  useEffect(() => {
    if (nuclear) navigate('/theend')
  }, [flatmates])

  return (
    <>
      {bomb ? true : <TheEnd />}:<div>Your Flatmates Still Like You.......</div>
      <div>Please Wait</div>
    </>
  )
}

export default Waiting
