/* eslint-disable react/jsx-key */
import React from 'react'
import { Slideshow, SlideshowItem } from './Slideshow'
import styles from './TheEnd.module.scss'
import ComplaintsUserCulprit from './ComplaintsUserCulprit'
import WhosBeenTalking from './WhosBeenTalking'
import YourRanking from './YourRanking'

const TheEnd = () => {
  const slides = [
    <YourRanking />,
    <WhosBeenTalking />,
    <ComplaintsUserCulprit />,
    <div style={{ backgroundColor: 'blue' }}>This</div>,
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
