'use client';

import React from 'react'
import Link from "next/link";

export default function View({ tweetId }) {
  return (
    <div className="d-flex">
        <Link href={`/tweets/${tweetId}`} className="me-2">View</Link>
    </div>
  )
}
