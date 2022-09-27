/* eslint-disable react/jsx-key */
import React from 'react'
import { Slideshow, SlideshowItem } from './Slideshow'
import styles from './TheEnd.module.scss'
import WhosBeenTalking from './WhosBeenTalking'

const TheEnd = () => {
  const slides = [
    <WhosBeenTalking />,
    <div style={{ width: '600px', height: '600px', backgroundColor: 'blue' }}>
      This
    </div>,
  ]
  return (
    <div className={styles.slideshowContainer}>
      <Slideshow>
        {slides.map((slide, i) => (
          <SlideshowItem key={i} name={i}>
            {slide}
          </SlideshowItem>
        ))}
      </Slideshow>
    </div>
  )
}

export default TheEnd
