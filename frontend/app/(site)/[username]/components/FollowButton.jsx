import React from 'react'

export default function FollowButton({isFollowed, handleClick}) {
  return (
    <>
      {isFollowed ? (
        <button onClick={handleClick} className="btn btn-danger btn-sm">Unfollow</button>
      ) : (
        <button onClick={handleClick} className="btn btn-primary btn-sm">Follow</button>
      )}
    </>
  )
}
