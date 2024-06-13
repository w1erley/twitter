'use client';

import { useEffect, useState } from 'react';
import TweetCard from './TweetCard';

export default function Feed({tweets}) {
  const [_tweets, setTweets] = useState(tweets);

  useEffect(() => {
    setTweets(tweets);
  }, [tweets])

  return (
    <>
      {_tweets.length > 0 ? (
          <div className="">
              {_tweets.map((tweet) => (
                  <div key={tweet.id} className="mt-3">
                      <TweetCard tweet={tweet} showViewComponent={true}/>
                  </div>
              ))}
          </div>
      ) : (
          <p>No tweets</p>
      )}
      {/* {totalPages > 1 && (
          <div className="pagination mt-3">
              {Array.from({ length: totalPages }, (_, index) => (
                  <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`btn ${page === index + 1 ? 'btn-primary' : 'btn-secondary'} me-1`}
                  >
                      {index + 1}
                  </button>
              ))}
          </div>
      )} */}
  </>
  )
}
