'use client';

import React, { act, useState } from 'react'

import axios from 'axios';
import toast from 'react-hot-toast';

import FollowButton from './FollowButton'

export default function FollowBox({user}) {
  const [isFollowed, SetIsFollowed] = useState(user.is_followed);
  const [followers, SetFollowers] = useState(Number(user.followers_count));

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleFollowUnFollow = (ev, action) => {
    ev.preventDefault();
    axios.post(`/api/users/${user.id}/${action}`)
      .then(({ data }) => {
        SetIsFollowed(data.is_followed);
        SetFollowers(data.followers_count);
        toast.success(Capitalize(`${action}ed!`));
      })
      .catch(err => {
        toast.error(err);
      });
  };

  const onFollow = (ev) => handleFollowUnFollow(ev, 'follow');
  const onUnfollow = (ev) => handleFollowUnFollow(ev, 'unfollow');

  return (
    <>
      <div className="d-flex justify-content-between mt-3">
          <FollowButton
            isFollowed={isFollowed}
            handleClick={isFollowed ? onUnfollow : onFollow}
          />
          <div className="ms-3">
              {followers}
          </div>
      </div>
    </>
  )
}
