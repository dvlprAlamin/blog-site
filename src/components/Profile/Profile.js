import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

const Profile = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false)
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts?userId=2')
            .then(res => {
                setUserPosts(res.data);
                setLoading(false)
            })
    }, []);

    const postUpdateHandler = id => {
        axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    }
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
    const [postData, setPostData] = useState({})
    const onBlurHandler = e => {
        const data = { ...postData };
        data[e.target.name] = e.target.value;
        data.userId = 2;
        setPostData(data)
    }
    const addPostHandler = e => {
        e.preventDefault();
        setProcessing(true)
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
        <div className="container">
            {
                loading ? <Loader /> :
                    <>
                        <div className="row gy-4">
                            {
                                userPosts.map(({ id, title, body }) =>
                                    <div key={id} className="col-sm-6">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h5 className="card-title">{title}</h5>
                                                <p className="card-text">{body}</p>
                                            </div>
                                            <div className="card-footer border-top-0 mb-2">

                                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                    Edit
                                                </button>


                                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="staticBackdropLabel">Edit Post</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <input type="text" defaultValue={e => e.target.value} placeholder="Title" className="form-control mb-3" />
                                                                <textarea placeholder="Description" defaultValue={e => e.target.value} rows="5" className="form-control" />
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-primary">Update</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* <button className="btn btn-info mx-3 text-white">Edit</button> */}

                                                <button className="btn btn-danger mx-3" onClick={() => postDeleteHandler(id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </div>
                        <div className="row my-5 w-50 mx-auto">
                            <h3 className="text-center">Add New Post</h3>
                            <form onSubmit={addPostHandler} className="col-12">
                                <input placeholder="Post title" name="title" required onBlur={onBlurHandler} type="text" className="form-control" />
                                <textarea placeholder="Description" rows="5" required name="body" onBlur={onBlurHandler} className="form-control my-4" />
                                <button type="submit" className="btn btn-primary w-100">Add post</button>
                            </form>
                        </div>
                        {processing && <Loader />}
                    </>}
        </div>
    );
};

export default Profile;