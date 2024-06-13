"use client";

import React, { useEffect, useState } from 'react';

import useUser from '../../../hooks/useUser';

import { getSession } from 'next-auth/react';

import axios from 'axios';

import Link from 'next/link';
import FollowBox from "./FollowBox";

const UserPage = ({ username }) => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Unified isLoading state

  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/users/username/${username}`);
        const session = await getSession();
        setUserId(response.data.id);
        setSession(session);
      } catch (err) {
        console.error("Couldn't fetch user id");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserId();
  }, [username]);

  const { data: user, isLoading: userLoading, mutate } = useUser(userId);

  if (isLoading || userLoading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="card">
      <div className="px-3 pt-4 pb-2">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img style={{ width: '150px' }} className="me-3 avatar-sm rounded-circle" src={`http://localhost:8000/storage/${user.image}`} alt="User Avatar" />
            <div className="ms-2">
              <h3 className="card-title mb-0">
                <a href="#"> {user.name} </a>
              </h3>
              <div className="">
                <span className="fs-6 text-muted d-block"> @{user.username} </span>
              </div>
            </div>
          </div>
          {session && session.user.username === user.username ? (
            <div className="">
              <Link href="/settings/profile">Edit</Link>
            </div>
          ) : (
            <FollowBox user={user} />
          )}
        </div>
        <div className="px-2 mt-4">
          <h5 className="fs-5"> About : </h5>
          <p className="fs-6 fw-light"> {user.bio} </p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
