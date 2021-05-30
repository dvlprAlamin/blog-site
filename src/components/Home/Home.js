import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Loader from '../Loader/Loader';

const Home = () => {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                setPosts(res.data)
                setLoading(false)
            })
    }, [])
    const postPerPage = 10;
    const [postToShow, setPostToShow] = useState([]);
    const [count, setCount] = useState(10)
    const [showLoadMore, setShowLoadMore] = useState(true)

    const addNewPost = (start, end) => {
        const newPost = posts.slice(start, end);
        setPostToShow(previousPost => [...previousPost, ...newPost]);
    }

    useEffect(() => {
        addNewPost(0, postPerPage);
    }, [posts])

    const countBtnHandler = () => {
        addNewPost(count, count + postPerPage);
        setCount(count + postPerPage);
        setShowLoadMore(count + postPerPage < posts.length)
    }


    return (
        <div className="container mt-4">
            {
                loading ? <Loader /> :
                    <>
                        <div className="row gy-4">
                            {
                                postToShow.map((post) =>
                                    <div key={post.id} className="col-sm-6">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h5 className="card-title">{post.title}</h5>
                                                <p className="card-text">{post.body}</p>
                                            </div>
                                            <div className="card-footer border-top-0 mb-2 text-center">
                                                <button
                                                    onClick={() => history.push(`/post/${post.id}`)}
                                                    className="btn btn-info text-white">View Details</button>
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </div>
                        <div className="text-center my-4">
                            {
                                showLoadMore && <button className="btn btn-primary" onClick={countBtnHandler}>Load More</button>
                            }
                        </div>
                    </>}
        </div>
    );
};

export default Home;