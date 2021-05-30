import React from 'react';
import { useMyContext } from '../../context';

const Pagination = () => {
    const { users, usersPerPage, paginate } = useMyContext();
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination justify-content-center">
                {
                    pageNumbers.map(number => (
                        <li key={number} >
                            <button
                                className="btn btn-outline-info"
                                onClick={() => paginate(number)}>
                                {number}
                            </button>
                        </li>))
                }
            </ul>
        </nav>
    );
};

export default Pagination;