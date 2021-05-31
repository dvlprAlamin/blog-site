import React from 'react';
import { useHistory } from 'react-router';
import { useMyContext } from '../../context';
import Pagination from './Pagination';

const Users = () => {
    const { query, setQuery, setSearchBy, setSortBy, setUsersPerPage, currentUser } = useMyContext()
    const history = useHistory();
    return (
        <div className="container">

            <h2 className="text-center my-4">Users List</h2>
            <div className="row">
                <div className="col-md-4 my-2 d-flex">
                    <input
                        placeholder="Search..."
                        type="text"
                        className="form-control"
                        value={query}
                        onChange={e => setQuery(e.target.value)} />
                    <select
                        className="form-control"
                        defaultValue={localStorage.getItem('searchBy') || "searchBy"}
                        onChange={e => {
                            setSearchBy(e.target.value);
                            localStorage.setItem('searchBy', e.target.value);
                        }}>
                        <option value="searchBy" disabled hidden>Search By</option>
                        <option value="name">Search By Name</option>
                        <option value="email">Search By Email</option>
                        <option value="website">Search By Website</option>
                        <option value="all">Search By All</option>
                    </select>
                </div>
                <div className="col-md-4 my-2">
                    <select
                        className="form-control"
                        defaultValue={localStorage.getItem('sortBy') || "sortBy"}
                        onChange={e => {
                            setSortBy(e.target.value);
                            localStorage.setItem('sortBy', e.target.value);
                        }}>
                        <option value="sortBy" disabled hidden>Sort By</option>
                        <option value="nameAsc">Name ASC</option>
                        <option value="nameDsc">Name DSC</option>
                        <option value="emailAsc">Email ASC</option>
                        <option value="emailDsc">Email DSC</option>
                    </select>
                </div>
                <div className="col-md-4 my-2">
                    <select
                        className="form-control"
                        defaultValue={localStorage.getItem('usersPerPage') || "setUsers"}
                        onChange={e => {
                            setUsersPerPage(e.target.value);
                            localStorage.setItem('usersPerPage', e.target.value);
                        }}>
                        <option value="setUsers" disabled hidden>Set Users Per Page</option>
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
                        currentUser.map(user => (
                            <tr key={user.id}>
                                <td
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => history.push(`/user/${user.id}`)}
                                >{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.website}</td>
                            </tr>))
                    }
                </tbody>
            </table>
            <Pagination />
        </div>
    );
};

export default Users;