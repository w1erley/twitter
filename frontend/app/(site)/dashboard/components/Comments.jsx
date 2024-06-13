'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import useTweet from "../../../hooks/useTweet";
import useTweets from "../../../hooks/useTweets";

const Comments = ({ tweet }) => {
    const { mutate: mutateFetchedPost } = useTweet(tweet.id);
    const { mutate: mutateFetchedPosts } = useTweets();

    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/tweets/${tweet.id}/comments`, { content: newComment })
            .then(response => {
                setNewComment('');
                mutateFetchedPost();
                mutateFetchedPosts();
                toast.success('Commented!');
            })
            .catch(err => toast.error('Failed to post comment.'));
    };

    return (
      <div className="comments-section">
          <ul>
              {tweet.comments.map(comment => (
                  <li key={comment.id}>
                      <strong>{comment.user.name}:</strong> {comment.content}
                  </li>
              ))}
          </ul>
              <div className="d-flex">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className='form-control me-3'
                />
                <button className='btn btn-dark' onClick={handleCommentSubmit}>Comment</button>
              </div>
      </div>
    );
};

export default Comments;
