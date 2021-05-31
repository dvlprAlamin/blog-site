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
    return (
        <div className="container mt-5">
            {
                (comments.length === 0 || post === {}) ? <Loader /> :
                    <>

                        <h6>User ID: {post.userId}</h6>
                        <h2 className="text-info">{post.title}</h2>
                        <p>{post.body}</p>
                        <h4 className="mt-4">Comments:</h4>
                        {
                            comments.map(({ id, name, email, body }) =>
                                <div className="border-bottom my-2 py-3" key={id}>
                                    <h5>{name}</h5>
                                    <h6>{email}</h6>
                                    <p>{body}</p>
                                </div>)
                        }
                    </>
            }
        </div>
    );
};

export default PostDetails;