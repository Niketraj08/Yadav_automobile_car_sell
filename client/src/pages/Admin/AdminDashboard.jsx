import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../../components/AdminSidebar';
import AddCar from './AddCar';
import ManageCars from './ManageCars';
import SellRequests from './SellRequests';
import Users from './Users';
import Bookings from './Bookings';

// Dashboard Overview Component
const DashboardOverview = () => {
    const [stats, setStats] = useState({ totalCars: 0, pendingRequests: 0, totalUsers: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                const { data } = await axios.get('/api/admin/dashboard-stats', config);
                setStats({
                    totalCars: data.totalCars,
                    pendingRequests: data.pendingRequests,
                    totalUsers: data.totalUsers
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('userInfo');
                    window.location.href = '/login';
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-dark-card p-6 rounded-lg border border-gray-800 hover:border-primary/50 transition duration-300">
                    <h3 className="text-gray-400 mb-2">Total Cars</h3>
                    <p className="text-4xl font-bold text-primary">{stats.totalCars}</p>
                </div>
                <div className="bg-dark-card p-6 rounded-lg border border-gray-800 hover:border-yellow-500/50 transition duration-300">
                    <h3 className="text-gray-400 mb-2">Pending Requests</h3>
                    <p className="text-4xl font-bold text-yellow-500">{stats.pendingRequests}</p>
                    <p className="text-sm text-gray-500 mt-2">Sell requests awaiting approval</p>
                </div>
                <div className="bg-dark-card p-6 rounded-lg border border-gray-800 hover:border-blue-500/50 transition duration-300">
                    <h3 className="text-gray-400 mb-2">Total Users</h3>
                    <p className="text-4xl font-bold text-blue-500">{stats.totalUsers}</p>
                </div>
            </div>
        </div>
    );
};

// Placeholder components
// const SellRequests = () => <div>Sell Requests Page</div>;
// const Users = () => <div>Users Management Page</div>;

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="flex bg-dark min-h-[calc(100vh-64px)] text-text">
            <AdminSidebar />
            <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <Routes>
                    <Route path="/" element={<DashboardOverview />} />
                    <Route path="/add-car" element={<AddCar />} />
                    <Route path="/manage-cars" element={<ManageCars />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/sell-requests" element={<SellRequests />} />
                    <Route path="/users" element={<Users />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
