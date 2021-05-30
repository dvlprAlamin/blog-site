import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from '../Loader/Loader';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => {
                setPost(res.data);
            })
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(res => {
                setComments(res.data)
            })
    }, [id])
    console.log(post, comments);

    return (
        <div className="container">
            {
                (comments.length === 0 || post === {}) ? <Loader /> :
                    <>
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                        <h2>Comments:</h2>
                        {
                            comments.map(({ id, name, email, body }) =>
                                <div className="border my-2 p-3" key={id}>
                                    <h4>{name}</h4>
                                    <h5>{email}</h5>
                                    <p>{body}</p>
                                </div>)
                        }
                    </>
            }
        </div>
    );
};

export default PostDetails;