import React, { useEffect } from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'

import Navbar from './Navbar';
import Notification from './Notification';
import { useStateContext } from '../contexts/ContextProvider'

import axiosClient from '../axios-client';

export default function DefaultLayout() {
    const {user, token, notification, setUser, setToken} = useStateContext();

    if (!token) {
        return <Navigate to="/login"/>
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }

    // useEffect(() => {
    //     axiosClient.get('/user')
    //     .then(({data}) => {
    //         setUser(data)
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })
    // }, [])

    return (
        <div id="defaultLayout">
            <Navbar isAuthenticated={true} username={user.username} onLogout={onLogout}></Navbar>
            <div className="container py-4">
                <main>
                    <Outlet/>
                </main>
            </div>

            <Notification></Notification>
        </div>
    )
}
