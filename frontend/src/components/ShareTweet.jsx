import React, { useState, useContext } from 'react';
import { useStateContext } from '../contexts/ContextProvider'; // Assume you have an AuthContext to provide authentication state
import axiosClient from '../axios-client';

const ShareTweet = ({ updateFeed }) => {
    const {user, token, setNotification} = useStateContext(); // Get authentication state from context
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState('');

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            content: content,
        }

        setErrors(null)

        axiosClient.post('/tweets/store', payload)
        .then(({data}) => {
            console.log(data);
            updateFeed(data.tweet);
            setContent('');
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors)
                }
                else {
                    setErrors({
                        'error': [response.data.message]
                    })
                }
            }
        })
    }

    return (
        <>
        {token ? (
            <div>
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
                        {errors && <div className="d-block fs-6 text-danger mt-2">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                            </div>
                        }
                    </div>
                    <button type="submit" className="btn btn-dark">Share</button>
                </form>
            </div>
            </div>
        ) : (
            <h4>Login to share tweet</h4>
        )}
        </>
    );
};

export default ShareTweet;
