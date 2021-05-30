import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setUsers(res.data);
            })
    }, [])
    // sorting 
    const [sortBy, setSortBy] = useState(null)
    switch (sortBy) {
        case 'nameAsc':
            users.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            break;
        case 'nameDsc':
            users.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
            break;
        case 'emailAsc':
            users.sort((a, b) => (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0));
            break;
        case 'emailDsc':
            users.sort((a, b) => (a.email < b.email) ? 1 : ((b.email < a.email) ? -1 : 0));
            break;
        default:
            break;
    }
    const [search, setSearch] = useState('')
    // useEffect(() => {
    //     setUsers(users.filter(user => user.name === search))
    // }, [search])
    // console.log(users);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState('all');

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    let currentUser = [];
    if (usersPerPage === 'all') {
        currentUser = users;
    } else {
        currentUser = users.slice(indexOfFirstUser, indexOfLastUser);
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (number) => setCurrentPage(number)
    return (
        <div className="container">

            <h2 className="text-center my-4">Users List</h2>
            <div className="row">
                <div className="col-md-4 d-flex">
                    <input placeholder="Search" onChange={e => setSearch(e.target.value)} type="text" className="form-control" />
                    <button className="btn btn-primary">Search</button>
                </div>
                <div className="col-md-4">
                    <select className="form-control" onChange={e => setSortBy(e.target.value)}>
                        <option disabled selected hidden>Sort By</option>
                        <option value="nameAsc">Name ASC</option>
                        <option value="nameDsc">Name DSC</option>
                        <option value="emailAsc">Email ASC</option>
                        <option value="emailDsc">Email DSC</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <select className="form-control" onChange={e => setUsersPerPage(e.target.value)}>
                        <option disabled selected hidden>Set User Per Page</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="all">All</option>
                    </select>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Website</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentUser.map(({ id, name, email, website }) =>
                            <tr key={id}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{website}</td>
                            </tr>)
                    }
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    {
                        pageNumbers.map(number => (
                            <li key={number} >
                                <button className="btn btn-outline-info" onClick={() => paginate(number)}>{number}</button>
                            </li>))
                    }
                </ul>
            </nav>

        </div>
    );
};

export default Users;