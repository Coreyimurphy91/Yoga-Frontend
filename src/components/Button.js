import React from 'react'
import { Link } from 'react-router-dom';
import './Welcome/Welcome.css'

const Button = () => {
  return (
    <div>
      <Link className="button-24" to='/routine'>Save Routine</Link>
    </div>
  )
}

export default Button
