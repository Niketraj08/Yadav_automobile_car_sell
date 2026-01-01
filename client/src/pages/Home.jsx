import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { FaSearch, FaCar, FaStar, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
    const [featuredCars, setFeaturedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) setUser(userInfo);

        const fetchCars = async () => {
            try {
                const { data } = await api.get('/api/cars');
                setFeaturedCars(data.slice(0, 6));
            } catch (error) {
                console.error('Error fetching cars:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.append('brand', searchQuery);
        if (fuelType) params.append('fuelType', fuelType);
        if (maxPrice) params.append('maxPrice', maxPrice);

        navigate(`/cars?${params.toString()}`);
    };

    return (
        <div className="bg-white dark:bg-dark min-h-screen text-gray-900 dark:text-text transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-40"
                        onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2UwZTBlMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5MdXh1cnkgQ2FyczwvdGV4dD48L3N2Zz4=';
                            e.target.onError = null; // Prevent infinite loop
                        }}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-dark to-transparent"></div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white drop-shadow-lg">
                        Find Your Dream <span className="text-primary">Machine</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 font-light">
                        Premium Cars for Premium People. Buy and Sell with Confidence.
                    </p>

                    <form onSubmit={handleSearch} className="bg-white dark:bg-dark-card/80 backdrop-blur-md p-4 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search by Brand or Name..."
                            aria-label="Search by Brand or Name"
                            className="flex-grow bg-gray-50 dark:bg-dark-light border border-gray-300 dark:border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-primary text-gray-900 dark:text-white placeholder-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select
                            aria-label="Select Fuel Type"
                            className="bg-gray-50 dark:bg-dark-light border border-gray-300 dark:border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-primary text-gray-900 dark:text-white"
                            value={fuelType}
                            onChange={(e) => setFuelType(e.target.value)}
                        >
                            <option value="">Fuel Type</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                        <select
                            aria-label="Select Max Price"
                            className="bg-gray-50 dark:bg-dark-light border border-gray-300 dark:border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-primary text-gray-900 dark:text-white"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        >
                            <option value="">Price Range</option>
                            <option value="500000">Below 5L</option>
                            <option value="2000000">5L - 20L</option>
                            <option value="10000000">Above 20L</option>
                        </select>
                        <button type="submit" className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded font-bold transition flex items-center justify-center gap-2">
                            <FaSearch /> Search
                        </button>
                    </form>
                </div>
            </section>

            {/* Available Cars Section */}
            <section className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-dark-light/30 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Available <span className="text-primary">Cars</span></h2>
                            <p className="text-gray-600 dark:text-gray-400">Find your next drive from our curated collection</p>
                        </div>
                        <Link to="/cars" className="text-primary hover:text-white transition font-medium">View All Cars &rarr;</Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : featuredCars.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="bg-gray-100 dark:bg-dark-card w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaCar className="text-6xl text-gray-400 dark:text-gray-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">No Cars Available</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">We're currently updating our inventory. Please check back soon!</p>
                            <Link to="/sell" className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-bold transition inline-block">
                                Sell Your Car
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {featuredCars.map(car => (
                                <div key={car._id} className="bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition duration-300 group relative">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={
                                                car.images && car.images[0] && !car.images[0].includes('…') && car.images[0].length > 20 && !car.images[0].endsWith(':')
                                                    ? (car.images[0].startsWith('http') ? car.images[0] : `${car.images[0]}`)
                                                    : 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800'
                                            }
                                            alt={car.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                            onError={(e) => {
                                                e.target.src = 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800';
                                            }}
                                        />
                                        <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                                            {car.year}
                                        </div>
                                        {user && user.isAdmin && (
                                            <Link
                                                to={`/admin/manage-cars?edit=${car._id}`}
                                                className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition transform hover:scale-110 flex items-center justify-center gap-1 text-xs font-bold z-10"
                                                title="Edit Car Image"
                                            >
                                                Change Image
                                            </Link>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2 truncate text-gray-900 dark:text-white">{car.name}</h3>
                                        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            <span>{car.fuelType}</span>
                                            <span>{car.mileage} kmpl</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
                                            <span className="text-xl font-bold text-primary">₹ {(car.price / 100000).toFixed(2)} Lakhs</span>
                                            <Link to={`/cars/${car._id}`} className="text-gray-900 dark:text-white hover:text-primary text-sm font-medium transition">View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why Choose <span className="text-primary">Yadav Automobile</span>?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 dark:bg-dark-card p-8 rounded-lg border border-gray-200 dark:border-gray-800 text-center hover:border-primary transition duration-300 group">
                        <div className="bg-gray-100 dark:bg-dark-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-2xl group-hover:scale-110 transition">
                            <FaShieldAlt />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Trusted Service</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Years of trust and excellence in delivering top-quality vehicles to our customers.</p>
                        <Link to="/about" className="inline-block bg-primary/10 hover:bg-primary text-primary hover:text-white px-6 py-2 rounded-full text-sm font-bold transition">Learn More</Link>
                    </div>
                    <div className="bg-gray-50 dark:bg-dark-card p-8 rounded-lg border border-gray-200 dark:border-gray-800 text-center hover:border-primary transition duration-300 group">
                        <div className="bg-gray-100 dark:bg-dark-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-2xl group-hover:scale-110 transition">
                            <FaCar />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Verified Cars</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Every car passes a rigorous 150-point inspection check before listing.</p>
                        <Link to="/cars" className="inline-block bg-primary/10 hover:bg-primary text-primary hover:text-white px-6 py-2 rounded-full text-sm font-bold transition">Browse Inventory</Link>
                    </div>
                    <div className="bg-gray-50 dark:bg-dark-card p-8 rounded-lg border border-gray-200 dark:border-gray-800 text-center hover:border-primary transition duration-300 group">
                        <div className="bg-gray-100 dark:bg-dark-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-2xl group-hover:scale-110 transition">
                            <FaStar />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Easy Process</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">Seamless buying and selling experience with transparent paperwork.</p>
                        <Link to="/sell" className="inline-block bg-primary/10 hover:bg-primary text-primary hover:text-white px-6 py-2 rounded-full text-sm font-bold transition">Sell Your Car</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
