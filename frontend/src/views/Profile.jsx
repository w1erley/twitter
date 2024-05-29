// Profile.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import FollowButton from '../components/FollowButton';
import axiosClient from '../axios-client';

const Profile = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('USER_OBJECT'));
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [isFollowed, setIsFollowed] = useState(null);
  const [followersCount, setFollowersCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    axiosClient.get(`/users/${userId}`)
      .then(response => {
        setUser(response.data);
        setIsFollowed(response.data.is_followed);
        setFollowersCount(response.data.followers_count);
        setLoading(false);
      })
      .catch(err => {
        setErrors(err);
        setLoading(false);
      });
  }, [userId]);

  const handleFollowUnFollow = (ev, action) => {
    ev.preventDefault();
    setErrors(null);
    axiosClient.post(`/users/${userId}/${action}`)
      .then(({ data }) => {
        setIsFollowed(data.is_followed);
        setFollowersCount(data.followers_count);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({ 'error': [response.data.message] });
          }
        }
      });
  };

  const onFollow = (ev) => handleFollowUnFollow(ev, 'follow');
  const onUnfollow = (ev) => handleFollowUnFollow(ev, 'unfollow');

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="card">
          <div className="px-3 pt-4 pb-2">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img style={{ width: '150px' }} className="me-3 avatar-sm rounded-circle" src={user.image} alt="User Avatar" />
                <div className="ms-2">
                  <h3 className="card-title mb-0">
                    <a href="#"> {user.username} </a>
                  </h3>
                  <span className="fs-6 text-muted"> {user.email} </span>
                </div>
              </div>
              {loggedInUser && loggedInUser.id === user.id && (
                <div className="">
                  {/* Use Link to navigate to /settings/profile */}
                  <Link to="/settings/profile">Edit</Link>
                </div>
              )}
            </div>
            <div className="px-2 mt-4">
              <h5 className="fs-5"> About : </h5>
              <p className="fs-6 fw-light"> {user.bio} </p>
              {loggedInUser && loggedInUser.id !== user.id && (
                <FollowButton
                  isFollowed={isFollowed}
                  followers={followersCount}
                  handleClick={isFollowed ? onUnfollow : onFollow}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
