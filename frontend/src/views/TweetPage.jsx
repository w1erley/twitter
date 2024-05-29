import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import TweetCard from '../components/TweetCard';
import axiosClient from '../axios-client';

export default function Tweet() {
    const { tweetId } = useParams();
    const [tweet, setTweet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        axiosClient.get(`/tweets/${tweetId}`)
            .then(response => {
                console.log(response);
                setTweet(response.data);
                setLoading(false);
            })
            .catch(err => {
                setErrors(err);
                setLoading(false);
            });
    }, [tweetId]);

    return (
        <>
            {loading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <TweetCard tweet={tweet}>
                </TweetCard>
            )}

        </>
    )
}
