import React, { useEffect } from 'react'
import { fetchComplaintCount } from '../../actions/complaints'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../widgets/Avatar'
import styles from './TheEnd.module.scss'

const MostComplaints = () => {
  const dispatch = useDispatch()
  const complaints = useSelector((state) => state.complaints)
  const token = useSelector((state) => state.user?.token)
  // const [whinger, updateWhinger] = useState({})

  useEffect(() => {
    dispatch(fetchComplaintCount(token))
  }, [])
  const whinger = complaints[0] || {}
  return (
    <div
      className={styles.slideContainer}
      style={{ backgroundColor: '#E23468' }}
    >
      <h1 style={{ color: 'white', margin: '30px' }}>Whiniest Flatmate</h1>
      <div>-{whinger.name}</div>
      <div>
        <Avatar seedData={whinger.img_seed} size={300} />
      </div>
      <div>
        <h2 style={{ color: 'white', margin: '30px' }}>
          Number Of Complaints
          {whinger.count}
        </h2>
      </div>
    </div>
  )
}

export default MostComplaints
