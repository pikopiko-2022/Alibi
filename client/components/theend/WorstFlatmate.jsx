import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../widgets/Avatar'
import styles from './TheEnd.module.scss'

const WorstFlatmate = () => {
  const flatmates = useSelector((state) => state.flatmates)

  const badUser = flatmates.sort((a, b) => a.rating - b.rating)[0] || {}
  console.log(badUser)

  return (
    <>
      <div
        className={styles.slideContainer}
        style={{ backgroundColor: '#3B1A8C' }}
      >
        <h1 style={{ color: 'white', margin: '30px' }}>Worst Flatmate</h1>
        <div>
          <h2 style={{ color: 'white', margin: '30px' }}>{badUser.name}</h2>
        </div>
        <div>
          <p>Rating: {badUser.rating}</p>
        </div>
        <div>
          <Avatar seedData={badUser.img_seed} size={300} />
        </div>
        <div>
          <ul>
            <li>Other Users</li>
            {flatmates.map((item) => {
              return (
                item.id != badUser.id && (
                  <li>
                    name: {item.name} rating: {item.rating}
                    <div>
                      <Avatar seedData={item.img_seed} size={150} />
                    </div>
                  </li>
                )
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default WorstFlatmate
