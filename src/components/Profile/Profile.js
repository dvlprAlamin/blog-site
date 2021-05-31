import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useMyContext } from '../../context';
import Loader from '../Loader/Loader';
import EditPostModal from './EditPostModal';

const Profile = () => {
    const { userPosts, setUserPosts } = useMyContext();
    const { editPostHandler } = useMyContext();
    const titleRef = useRef();
    const bodyRef = useRef();
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false)
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts?userId=2')
            .then(res => {
                setUserPosts(res.data);
                setLoading(false)
            })
    }, [setUserPosts]);

    const postDeleteHandler = id => {
        setProcessing(true)
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => {
                if (res.data) {
                    setUserPosts(previousPost => previousPost.filter(post => post.id !== id))
                    setProcessing(false)
                }
            })
    }

    const addPostHandler = e => {
        e.preventDefault();
        setProcessing(true)
        const postData = {
            id: 101,
            userId: 2,
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        axios.post('https://jsonplaceholder.typicode.com/posts', postData)
            .then(res => {
                if (res.data) {
                    setUserPosts(previousPost => [...previousPost, postData])
                    e.target.reset();
                    setProcessing(false)
                }
            })
    }

    return (
        <div className="container mt-4">
            {
                loading ? <Loader /> :
                    <>
                        <h2 className="text-center text-primary mb-4">My Posts</h2>
                        <div className="row gy-4">
                            {
                                userPosts.map((post) =>
                                    <div key={post.id} className="col-sm-6">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h5 className="card-title">{post.title}</h5>
                                                <p className="card-text">{post.body}</p>
                                            </div>
                                            <div className="card-footer border-top-0 mb-2">
                                                <button
                                                    onClick={() => editPostHandler(post)}
                                                    type="button"
                                                    className="btn btn-primary"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop">
                                                    Edit
                                                </button>
                                                <EditPostModal />
                                                <button className="btn btn-danger mx-3" onClick={() => postDeleteHandler(post.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </div>
                        <div className="row my-5 w-50 mx-auto">
                            <h2 className="text-center text-primary mb-4">Add New Post</h2>
                            <form onSubmit={addPostHandler} className="col-12">
                                <input
                                    placeholder="Post title"
                                    name="title"
                                    required
                                    ref={titleRef}
                                    type="text"
                                    className="form-control" />
                                <textarea
                                    placeholder="Description"
                                    rows="5"
                                    required
                                    name="body"
                                    ref={bodyRef}
                                    className="form-control my-4" />
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100">
                                    Add post
                                </button>
                            </form>
                        </div>
                        {processing && <Loader />}
                    </>}
        </div>
    );
};

export default Profile;