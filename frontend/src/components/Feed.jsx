import React, { useState, useEffect} from 'react'
import axiosClient from '../axios-client';
import TweetCard from './TweetCard';

export default function Feed({newTweet}) {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchTweets();
    }, [page, newTweet]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        console.log(`Page changing to ${newPage}`)
    };

    const fetchTweets = () => {
        setLoading(true);
        axiosClient.get('/tweets', {params: {page}})
        .then(({data}) => {
            setTweets(data.data);
            console.log(tweets);
            // setPage(data.page);
            setTotalPages(data.last_page);
        })
        .catch(err => {
            const response = err.response;
            console.log(response)
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setErrors(response.data.errors)
                }
            }
            else {
                console.log('in else');
                setErrors({
                    error: [response.data.message]
                });
                console.log(errors);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <div>
        {loading && <p>Loading tweets...</p>}
        {errors && <div>
            {Object.values(errors).map((err, index) => (
            <p key={index} className="text-danger">{err}</p>
            ))}
        </div>}
        {!loading && tweets.length > 0 ? (
            <div className="">
                {tweets.map((tweet) => (
                    <div key={tweet.id} className="mt-3">
                        <TweetCard tweet={tweet} showViewComponent={true}/>
                    </div>
                ))}
            </div>
        ) : (
            !loading && <p>No tweets</p>
        )}
        {totalPages > 1 && (
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
        )}
    </div>
    )
}
