import React from 'react'

const SelectOption = ({ issue }) => {
  return <option value={issue.id}>{issue.name}</option>
}

export default SelectOption
