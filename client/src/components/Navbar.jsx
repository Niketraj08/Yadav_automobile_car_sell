import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUserCircle, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUser(userInfo);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img
                                src="/logo.png"
                                alt="Yadav Automobile"
                                className="object-contain w-[140px] h-[42px] md:w-[200px] md:h-[60px] transition-all duration-300"
                            />
                        </Link>
                    </div>
                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link to="/cars" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300">Buy Car</Link>
                            <Link to="/sell" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300">Sell Car</Link>
                            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300">About</Link>
                            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300">Contact</Link>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <FaSun className="text-yellow-400 text-xl" />
                            ) : (
                                <FaMoon className="text-gray-700 text-xl" />
                            )}
                        </button>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
                                {user.isAdmin && (
                                    <Link to="/admin" className="text-primary hover:text-white transition font-bold">Admin</Link>
                                )}
                                <button onClick={logoutHandler} className="bg-primary hover:bg-secondary px-4 py-2 rounded text-white text-sm font-medium transition">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary transition">Login</Link>
                                <Link to="/register" className="bg-primary hover:bg-secondary px-4 py-2 rounded text-white text-sm font-medium transition">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="-mr-2 flex lg:hidden items-center space-x-2">
                        {/* Mobile Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                            {theme === 'dark' ? (
                                <FaSun className="text-yellow-400" />
                            ) : (
                                <FaMoon className="text-gray-700" />
                            )}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-white hover:text-primary p-2">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="lg:hidden bg-white dark:bg-dark-card pb-4 px-4 border-t border-gray-200 dark:border-gray-800 shadow-lg">
                    <Link to="/cars" onClick={() => setIsOpen(false)} className="block py-3 text-gray-700 dark:text-gray-300 hover:text-primary font-medium">Buy Car</Link>
                    <Link to="/sell" onClick={() => setIsOpen(false)} className="block py-3 text-gray-700 dark:text-gray-300 hover:text-primary font-medium">Sell Car</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="block py-3 text-gray-700 dark:text-gray-300 hover:text-primary font-medium">About</Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-3 text-gray-700 dark:text-gray-300 hover:text-primary font-medium">Contact</Link>

                    {user ? (
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Welcome, {user.name}</p>
                            {user.isAdmin && (
                                <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-3 text-primary font-bold">Admin Dashboard</Link>
                            )}
                            <button onClick={logoutHandler} className="block w-full text-left py-3 text-red-500 font-bold">Logout</button>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <Link to="/login" onClick={() => setIsOpen(false)} className="block py-3 text-center border border-gray-300 dark:border-gray-600 rounded hover:border-primary text-gray-700 dark:text-gray-300 font-bold transition">Login</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)} className="block py-3 text-center bg-primary rounded hover:bg-secondary text-white font-bold transition">Register</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
