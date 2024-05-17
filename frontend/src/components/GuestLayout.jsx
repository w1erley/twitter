import React from 'react'

import Navbar from './Navbar';
import { Outlet, Navigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';

export default function GuestLayout() {
    const {token} = useStateContext();

    if (token) {
        return <Navigate to="/"/>
    }

  return (
    <div id="guestLayout">
        <Navbar isAuthenticated={false}></Navbar>
        <div className="container py-4">
            <main>
                <Outlet/>
            </main>
        </div>
    </div>
  )
}
