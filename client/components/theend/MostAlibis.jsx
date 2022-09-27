import React, { useEffect, useState } from 'react'
//import { fetchFlatmates } from '../../actions/flatmates'
//import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { getAlibiFlatmate } from '../../apis/flatmatesApi'
import Avatar from '../widgets/Avatar'

const mostAlibis = () => {
  //const socket = io()
  //const dispatch = useDispatch()
  const flatmates = useSelector((state) => state.flatmates)
  //const token = useSelector((state) => state.user?.token)
  const [alibiUser, updateAlibiUser] = useState({})

  useEffect(() => {
    getAlibiFlatmate()
      .then((userId) => {
        const alibiUser = flatmates.find((flatmates) => (flatmates.id = userId))
        updateAlibiUser(alibiUser)
        console.log(alibiUser)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }, [])

  return (
    <>
      <h1>The flatmate with the most alibis</h1>
      <div>
        <h2>{alibiUser.name}</h2>
      </div>
      <div>
        <Avatar seedData={alibiUser.img_seed} size={300} />
      </div>
      <div>
        <p>Flatmate rating: {alibiUser.rating}</p>
      </div>
      <div>
        <ul>
          <li>Other Users</li>
          {flatmates.map((item) => {
            if (item.id != alibiUser.id) {
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

export default mostAlibis
