/* eslint-disable react/jsx-key */
import React, { useMemo, useEffect } from 'react'
import Milk from './Milk'
import FlatFun from './FlatFun'
import YourRanking from './YourRanking'
import HateEveryone from './HateEveryone'
import WorstFlatmate from './WorstFlatmate'
import MostComplaints from './MostComplaints'
import WhosBeenTalking from './WhosBeenTalking'
import { Slideshow, SlideshowItem } from './Slideshow'
import ComplaintsUserCulprit from './ComplaintsUserCulprit'
import styles from './TheEnd.module.scss'
import finalVid from '../../../server/public/videos/trash.mp4'

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
  const backgroundMusic = useMemo(
    () => new Audio('/assets/slide-music.mp3'),
    []
  )

  useEffect(() => {
    backgroundMusic.volume = 1
    backgroundMusic.loop = true
    backgroundMusic.play()
    return () => {
      backgroundMusic.pause()
      backgroundMusic.src = ''
    }
  }, [])

  return (
    <div className={styles.slideshowContainer}>
      <Slideshow>
        {slides.map((slide, i) => (
          <SlideshowItem key={i} name={i}>
            {slide}
          </SlideshowItem>
        ))}
      </Slideshow>
      <div className={styles.finalVid}>
        <video src={finalVid} autoPlay loop muted />
      </div>
    </div>
  )
}

export default TheEnd
