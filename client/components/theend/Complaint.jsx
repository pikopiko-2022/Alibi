import React from 'react'
import { useSelector } from 'react-redux'
import styles from './Complaint.module.scss'

const Complaint = ({ complaint }) => {
  const flatmates = useSelector((state) => state.flatmates)
  const issues = useSelector((state) => state.issues)

  const issue = issues.find((issue) => issue.id === complaint?.issue_id)

  const complainant = flatmates.find(
    (flatmate) => flatmate.id === complaint?.complaint_raised_by
  )
  return (
    <div>
      <div className={styles.complaintText}>
        <div>{`${complainant?.name} had an issue with this!`}</div>
        <div className={styles.complaintIssue}>{`${issue?.name}`}</div>
      </div>
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
