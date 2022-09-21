import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../actions/users'

function Flatmates() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <>
      <ul>
        <li>
          {todos.map((users) => (
            <ul key={users.id}>
              <li>
                <img
                  src={users.img_url}
                  alt="user"
                  height="300"
                  width="300"
                ></img>
              </li>
              <li>{users.name}</li>
              <li>{users.rating}</li>
            </ul>
          ))}
        </li>
      </ul>
    </>
  )
}

export default Flatmates
