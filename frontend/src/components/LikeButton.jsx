import React, { useState } from 'react'
import { faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LikeButton({handleClick, likes, isLiked}) {

    return (
        <div>
            <button onClick={handleClick} type="button" className="fw-light nav-link fs-6">
                <FontAwesomeIcon className='me-1' icon={isLiked ? solidHeart : regularHeart} />
                {likes}
            </button>
            {/* <span className="fas fa-heart me-1"></span> */}
        </div>


    )
}
