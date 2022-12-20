import React from 'react';
import './About.css'
import fc from '../../images/fc5.png'


const About = () => {
    return (
        <div>
            <img src={fc} style={{ maxWidth: '50vh', display: 'block', margin: ' auto', marginTop: '15%' }} alt='Welcome' />
            <h2 className='customize'>Customize your Flow</h2>
            <p className='about'>A drag and drop application with over 100 yoga poses, built to build your own practice.</p>
        </div>
    )
}

export default About;