import React from 'react'
import { Link } from 'react-router-dom'

export default function View({ tweetId }) {
  return (
    <div className="d-flex">
        <Link to={`/tweet/${tweetId}`} className="me-2">View</Link>
    </div>
  )
}
