import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComplaint, sendComplaint } from '../apis/create'
import { fetchIssues } from '../actions/create'
import { fetchUser } from '../actions/users'
import styles from './Create.module.scss'

export default function Create() {
  const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const isLoading = false
  const error = false

  const user = useSelector((state) => state.users.user)

  const issues = useSelector((state) => state.create)

  useEffect(() => {
    dispatch(fetchIssues())
    dispatch(fetchUser())
  }, [])

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0])
    setPreviewURL(URL.createObjectURL(event.target.files[0]))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createComplaint({
      image: selectedFile,
    })
      .then((url) => {
        console.log(url)
        setUploadedImageUrl(url)
        sendComplaint({
          image: url,
          issue_id: selectedIssue,
          complaint_raised_by: user.id,
        })
      })
      // .then(() =>
      // sendComplaint({
      //   image: uploadedImageUrl,
      //   issue_id: selectedIssue,
      //   complaint_raised_by: user.id,
      // })
      // )
      .catch((err) => {
        console.error(err.message)
      })
    setSelectedFile(null)
    setPreviewURL(null)
  }

  const handleSelect = (event) => {
    console.log(event.target.value)
    setSelectedIssue(event.target.value)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className="issues">
          <select className="select" onChange={handleSelect}>
            {issues.map((issue) => (
              <option key={issue.id} value={issue.id}>
                {issue.name}
              </option>
            ))}
          </select>
          {/* <Select /> */}
        </div>
        <div className={styles.imageContainer}>
          {isLoading ? (
            <div>Loading...</div>
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
          <button onClick={handleSubmit} className={styles.addFoodButton}>
            ADD COMPLAINT
          </button>
        </div>
        <div className={styles.imageContainer}>
          <img
            alt="Uploaded"
            src={uploadedImageUrl}
            className={styles.previewImage}
          />
        </div>
      </form>
    </div>
  )
}
