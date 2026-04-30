import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../services/api';
import './DashboardStats.css';

const DashboardStats = ({ setCurrentPage }) => {
    const [stats, setStats] = useState({
        usersCount: 0,
        ordersCount: 0,
        foodsCount: 0,
        revenue: 0
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/stats`);
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="stats-loading">
                <div className="spinner"></div>
                <p>Loading Insights...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-stats-container">
            <div className="dashboard-header">
                <h2>Overview Dashboard</h2>
                <p>Real-time insights and analytics for Food-Del.</p>
            </div>
            
            <div className="stats-grid">
                <div className="stat-card glass-morphism clickable-card" onClick={() => setCurrentPage('revenue_details')}>
                    <div className="stat-icon revenue-icon">
                        <svg xmlns="http://www.w3.org/Dom/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="stat-details">
                        <h3>Total Revenue</h3>
                        <p className="stat-value">${stats.revenue.toFixed(2)}</p>
                    </div>
                </div>

                <div className="stat-card glass-morphism clickable-card" onClick={() => setCurrentPage('orders')}>
                    <div className="stat-icon orders-icon">
                        <svg xmlns="http://www.w3.org/Dom/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <div className="stat-details">
                        <h3>Total Orders</h3>
                        <p className="stat-value">{stats.ordersCount}</p>
                    </div>
                </div>

                <div className="stat-card glass-morphism clickable-card" onClick={() => setCurrentPage('food_analytics')}>
                    <div className="stat-icon foods-icon">
                        <svg xmlns="http://www.w3.org/Dom/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                    </div>
                    <div className="stat-details">
                        <h3>Total Foods</h3>
                        <p className="stat-value">{stats.foodsCount}</p>
                    </div>
                </div>

                <div className="stat-card glass-morphism clickable-card" onClick={() => setCurrentPage('user_details')}>
                    <div className="stat-icon users-icon">
                        <svg xmlns="http://www.w3.org/Dom/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                    <div className="stat-details">
                        <h3>Registered Users</h3>
                        <p className="stat-value">{stats.usersCount}</p>
                    </div>
                </div>
            </div>
            
            <div className="dashboard-charts glass-morphism">
                <div className="chart-placeholder">
                    <h3>Analytics Growth</h3>
                    <div className="visual-bars">
                        <div className="bar" style={{height: '40%'}}></div>
                        <div className="bar" style={{height: '60%'}}></div>
                        <div className="bar" style={{height: '50%'}}></div>
                        <div className="bar" style={{height: '80%'}}></div>
                        <div className="bar" style={{height: '100%'}}></div>
                        <div className="bar" style={{height: '75%'}}></div>
                        <div className="bar" style={{height: '90%'}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
