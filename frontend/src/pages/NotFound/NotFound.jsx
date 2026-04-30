import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
    return (
        <div className='not-found-container'>
            <div className='not-found-content'>
                <div className='error-code'>404</div>
                <h1 className='error-title'>Oops! Page Not Found</h1>
                <p className='error-description'>
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <div className='error-illustration'>
                    🍔🔍
                </div>
                <div className='error-actions'>
                    <Link to='/' className='btn-primary'>
                        Go Back Home
                    </Link>
                    <Link to='/menu' className='btn-secondary'>
                        Browse Menu
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
