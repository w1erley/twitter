import React from 'react'

export default function FollowButton({isFollowed, followers, handleClick}) {
    return (
        <>
            <div className="d-flex justify-content-between mt-3">
                {isFollowed ? (
                    <button onClick={handleClick} className="btn btn-danger btn-sm">Unfollow</button>
                ) : (
                    <button onClick={handleClick} className="btn btn-primary btn-sm">Follow</button>
                )}
                <div className="ms-3">
                    {followers}
                </div>
            </div>
        </>
    )
}
