import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../AdminNavbar.css'

const AdminNavbar = ({ setCurrentPage, currentPage }) => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('adminUser')
        navigate('/admin/login')
    }

    const handleNavClick = (page) => {
        setCurrentPage(page)
        setShowMenu(false)
    }

    return (
        <div className='admin-navbar'>
            <div className='admin-navbar-container'>
                <h2 className='admin-brand'>FoodDel Admin</h2>

                <div className='admin-menu-toggle' onClick={() => setShowMenu(!showMenu)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <nav className={`admin-nav ${showMenu ? 'show' : ''}`}>
                    <button
                        className={`admin-nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
                        onClick={() => handleNavClick('dashboard')}
                    >
                        📊 Dashboard
                    </button>
                    <button
                        className={`admin-nav-btn ${currentPage === 'list' ? 'active' : ''}`}
                        onClick={() => handleNavClick('list')}
                    >
                        📋 List Items
                    </button>
                    <button
                        className={`admin-nav-btn ${currentPage === 'add' ? 'active' : ''}`}
                        onClick={() => handleNavClick('add')}
                    >
                        ➕ Add Items
                    </button>
                    <button
                        className={`admin-nav-btn ${currentPage === 'orders' ? 'active' : ''}`}
                        onClick={() => handleNavClick('orders')}
                    >
                        📦 Orders
                    </button>
                </nav>

                <button className='admin-logout-btn' onClick={handleLogout}>
                    🚪 Logout
                </button>
            </div>
        </div>
    )
}

export default AdminNavbar
