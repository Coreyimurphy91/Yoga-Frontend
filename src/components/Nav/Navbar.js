import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Nav.css'
import fc from '../../images/fc5.png'

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg" style={{borderBottomLeftRadius:'20pt'}}>
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
                            <NavLink className="nav-link hov" style={{color:'#2b3241'}} exact to="/routine">ROUTINE BUILDER</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link hov" style={{color:'#2b3241'}} exact to="/about">ABOUT</NavLink>
                        </li>
                    </ul>
                    {
                        props.isAuth 
                        ? <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link hov" style={{color:'#2b3241'}} to="/profile">PROFILE</NavLink>
                            </li>
                            <li className="nav-item">
                                <span onClick={props.handleLogout} className="nav-link logout-link" style={{color:'#2b3241'}}>LOGOUT</span>
                            </li>
                        </ul>
                        : <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link hov" style={{color:'#2b3241'}} to="/signup">CREATE ACCOUNT</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link hov" style={{color:'#2b3241'}} to="/login">LOGIN</NavLink>
                            </li>
                          </ul>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
