import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResolvedPath } from 'react-router-dom'
import { fetchUsers } from '../actions/users'

const Waiting = () => {
  const token = useSelector((state) => state.user?.token)
  const users = useSelector((state)=> state.users)
  const dispatch = useDispatch()
  const [bomb, setBomb] = useState(false)

  const nuclear = () => {
    const count = 0
    dispatch(fetchUsers(token))=>{
      users.map((item)=>{
        if(item.had_enough == true ){
          count++
          if(count == users.length){
setBomb(true)
          }
        }
      })

    }
    
  }

  return (
    <>{bomb ? true : <TheEnd/>}:
      <div>Your Flatmates Still Like You.......</div>
      <div>Please Wait</div>
    </>
  )
}

export default Waiting
