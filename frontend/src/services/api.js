import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Food API calls
export const foodAPI = {
    getAll: (category = null) =>
        api.get('/food', { params: { category } }),

    getById: (id) =>
        api.get(`/food/${id}`),

    create: (data) =>
        api.post('/food', data),

    update: (id, data) =>
        api.put(`/food/${id}`, data),

    rate: (id, rating) =>
        api.post(`/food/${id}/rate`, { rating }),

    delete: (id) =>
        api.delete(`/food/${id}`),
};

// Upload API calls
export const uploadAPI = {
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return api.post('/upload/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    deleteImage: (publicId) =>
        api.delete(`/upload/delete/${publicId}`),
};

// Auth API calls
export const authAPI = {
    signup: (userData) =>
        api.post('/auth/register', userData),

    signin: (credentials) =>
        api.post('/auth/login', credentials),

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

// Orders API calls
export const orderAPI = {
    create: (orderData) =>
        api.post('/orders', orderData),

    getAll: () =>
        api.get('/orders'),

    getById: (id) =>
        api.get(`/orders/${id}`),

    update: (id, data) =>
        api.put(`/orders/${id}`, data),
};

export default api;
