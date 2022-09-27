/* eslint-disable react/jsx-key */
import React from 'react'
import { Slideshow, SlideshowItem } from './Slideshow'
import styles from './TheEnd.module.scss'
import ComplaintsUserCulprit from './ComplaintsUserCulprit'
import WhosBeenTalking from './WhosBeenTalking'
import YourRanking from './YourRanking'
import WorstFlatmate from './WorstFlatmate'
import FlatFun from './FlatFun'
import MostComplaints from './MostComplaints'
import HateEveryone from './HateEveryone'
import Milk from './Milk'

const TheEnd = () => {
  const slides = [
    <FlatFun />,
    <YourRanking />,
    <MostComplaints />,
    <WhosBeenTalking />,
    <HateEveryone />,
    <WorstFlatmate />,
    <Milk />,
    <ComplaintsUserCulprit />,
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