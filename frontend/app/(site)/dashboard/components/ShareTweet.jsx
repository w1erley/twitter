'use client';

import React, { useState } from 'react';
import axios from 'axios';

import useTweets from '../../../hooks/useTweets'

import { toast } from 'react-hot-toast';

const ShareTweet = () => {
    const [content, setContent] = useState('');

    const {mutate} = useTweets();

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            content: content,
        }

        axios.post('/api/tweets', payload)
        .then(({data}) => {
            console.log(data);
            // updateFeed(data.tweet);
            setContent('');
            mutate();
        })
        .catch(err => {
          toast.error('Something went wrong!');
          console.log(err);
            // const response = err.response;
            // if (response && response.status === 422) {
            //     if (response.data.errors) {
            //         setErrors(response.data.errors)
            //     }
            //     else {
            //         setErrors({
            //             'error': [response.data.message]
            //         })
            //     }
            // }
        })
    }

    return (
      <>
        <h4>Share your tweets</h4>
        <div className="row">
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <textarea
                    name="content"
                    className="form-control"
                    id="idea"
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-dark">Share</button>
            </form>
        </div>
      </>
    );
};

export default ShareTweet;
