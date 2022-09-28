import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createComplaint } from '../../apis/complaintsApi'
import styles from './Complaint.module.scss'
import appStyles from '../App.module.scss'
import LoadingSpinner from '../widgets/LoadingSpinner'

export default function Complaint() {
  const token = useSelector((state) => state?.user?.token)
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const user = useSelector((state) => state.user)
  const issues = useSelector((state) => state.issues)

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0])
    setPreviewURL(URL.createObjectURL(event.target.files[0]))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)
    createComplaint(
      {
        image: selectedFile,
        issue_id: selectedIssue,
        complaint_raised_by: user.id,
      },
      token
    )
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        setError(err.message)
        console.error(err.message)
      })
  }

  const handleSelect = (event) => {
    setSelectedIssue(event.target.value)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className="issues">
          <select className="select" onChange={handleSelect} defaultValue="">
            <option value="" disabled hidden>
              Pick an issue
            </option>
            {issues.map((issue) => (
              <option key={issue.id} value={issue.id}>
                {issue.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.imageContainer}>
          {isLoading ? (
            <LoadingSpinner />
          ) : previewURL ? (
            <img
              alt="Preview"
              src={previewURL}
              className={styles.previewImage}
            />
          ) : error ? (
            <div className={styles.previewPlaceholder}>
              <div className={styles.errorText}>! ERROR !</div>
              <div className={styles.errorMessage}>{error}</div>
            </div>
          ) : (
            <div className={styles.previewPlaceholder}>
              <div className={styles.previewPlaceholderText}>
                NO IMAGE SELECTED
              </div>
            </div>
          )}
        </div>
        <div>
          <label htmlFor="image">
            Add Image:
            <input
              id="image"
              name="image"
              type="file"
              value={''}
              onChange={handleFileInput}
              accept="image/*"
              className={styles.addImageInput}
            />
          </label>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className={appStyles.actionButton}
            disabled={!selectedIssue}
          >
            ADD COMPLAINT
          </button>
        </div>
      </form>
    </div>
  )
}
