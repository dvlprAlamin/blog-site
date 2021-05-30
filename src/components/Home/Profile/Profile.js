import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [userPosts, setUserPosts] = useState([]);
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts?userId=2')
            .then(res => {
                setUserPosts(res.data);
            })
    }, []);

    const postUpdateHandler = id => {
        axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    }
    const postDeleteHandler = id => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => {
                res.data && setUserPosts(previousPost => previousPost.filter(post => post.id !== id))
            })
    }
    return (
        <div>
            {
                userPosts.map(({ id, title, body }) =>
                    <div key={id} style={{ width: 500, border: '1px solid red', margin: '5px auto', padding: 10 }}>
                        <h2>{title}</h2>
                        <p>{body}</p>
                        <div>
                            <button>Update</button>
                            <button onClick={() => postDeleteHandler(id)}>Delete</button>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default Profile;