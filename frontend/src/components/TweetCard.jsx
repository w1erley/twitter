import React, { useEffect, useState } from 'react';
import LikeButton from './LikeButton';
import axiosClient from '../axios-client';
import View from './View';

const TweetCard = ({ tweet, showViewComponent }) => {
    const [errors, setErrors] = useState();
    const [isLiked, setIsLiked] = useState(tweet.is_liked);
    const [likesCount, setLikesCount] = useState(tweet.likes_count);

    const handleLikeUnlike = (ev, action) => {
        ev.preventDefault();

        setErrors(null);

        axiosClient.post(`/tweets/${tweet.id}/${action}`)
            .then(({ data }) => {
                setIsLiked(data.isLiked);
                setLikesCount(data.likesCount);
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            'error': [response.data.message]
                        });
                    }
                }
            });
    };

    const onLike = (ev) => handleLikeUnlike(ev, 'like');
    const onUnlike = (ev) => handleLikeUnlike(ev, 'unlike');

    return (
        <div className="card">
            <div className="px-3 pt-4 pb-2">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        {/* <img style={{width: '50px'}} className="me-2 avatar-sm rounded-circle"
                        src="#" alt={tweet.user.name}/> */}
                        <div>
                            <h5 className="card-title mb-0">
                                <a href="#"> {tweet.user.name}</a>
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
                {errors &&
                    <div>
                        {Object.values(errors).map((err, index) => (
                        <p key={index} className="text-danger">{err}</p>
                        ))}
                    </div>
                }
                <div className="d-flex justify-content-between">
                    <LikeButton
                        handleClick={isLiked ? onUnlike : onLike}
                        likes={likesCount}
                        isLiked={isLiked}
                    />
                    <div>
                        <span className="fs-6 fw-light text-muted">
                            { new Date(tweet.created_at).toLocaleString()}
                        </span>
                    </div>
                </div>
                {/* comment */}
            </div>
        </div>
    );
};

export default TweetCard;
