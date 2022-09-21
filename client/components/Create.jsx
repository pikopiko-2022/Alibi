import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { setError, setLoading } from '../actions/create'
import { createComplaint } from '../apis/create'
import styles from './Create.module.scss'

export default function Create() {
  // const dispatch = useDispatch()
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)
  const isLoading = useSelector((state) => state.create.isLoading)
  const error = useSelector((state) => state.create.error)

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0])
    setPreviewURL(URL.createObjectURL(event.target.files[0]))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // dispatch(setLoading(true))
    createComplaint({ image: selectedFile })
      .then((res) => {
        console.log(res)
        // dispatch(setLoading(false))
        // dispatch(setLastUploaded(foods[foods.length - 1]))
      })
      .catch((err) => {
        console.error(err.message)
        // dispatch(setLoading(false))
        // dispatch(setError(err.message))
      })
    // setFood(initialData)
    setSelectedFile(null)
    setPreviewURL(null)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
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
          <button
            onClick={handleSubmit}
            // disabled={checkDisabled()}
            className={styles.addFoodButton}
          >
            ADD COMPLAINT
          </button>
        </div>
      </form>
    </div>
  )
}
