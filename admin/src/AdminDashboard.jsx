import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'
import AdminNavbar from './components/AdminNavbar/AdminNavbar'
import DashboardStats from './pages/DashboardStats/DashboardStats'
import ListItems from './pages/ListItems/ListItems'
import AddItems from './pages/AddItems/AddItems'
import Orders from './pages/Orders/Orders'
import RevenueDetails from './pages/RevenueDetails/RevenueDetails'
import UserDetails from './pages/UserDetails/UserDetails'
import FoodAnalytics from './pages/FoodAnalytics/FoodAnalytics'

const AdminDashboard = () => {
    const [currentPage, setCurrentPage] = useState('dashboard')
    const [adminUser, setAdminUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const admin = localStorage.getItem('adminUser')
        if (!admin) {
            navigate('/admin/login')
        } else {
            setAdminUser(JSON.parse(admin))
            setLoading(false)
        }
    }, [navigate])

    if (loading) {
        return <div className='admin-loading'>Loading...</div>
    }

    if (!adminUser) {
        return null
    }

    return (
        <div className='admin-dashboard'>
            <AdminNavbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
            <div className='admin-content'>
                {currentPage === 'dashboard' && <DashboardStats setCurrentPage={setCurrentPage} />}
                {currentPage === 'list' && <ListItems />}
                {currentPage === 'add' && <AddItems />}
                {currentPage === 'orders' && <Orders />}
                {currentPage === 'revenue_details' && <RevenueDetails setCurrentPage={setCurrentPage} />}
                {currentPage === 'user_details' && <UserDetails setCurrentPage={setCurrentPage} />}
                {currentPage === 'food_analytics' && <FoodAnalytics setCurrentPage={setCurrentPage} />}
            </div>
        </div>
    )
}

export default AdminDashboard
