import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/adventurer'
import React from 'react'

const Avatar = () => {
  let svg = createAvatar(style, { dataUri: true, size: 150 })
  return (
    <>
      <img src={svg} alt="Avatar" />
    </>
  )
}

export default Avatar
