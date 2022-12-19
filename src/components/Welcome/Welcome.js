import React from 'react';
import { Link } from 'react-router-dom';
import fc from '../../images/fc5.png'
import './Welcome.css'

const Welcome = () => {
    return (
        <div>
            <img src={fc} style={{ maxWidth: '100vh', display: 'block', margin: ' auto', marginTop: '15%' }} alt='Welcome' />

            <Link className="button-24" to='/routine'>Build your Flow</Link>

        </div>
    )
}

export default Welcome;