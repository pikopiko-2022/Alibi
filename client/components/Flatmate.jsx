import React from 'react'
import styles from './Flatmate.module.scss'

const Flatmate = ({ flatmate }) => {
  return (
    <ul key={flatmate.id}>
      <li>
        <img src={flatmate.img_url} alt="user" height="300" width="300"></img>
      </li>
      <li>{flatmate.name}</li>
      <li>{flatmate.rating}</li>
    </ul>
  )
}

export default Flatmate
