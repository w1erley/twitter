import React, { useState, useEffect } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import ShareTweet from '../components/ShareTweet';
import Feed from '../components/Feed';

export default function Dashboard() {
    const {user, token} = useStateContext();
    const [tweets, setTweets] = useState([]);

    const updateFeed = (newTweet) => {
        setTweets([newTweet, ...tweets]);
    };

    return (
        <div>
            <h1>
                Dashboard
            </h1>
            <ShareTweet updateFeed={updateFeed}/>
            <Feed newTweet={tweets}/>
        </div>
    )
}
