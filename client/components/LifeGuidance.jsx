import React, { useEffect } from 'react'
import styles from './Flatmates.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLifeG } from '../actions/lifeG'

function LifeG() {
  const dispatch = useDispatch()
  const guidance = useSelector((state) => state.lifeG)
  useEffect(() => {
    dispatch(fetchLifeG())
  }, [])

  return (
    //takes answer output-bad:true
    //finds quesion id,
    <></>
  )
}

export default LifeG
