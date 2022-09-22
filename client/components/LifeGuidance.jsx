import React, { useEffect } from 'react'
import styles from './Flatmates.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLifeG } from '../actions/lifeG'

//Do I need a responses table?

function Life_Guidance() {
  const dispatch = useDispatch()
  const guidance = useSelector((state) => state.lifeG)
  useEffect(() => {
    dispatch(fetchLifeG())
  }, [])

  return (
    //-----foreach user(get responseID->get associated answerID, if answer.is_bad = true => next step),

    //Get answers.question_id -> get questions.issue_id -> display  life_guidances.message

    <>
      <div>{guidance.message}</div>
    </>
  )
}

export default Life_Guidance
