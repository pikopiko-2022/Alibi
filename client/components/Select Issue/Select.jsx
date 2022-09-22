import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIssues } from '../../actions/create'
import SelectOption from './SelectOption'

const Select = ({ issues, onSelect }) => {
  // const dispatch = useDispatch()
  //const createComplaint = useSelector((state) => state.createComplaint)

  // useEffect(() => {
  //   dispatch(fetchIssues())
  // }, [])

  return (
    <select className="select" onChange={onSelect}>
      {issues.map((issue, id) => (
        <SelectOption key={id} issue={issue} />
      ))}
    </select>
  )
}

export default Select
