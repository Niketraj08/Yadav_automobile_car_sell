import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout - server may be busy');
        }
        if (error.response) {
            // Server responded with error status
            throw new Error(`Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
        } else if (error.request) {
            // Network error
            throw new Error('Network error - please check your connection');
        } else {
            // Other error
            throw new Error(error.message || 'An unexpected error occurred');
        }
    }
);

export default api;
