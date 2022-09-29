import React from 'react'
import styles from './LoadingSpinner.module.scss'

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div
        className={styles.loadingSpinner}
        role="alert"
        aria-label="Loading"
      />
    </div>
  )
}

export default LoadingSpinner
