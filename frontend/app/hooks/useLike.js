import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import useTweet from "./useTweet";
import useTweets from "./useTweets";

const useLike = (tweetId) => {
  const { data: fetchedPost, mutate: mutateFetchedPost } = useTweet(tweetId);
  const { mutate: mutateFetchedPosts } = useTweets();

  const hasLiked = useMemo(() => {
    return fetchedPost?.data.is_liked;
  }, [fetchedPost]);

  const toggleLike = useCallback(async () => {
    try {
      let request;

      if (hasLiked) {
        request = () => axios.post(`/api/tweets/${tweetId}/unlike`);
      } else {
        request = () => axios.post(`/api/tweets/${tweetId}/like`);
      }

      await request();

      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [hasLiked, tweetId, mutateFetchedPosts, mutateFetchedPost]);

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike;
