"use client";

import React, {useState, useEffect} from "react";

import useTweets from '../../../hooks/useTweets'

import Feed from "./Feed";
import ShareTweet from "./ShareTweet";

const TweetPage = () => {
  const { data, error, isLoading, mutate } = useTweets();
  // const [tweets, setTweets] = useState({});

  useEffect(() => {
    console.log(data, isLoading);
    // setTweets(data.data)
  }, [data, isLoading])

  // const updateFeed = (newTweet) => {
  //     setTweets([newTweet, ...tweets]);
  // };

  return (
    <>
      <ShareTweet/>
      {isLoading ? (
        <p>Loading...</p>
      ) :
      (
        <Feed tweets={data.data}/>
      )
      }
    </>
   );
}

export default TweetPage;
