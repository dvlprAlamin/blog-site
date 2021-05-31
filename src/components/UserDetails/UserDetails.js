import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useMyContext } from '../../context';
import Loader from '../Loader/Loader';

const UserDetails = () => {
    const { users } = useMyContext();
    const { id } = useParams();
    const userDetails = users.find(user => user.id === +id) || {};
    const { name, username, email, phone, website, address, company } = userDetails;
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
            .then(res => {
                setUserPosts(res.data);
                setLoading(false)
            })
    }, [id])
    return (
        <div className="container my-4">
            {loading ? <Loader /> :
                <>
                    <h2 className="text-center text-primary">{name}</h2>
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>Username</th>
                                <td>{username}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{phone}</td>
                            </tr>
                            <tr>
                                <th>Website</th>
                                <td>{website}</td>
                            </tr>
                            <tr>
                                <th>City</th>
                                <td>{address?.city}</td>
                            </tr>
                            <tr>
                                <th>Street</th>
                                <td>{address?.street}</td>
                            </tr>
                            <tr>
                                <th>Suite</th>
                                <td>{address?.suite}</td>
                            </tr>
                            <tr>
                                <th>Zip code</th>
                                <td>{address?.zipcode}</td>
                            </tr>
                            <tr>
                                <th>Company</th>
                                <td>{company?.name}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3 className="text-center my-5">Post of {name}</h3>
                    <div className="row g-4">
                        {
                            userPosts.map(({ id, title, body }) => (
                                <div key={id} className="col-md-4 col-sm-6 col-xs-12">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{title}</h5>
                                            <p className="card-text">{body}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default UserDetails;