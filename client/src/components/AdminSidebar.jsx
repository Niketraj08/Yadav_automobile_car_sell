import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaPlus, FaList, FaShoppingCart, FaUsers, FaSignOutAlt, FaMoneyBillWave, FaBars, FaTimes } from 'react-icons/fa';

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path ? "bg-primary text-white" : "text-gray-400 hover:bg-dark-light hover:text-white";

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-20 right-4 z-[60] bg-primary p-3 rounded-full text-white shadow-lg"
            >
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Sidebar Overlay for Mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[40]"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed lg:sticky lg:top-16
                bg-dark-card w-64 h-[calc(100vh-64px)] border-r border-gray-800 flex flex-col z-[50]
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold text-white tracking-wider">ADMIN <span className="text-primary">PANEL</span></h2>
                </div>

                <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                    <Link to="/admin" onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive('/admin')}`}>
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/admin/add-car" onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive('/admin/add-car')}`}>
                        <FaPlus />
                        <span>Add Car</span>
                    </Link>
                    <Link to="/admin/manage-cars" onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive('/admin/manage-cars')}`}>
                        <FaList />
                        <span>Manage Cars</span>
                    </Link>
                    <Link to="/admin/bookings" onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive('/admin/bookings')}`}>
                        <FaMoneyBillWave />
                        <span>Bookings & Payments</span>
                    </Link>
                    <Link to="/admin/sell-requests" onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive('/admin/sell-requests')}`}>
                        <FaShoppingCart />
                        <span>Sell Requests</span>
                    </Link>
                    <Link to="/admin/users" onClick={() => setIsOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${isActive('/admin/users')}`}>
                        <FaUsers />
                        <span>Users</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button onClick={logoutHandler} className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-400 hover:text-red-500 transition">
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
