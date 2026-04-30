import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const Navbar = () => {
    const [menu, setMenu] = useState("home")
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const navigate = useNavigate()
    const { getTotalItems, user, setUser } = useContext(StoreContext)

    const handleSignOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
        setShowMobileMenu(false)
        navigate('/')
    }

    const handleProfileClick = () => {
        navigate('/profile')
        setShowMobileMenu(false)
    }

    const handleCartClick = () => {
        navigate('/cart')
        setShowMobileMenu(false)
    }

    return (
        <div className='navbar'>
            <Link to='/' className='navbar-logo-link'>
                <img src={assets.logo} alt="FoodDel" className="logo" />
            </Link>

            <ul className="navbar-menu">
                <li>
                    <Link to='/' className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/menu' className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>
                        Menu
                    </Link>
                </li>
                <li>
                    <Link to='/discounts' className={menu === "discounts" ? "active" : ""} onClick={() => setMenu("discounts")}>
                        🎉 Discounts
                    </Link>
                </li>
                <li>
                    <Link to='/combos' className={menu === "combos" ? "active" : ""} onClick={() => setMenu("combos")}>
                        📦 Combos
                    </Link>
                </li>
                <li>
                    <Link to='/mobile-app' className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>
                        Mobile App
                    </Link>
                </li>
                <li>
                    <Link to='/contact-us' className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>
                        Contact Us
                    </Link>
                </li>
            </ul>

            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search" className="search-icon" />

                <div className="navbar-basket-icon" onClick={handleCartClick} style={{ cursor: 'pointer' }}>
                    <img src={assets.basket_icon} alt="Cart" />
                    {getTotalItems() > 0 && <div className="basket-dot">{getTotalItems()}</div>}
                </div>

                {user ? (
                    <div className='navbar-user-menu'>
                        <button className='user-profile-btn' onClick={handleProfileClick}>
                            <img src={assets.profile_icon} alt="Profile" />
                            {user.name}
                        </button>
                        <div className='user-dropdown'>
                            <p className='user-name'>{user.name}</p>
                            <p className='user-email'>{user.email}</p>
                            <button className='profile-link-btn' onClick={handleProfileClick}>
                                👤 My Profile
                            </button>
                            <button className='logout-btn' onClick={handleSignOut}>
                                <img src={assets.logout_icon} alt="Logout" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <button className='sign-in-btn' onClick={() => navigate('/signin')}>
                        Sign In
                    </button>
                )}

                {/* Mobile Menu Toggle */}
                <div className='navbar-mobile-menu-icon' onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className='navbar-mobile-menu'>
                    <ul>
                        <li><Link to='/' onClick={() => { setMenu("home"); setShowMobileMenu(false); }}>Home</Link></li>
                        <li><Link to='/menu' onClick={() => { setMenu("menu"); setShowMobileMenu(false); }}>Menu</Link></li>
                        <li><Link to='/discounts' onClick={() => { setMenu("discounts"); setShowMobileMenu(false); }}>🎉 Discounts</Link></li>
                        <li><Link to='/combos' onClick={() => { setMenu("combos"); setShowMobileMenu(false); }}>📦 Combos</Link></li>
                        <li><Link to='/mobile-app' onClick={() => { setMenu("mobile-app"); setShowMobileMenu(false); }}>Mobile App</Link></li>
                        <li><Link to='/contact-us' onClick={() => { setMenu("contact-us"); setShowMobileMenu(false); }}>Contact Us</Link></li>
                        {user ? (
                            <>
                                <li className='mobile-user-info'>
                                    <p>{user.name}</p>
                                    <p className='user-email-mobile'>{user.email}</p>
                                </li>
                                <li><button className='mobile-profile-btn' onClick={handleProfileClick}>👤 My Profile</button></li>
                                <li><button className='mobile-logout-btn' onClick={handleSignOut}>Sign Out</button></li>
                            </>
                        ) : (
                            <li><button className='mobile-signin-btn' onClick={() => navigate('/signin')}>Sign In</button></li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navbar