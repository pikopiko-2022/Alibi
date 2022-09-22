import React from 'react'
import styles from './Rating.module.scss'

const Rating = ({ rating, total }) => {
  const ratingArray = getRatingArray(rating, total)
  return (
    <div className={styles.ratingContainer}>
      {ratingArray?.map((on, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg">
          <polygon
            className={on ? styles.starOn : styles.starOff}
            points="19,0,24.290067270632257,11.718847050625474,37.07007380960792,13.128677106875998,27.559508646656383,21.781152949374526,30.16791979355699,34.371322893124,19,28,7.832080206443013,34.371322893124,10.440491353343619,21.78115294937453,0.9299261903920808,13.128677106876003,13.70993272936774,11.718847050625474"
          ></polygon>
        </svg>
      ))}
    </div>
  )
}

function getRatingArray(rating, total) {
  return Array.from({ length: total }, (x, i) => (i < rating ? true : false))
}

export default Rating
