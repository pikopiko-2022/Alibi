import React, { useEffect, useState } from 'react'
import { fetchComplaints } from '../../actions/complaints'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../widgets/Avatar'

const MostComplaints = () => {
  const dispatch = useDispatch()
  const flatmates = useSelector((state) => state.flatmates)
  const complaints = useSelector((state) => state.complaints)
  const token = useSelector((state) => state.user?.token)
  const [randomMate, updateRandomMate] = useState({})

  useEffect(() => {
    dispatch(fetchComplaints())
    // get all complaints
    // select complaint by complaint_raised_by and add to idcount
    // compare idcounts and select the highest
    // get complaint_raised_by from idcounts
    // get users based on complaint raised by
  }, [])

  return (
    <div>
      <blockquote>
        <h1>Flatting is Fun!</h1>
        <cite>-{randomMate.name}</cite>
      </blockquote>
      <div>
        <Avatar seedData={randomMate.img_seed} size={300} />
      </div>
    </div>
  )
}

export default MostComplaints
