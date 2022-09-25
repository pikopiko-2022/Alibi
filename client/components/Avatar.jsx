import React from 'react'

const Avatar = ({ seedData, size = 150 }) => {
  // let svg = createAvatar(style, {
  //   seed: `${seedData}`,
  //   dataUri: true,
  //   size: 150,
  // })

  return (
    <>
      <img
        src={`https://avatars.dicebear.com/api/adventurer/${seedData}.svg?size=${size}`}
        alt="test Avatar"
      />
    </>
  )
}

export default Avatar
