import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useMyContext } from '../../context';

const EditPostModal = () => {
    const { editPost } = useMyContext();
    const { id, title, body } = editPost;

    const titleRef = useRef();
    const bodyRef = useRef();


    const postUpdateHandler = e => {
        e.preventDefault();
        const updatedPost = {
            userId: 2,
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        console.log(updatedPost);
        axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost)
            .then(res => {
                console.log(res);
                res.data && e.target.reset();
                document.getElementById('modal-close').click();
            })
    }
    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Edit Post</h5>
                        <button type="button" id="modal-close" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={postUpdateHandler}>
                        <div className="modal-body">
                            <input type="text" ref={titleRef} defaultValue={title} placeholder="Title" className="form-control mb-3" />
                            <textarea placeholder="Description" ref={bodyRef} defaultValue={body} rows="5" className="form-control" />
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;