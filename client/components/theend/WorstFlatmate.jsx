import React, { useEffect, useState } from 'react'
import { fetchFlatmates } from '../../actions/flatmates'
import { useSelector, useDispatch } from 'react-redux'

const WorstFlatmate = () => {
  const dispatch = useDispatch()
  const flatmates = useSelector((state) => state.flatmates)
  const token = useSelector((state) => state.user?.token)
  const [badUser, updateBadUser] = useState({})

  useEffect(() => {
    dispatch(fetchFlatmates(token))
    let mateA = null
    let mateB = 0
    flatmates.forEach((element) => {
      mateB = element.rating
      if (mateB < mateA) {
        mateA = mateB
      }
    })
    flatmates.forEach((element) => {
      if ((element.rating = mateA)) {
        updateBadUser(element)
        //nothing if they have the same rating
      }
    })
  }, [])

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
            return (
              item.id != badUser.id && (
                <li>
                  name: {item.name} rating: {item.rating}
                </li>
              )
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default WorstFlatmate
