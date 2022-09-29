import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Complaint from './Complaint'
import { getComplaintsForUserCulprit } from '../../apis/complaintsApi'
import { getRandomNumber } from '../../apis/messagesApi'
import styles from './TheEnd.module.scss'

const ComplaintsUserCulprit = () => {
  const [complaint, setComplaint] = useState(null)
  const token = useSelector((state) => state.user?.token)

  useEffect(() => {
    getComplaintsForUserCulprit(token)
      .then((complaints) => {
        setComplaint(complaints?.[getRandomNumber(0, complaints?.length - 1)])
      })
      .catch((err) => console.error(err.message))
  }, [])

  return (
    <div
      className={styles.slideContainer}
      style={{ backgroundColor: '#E23468' }}
    >
      {complaint ? (
        <>
          <div
            className={styles.slideTitle}
          >{`YOU WERE ALWAYS GETTING THINGS WRONG!`}</div>
          <div className={styles.slideTitle}>
            {`Here's one thing you did that really got on your flatmates' nerves!`}
          </div>
          <Complaint complaint={complaint} />{' '}
        </>
      ) : (
        <>
          <div
            className={styles.slideTitle}
          >{`YOU DIDN'T HAVE ANY COMPLAINTS AGAINST YOU!`}</div>
          <div className={styles.slideTitle}>{`You're perfect <3`}</div>
        </>
      )}
    </div>
  )
}

export default ComplaintsUserCulprit
