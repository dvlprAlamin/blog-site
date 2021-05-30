import React from 'react';
import { useHistory } from 'react-router';
import { useMyContext } from '../../context';
import Pagination from './Pagination';

const Users = () => {
    const { setSortBy, setUsersPerPage, currentUser } = useMyContext()
    const history = useHistory();


    // const [search, setSearch] = useState('')
    // useEffect(() => {
    //     setUsers(users.filter(user => user.name === search))
    // }, [search])
    // console.log(users);


    return (
        <div className="container">

            <h2 className="text-center my-4">Users List</h2>
            <div className="row">
                <div className="col-md-4 d-flex">
                    <input placeholder="Search" type="text" className="form-control" />
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
                        currentUser.map(user =>
                            <tr key={user.id}>
                                <td
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => history.push(`/user/${user.id}`)}
                                >{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.website}</td>
                            </tr>)
                    }
                </tbody>
            </table>
            <Pagination />
        </div>
    );
};

export default Users;