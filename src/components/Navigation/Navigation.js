import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Blog Site</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Users</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;