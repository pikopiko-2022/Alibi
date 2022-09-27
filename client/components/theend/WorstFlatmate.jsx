import React, { useEffect, useState } from 'react'
import { fetchFlatmates } from '../../actions/flatmates'

// eslint-disable-next-line import/no-named-as-default
import io from 'socket.io-client'

import { useSelector, useDispatch } from 'react-redux'

const WorstFlatmate = () => {
  const socket = io()
  const dispatch = useDispatch()
  const flatmates = useSelector((state) => state.flatmates)
  const token = useSelector((state) => state.user?.token)

  // const badUser = ([badUser, updateBadUser] = useState({}))
  const [badUser, setBadUser] = useState({})

  useEffect(() => {
    dispatch(fetchFlatmates(token))
    socket.on('users updated', () => {
      dispatch(fetchFlatmates(token))
    })
  }, [])

  const findWorst = () => {
    let mateA = 0
    let mateB = 0

    // let badUser = {}

    flatmates.forEach((element) => {
      mateB = element.rating
      if (mateB > mateA) {
        mateA = mateB
      }
    })
    flatmates.forEach((element) => {
      if ((element.rating = mateA)) {
        // badUser = element
        setBadUser(element)
      }
    })
  }

  return (
    <>
      <h1>Worst Flatmate</h1>
      <div>
        <h2>{badUser.name}</h2>
      </div>
      <div>
        <p>Offender rating: {badUser.rating}</p>
      </div>
      <div>
        <ul>
          <li>Other Users</li>
          {flatmates.map((item) => {
            if (item.id != badUser.id) {
              ;<li>
                {item.name}: {item.rating}
              </li>
            }
          })}
        </ul>
      </div>
    </>
  )
}

export default WorstFlatmate

//[{id:, rating:}, {id:, rating:}]
