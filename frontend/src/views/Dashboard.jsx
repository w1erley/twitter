import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

export default function Dashboard() {
    const {user, token} = useStateContext();

    return (
        <div>
            <h1>
                Dashboard
            </h1>
            <div className="content">
                You are authenticated to twitter, your name is {user.username}
            </div>
        </div>
    )
}
