'use client';

import React, { useState, useCallback } from 'react';

import axios from 'axios';

import useLike from '../../../hooks/useLike';

import { toast } from 'react-hot-toast';
import { formatDistanceToNow  } from 'date-fns';

import View from './View';
import Comments from './Comments';
import LikeButton from './LikeButton';
import Link from 'next/link';


const TweetCard = ({ tweet, showViewComponent }) => {
    const [isLiked, setIsLiked] = useState(tweet.is_liked);
    const {hasLiked, toggleLike} = useLike(tweet.id);

    function Capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const onLike = useCallback(async (ev) => {
      ev.stopPropagation();
      toggleLike();
      console.log(hasLiked)
    }, [toggleLike]);

    // const handleLikeUnlike = (ev, action) => {
    //     ev.preventDefault();

    //     axios.post(`/api/tweets/${tweet.id}/${action}`)
    //         .then(({ data }) => {
    //           setIsLiked(data.isLiked);
    //           setLikesCount(data.likesCount);
    //           toast.success(Capitalize(`${action}d!`));
    //         })
    //         .catch(err => {
    //           toast.error('Something went wrong!');
    //         });
    // };

    // const onLike = (ev) => handleLikeUnlike(ev, 'like');
    // const onUnlike = (ev) => handleLikeUnlike(ev, 'unlike');

    return (
        <div className="card">
            <div className="px-3 pt-4 pb-2">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        {/* <img style={{width: '50px'}} className="me-2 avatar-sm rounded-circle"
                        src="#" alt={tweet.user.name}/> */}
                        <div>
                            <h5 className="card-title mb-0">
                                <Link href={`/${tweet.user.username}`}>{tweet.user.name}</Link>
                            </h5>
                        </div>
                    </div>
                    {showViewComponent && <View tweetId={tweet.id}/>}
                </div>
            </div>
            <div className="card-body">
                <p className="fs-6 fw-light text-muted">
                    { tweet.content }
                </p>
                <div className="d-flex justify-content-between">
                    <LikeButton
                        handleClick={onLike}
                        // handleClick={isLiked}
                        likes={tweet.likes_count}
                        isLiked={hasLiked}
                    />
                    <div>
                        <span suppressHydrationWarning className="fs-6 fw-light text-muted">
                          {formatDistanceToNow(new Date(tweet.created_at), 'MM/dd/yyyy, HH:mm:ss')} ago
                        </span>
                    </div>
                </div>
                {/* <div>Comments: {JSON.stringify(tweet)}</div> */}
                <Comments tweet={tweet} />
            </div>
        </div>
    );
};

export default TweetCard;
