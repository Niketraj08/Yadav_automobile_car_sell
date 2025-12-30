import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarsListing = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [filters, setFilters] = useState({
        brand: '',
        fuelType: '',
        maxPrice: '',
    });

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) setUser(userInfo);
    }, []);

    useEffect(() => {
        fetchCars();
    }, [filters]);

    const fetchCars = async () => {
        setLoading(true);
        try {
            // Build query string
            const params = new URLSearchParams();
            if (filters.brand) params.append('brand', filters.brand);
            if (filters.fuelType) params.append('fuelType', filters.fuelType);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

            const { data } = await axios.get(`/api/cars?${params.toString()}`);
            setCars(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-dark min-h-screen text-text p-4 md:p-8">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="md:col-span-1 bg-dark-card p-6 rounded-lg h-fit border border-gray-800 sticky top-24">
                    <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Filters</h3>

                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            onChange={handleFilterChange}
                            placeholder="Type brand name (e.g., Audi, BMW...)"
                            className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none text-white placeholder-gray-500"
                        />
                        <p className="text-gray-500 text-xs mt-1">Search by any brand name</p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2">Fuel Type</label>
                        <select name="fuelType" onChange={handleFilterChange} className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none">
                            <option value="">All Fuel Types</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2">Max Price</label>
                        <select name="maxPrice" onChange={handleFilterChange} className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none">
                            <option value="">Any Price</option>
                            <option value="500000">Under 5 Lakh</option>
                            <option value="1000000">Under 10 Lakh</option>
                            <option value="2000000">Under 20 Lakh</option>
                            <option value="5000000">Under 50 Lakh</option>
                        </select>
                    </div>
                </div>

                {/* Car Grid */}
                <div className="md:col-span-3">
                    <h2 className="text-3xl font-bold mb-6">Available <span className="text-primary">Cars</span></h2>

                    {loading ? (
                        <div className="text-center py-20">Loading...</div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cars.length > 0 ? cars.map(car => (
                                <div key={car._id} className="bg-dark-card rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-primary transition group relative">
                                    <div className="relative h-48 overflow-hidden">
                                        <img src={car.images && car.images[0] ? (car.images[0].startsWith('http') ? car.images[0] : `${car.images[0]}`) : 'https://via.placeholder.com/300'} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                        <div className="absolute top-2 right-2 bg-dark/80 backdrop-blur text-white text-xs px-2 py-1 rounded">
                                            {car.status}
                                        </div>
                                        {user && user.isAdmin && (
                                            <Link
                                                to={`/admin/manage-cars?edit=${car._id}`}
                                                className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded shadow-lg transition transform hover:scale-110 text-[10px] font-bold uppercase tracking-tighter z-10"
                                                title="Edit Car Image"
                                            >
                                                Change Image
                                            </Link>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold truncate mb-1">{car.name}</h3>
                                        <p className="text-gray-400 text-sm mb-3">{car.brand} • {car.year}</p>
                                        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                            <span>{car.fuelType}</span>
                                            <span>{car.transmission}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                                            <span className="text-lg font-bold text-primary">₹ {car.price.toLocaleString('en-IN')}</span>
                                            <Link to={`/cars/${car._id}`} className="bg-white/10 hover:bg-primary hover:text-white px-3 py-1 rounded text-sm transition text-gray-300">View</Link>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-3 text-center py-10 text-gray-500">No cars found matching your filters.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarsListing;
