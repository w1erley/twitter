import React from 'react'

export default function Notification({notification}) {
  return (
    <>
        {notification &&
            <div className="notification">
                {notification}
            </div>
        }
    </>
  )
}
