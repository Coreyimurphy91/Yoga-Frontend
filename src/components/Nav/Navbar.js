import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Nav.css'
import fc from '../../images/fc5.png'

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={fc} style={{width:'100px'}}alt="logo"/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="#navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample07">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" style={{color:'rgb(147,149,152)'}} exact to="/">ROUTINE BUILDER</NavLink>
                        </li>
                    </ul>
                    {
                        props.isAuth 
                        ? <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link"  style={{color:'rgb(147,149,152)'}} to="/profile">Profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <span onClick={props.handleLogout} className="nav-link logout-link">Logout</span>
                            </li>
                        </ul>
                        : <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link"  style={{color:'rgb(147,149,152)'}} to="/signup">Create Account</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link"  style={{color:'rgb(147,149,152)'}} to="/login">Login</NavLink>
                            </li>
                          </ul>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;