import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import './RoutineList.css'

const { REACT_APP_SERVER_URL } = process.env;
const RoutineList = () => {

    const [routineList, setRoutineList] = useState([]);
    const [name, setName] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('jwtToken'));
        axios.get(`${REACT_APP_SERVER_URL}/routines`)
            .then(response => {
                setRoutineList(response.data.routine)
            })
            .catch(err => {
                console.log(err, 'error')
            })
    }, [])

    const renderRoutines = () => {
        if (routineList.length) {
            let routinesArray = routineList.map((r, idx) => {
                return (
                    <h2 key={idx}>
                        <Link className='links' to={`${r._id}`}>{r.name}</Link>
                    </h2>
                )
            })
            return routinesArray
        } else {
            return <h1>There are no routines</h1>
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const routineData = { name };

        axios.post(`${REACT_APP_SERVER_URL}/routines`, routineData)
            .then(response => {
                setAuthToken(localStorage.getItem('jwtToken'));
                axios.get(`${REACT_APP_SERVER_URL}/routines`)
                    .then(response => {
                        setRoutineList(response.data.routine)
                    })
                    .catch(err => {
                        console.log(err, 'error')
                    })
            })
            .catch(err => {
                console.log(err, 'error')
            })
    }

    return (
        <div>
            <div className="col-md-7 offset-md-3">
                <div className="card card-body" style={{ backgroundColor: '#b0a18b' }}>
                    <h1 className="py-2 text-center">Your Routines</h1>
                    <ul>
                        {renderRoutines()}
                    </ul>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-7 offset-md-3">
                    <div className="card card-body" style={{ backgroundColor: '#b0a18b' }}>
                        <h1 className="py-2 text-center">Create a new Routine</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" value={name} onChange={handleName} className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoutineList
