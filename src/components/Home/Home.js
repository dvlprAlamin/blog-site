import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                setPosts(res.data)
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
        <div>
            {
                postToShow.map(({ id, title, body }) =>
                    <div key={id} style={{ width: 500, border: '1px solid #ddd', margin: '5px auto', padding: 10 }}>
                        <h2>{title}</h2>
                        <p>{body}</p>
                    </div>)
            }
            {
                showLoadMore && <button onClick={countBtnHandler}>Load More</button>
            }
        </div>
    );
};

export default Home;