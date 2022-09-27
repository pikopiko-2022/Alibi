import React, { useEffect, useState } from 'react'
import { fetchComplaintCount } from '../../actions/complaints'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../widgets/Avatar'

const MostComplaints = () => {
  const dispatch = useDispatch()
  const complaints = useSelector((state) => state.complaints)
  const token = useSelector((state) => state.user?.token)
  const [whinger, updateWhinger] = useState([])

  useEffect(() => {
    dispatch(fetchComplaintCount(token))
    updateWhinger(complaints[0])
  }, [])
  console.log(complaints)
  return (
    <div>
      <h1>Whiniest Flatmate</h1>
      <div>-{whinger.name}</div>
      <div>
        <Avatar seedData={whinger.img_seed} size={300} />
      </div>
      <h1>Number Of Complaints</h1>
      <div>{whinger.count}</div>
    </div>
  )
}

export default MostComplaints
