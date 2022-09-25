import React, { useEffect } from 'react'
import styles from './LifeGuidance.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLifeG } from '../actions/lifeG'

//Do I need a responses table?

function LifeGuidance({ lifeGuidance }) {
  // const dispatch = useDispatch()
  // const guidance = useSelector((state) => state.lifeG)
  // useEffect(() => {
  //   dispatch(fetchLifeG())
  // }, [])

  //-----foreach user(get responseID->get associated answerID, if answer.is_bad = true => next step),

  //Get answers.question_id -> get questions.issue_id -> display  life_guidances.message

  return (
    <>
      <div className={styles.lifeGuidanceContainer}>{lifeGuidance.message}</div>
    </>
  )
}

export default LifeGuidance
