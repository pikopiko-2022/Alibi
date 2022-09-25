import React, { useEffect } from 'react'
import Flatmate from './Flatmate'
import styles from './Flatmates.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../actions/users'

function Flatmates() {
  const dispatch = useDispatch()
  const flatmates = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <>
      <ul>
        <li>
          {flatmates.map((flatmate) => (
            <Flatmate key={flatmate.id} flatmate={flatmate} />
          ))}
        </li>
      </ul>
    </>
  )
}

export default Flatmates
