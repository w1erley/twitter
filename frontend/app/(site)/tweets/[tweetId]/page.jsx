'use client'

import { useEffect } from "react";

import TweetCard from "../../dashboard/components/TweetCard";
// import getTweetById from "@/app/api/actions/getTweetById";
// import getTweetById from "../../../api/actions/getTweetById";
import useTweet from '../../../hooks/useTweet';


const TweetPage = ({params}) => {
  const { data, isLoading} = useTweet(params.tweetId)

  return (
    <>
      {isLoading ?
      (
        <p>Loading...</p>
      )
      :
      (
        <TweetCard tweet={data.data} showViewComponent={true}/>
      )}
    </>
   );
}

export default TweetPage;
