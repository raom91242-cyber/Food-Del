import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDetails.css';

const UserDetails = ({ setCurrentPage }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users');
                if (response.data.success) {
                    setUsers(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="admin-page fade-in">
            <div className="page-header">
                <div>
                    <button className="back-btn" onClick={() => setCurrentPage('dashboard')}>← Back</button>
                    <h1>User Directory</h1>
                    <p>Manage and view all registered users across the platform.</p>
                </div>
            </div>

            {loading ? (
                <div className="admin-page-loading">
                    <p>Loading User Directory...</p>
                </div>
            ) : (
                <div className="user-grid">
                    {users.map((user, index) => (
                        <div className="user-card glass-morphism" key={user._id} style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="user-avatar">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-info">
                                <h3>{user.name}</h3>
                                <p className="user-email">{user.email}</p>
                                <div className="user-meta">
                                    <span className="user-role">{user.role}</span>
                                    <span className="user-date">Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDetails;
