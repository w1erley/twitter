'use client';

import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

export default function LikeButton({handleClick, likes, isLiked}) {
  const iconStyle = { fontSize: '15px', verticalAlign: 'middle'};

    return (
        <div>
            <button onClick={handleClick} type="button" className="fw-light nav-link fs-6 d-flex align-items-center">
                <div className='d-flex align-items-center'>
                  {isLiked ? <FaHeart style={iconStyle} fill={'#AE2121'}/> : <FaRegHeart style={iconStyle}/>}
                </div>
                <span className='p-0 ms-2 line-height-base'>{likes}</span>
            </button>
        </div>
    )
}
