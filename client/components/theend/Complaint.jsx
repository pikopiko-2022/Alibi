import React from 'react'
import { useSelector } from 'react-redux'
import styles from './Complaint.module.scss'

const Complaint = ({ complaint }) => {
  const flatmates = useSelector((state) => state.flatmates)
  const issues = useSelector((state) => state.issues)
  const complainant = flatmates.find(
    (flatmate) => flatmate.id === complaint?.complaint_raised_by
  )
  console.log(complaint)
  const issue = issues.find((issue) => issue.id === complaint?.issue_id)
  return (
    <div>
      <div>{`${complainant?.name} had an issue with this!`}</div>
      <div>{`${issue?.name}`}</div>
      <div className={styles.complaintImageContainer}>
        <img
          className={styles.complaintImage}
          alt="Complaint"
          src={complaint?.image}
        />
      </div>
    </div>
  )
}

export default Complaint
