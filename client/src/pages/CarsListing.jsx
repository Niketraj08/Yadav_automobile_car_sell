import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

const CarsListing = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [filters, setFilters] = useState({
        carName: '',
        brand: '',
        minPrice: '',
        maxPrice: '',
        fuelType: '',
        transmission: '',
        minYear: '',
        maxYear: '',
        minMileage: '',
        maxMileage: '',
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
            if (filters.carName) params.append('carName', filters.carName);
            if (filters.brand) params.append('brand', filters.brand);
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
            if (filters.fuelType) params.append('fuelType', filters.fuelType);
            if (filters.transmission) params.append('transmission', filters.transmission);
            if (filters.minYear) params.append('minYear', filters.minYear);
            if (filters.maxYear) params.append('maxYear', filters.maxYear);
            if (filters.minMileage) params.append('minMileage', filters.minMileage);
            if (filters.maxMileage) params.append('maxMileage', filters.maxMileage);

            const { data } = await api.get(`/api/cars?${params.toString()}`);
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const clearFilters = () => {
        setFilters({
            carName: '',
            brand: '',
            minPrice: '',
            maxPrice: '',
            fuelType: '',
            transmission: '',
            minYear: '',
            maxYear: '',
            minMileage: '',
            maxMileage: '',
        });
    };

    return (
        <div className="bg-dark min-h-screen text-text p-4 md:p-8">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <div className="md:col-span-1 bg-dark-card p-6 rounded-lg h-fit border border-gray-800 sticky top-24">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
                        <h3 className="text-xl font-bold">Filters</h3>
                        <button
                            onClick={clearFilters}
                            className="text-sm text-primary hover:text-primary/80 font-medium"
                        >
                            Clear All
                        </button>
                    </div>

                    {/* Car Name Search */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2 font-medium">Car Model Name</label>
                        <input
                            type="text"
                            name="carName"
                            value={filters.carName}
                            onChange={handleFilterChange}
                            placeholder="e.g., Q7, X7, Model X..."
                            className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none text-white placeholder-gray-500"
                        />
                        <p className="text-gray-500 text-xs mt-1">Search by model name</p>
                    </div>

                    {/* Brand Search */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2 font-medium">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={filters.brand}
                            onChange={handleFilterChange}
                            placeholder="e.g., Audi, BMW, Tesla..."
                            className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none text-white placeholder-gray-500"
                        />
                        <p className="text-gray-500 text-xs mt-1">Search by brand name</p>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2 font-medium">Price Range</label>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="number"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                                placeholder="Min ₹"
                                className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none text-white placeholder-gray-500 text-sm"
                            />
                            <input
                                type="number"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                placeholder="Max ₹"
                                className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none text-white placeholder-gray-500 text-sm"
                            />
                        </div>
                        <p className="text-gray-500 text-xs mt-1">Price in rupees</p>
                    </div>

                    {/* Year Range */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2 font-medium">Year Range</label>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="number"
                                name="minYear"
                                value={filters.minYear}
                                onChange={handleFilterChange}
                                placeholder="From"
                                min="2000"
                                max="2025"
                                className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none text-white placeholder-gray-500 text-sm"
                            />
                            <input
                                type="number"
                                name="maxYear"
                                value={filters.maxYear}
                                onChange={handleFilterChange}
                                placeholder="To"
                                min="2000"
                                max="2025"
                                className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none text-white placeholder-gray-500 text-sm"
                            />
                        </div>
                        <p className="text-gray-500 text-xs mt-1">Manufacturing year</p>
                    </div>

                    {/* Fuel Type */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2 font-medium">Fuel Type</label>
                        <select
                            name="fuelType"
                            value={filters.fuelType}
                            onChange={handleFilterChange}
                            className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none text-white"
                        >
                            <option value="">All Fuel Types</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    {/* Transmission */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2 font-medium">Transmission</label>
                        <select
                            name="transmission"
                            value={filters.transmission}
                            onChange={handleFilterChange}
                            className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none text-white"
                        >
                            <option value="">All Transmissions</option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                    </div>

                    {/* Mileage Range */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2 font-medium">Mileage Range</label>
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                type="number"
                                name="minMileage"
                                value={filters.minMileage}
                                onChange={handleFilterChange}
                                placeholder="Min km/l"
                                className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none text-white placeholder-gray-500 text-sm"
                            />
                            <input
                                type="number"
                                name="maxMileage"
                                value={filters.maxMileage}
                                onChange={handleFilterChange}
                                placeholder="Max km/l"
                                className="w-full bg-dark-light border border-gray-600 rounded px-3 py-2 focus:border-primary focus:outline-none text-white placeholder-gray-500 text-sm"
                            />
                        </div>
                        <p className="text-gray-500 text-xs mt-1">Fuel efficiency (km/l)</p>
                    </div>

                    {/* Active Filters Summary */}
                    {Object.values(filters).some(value => value !== '') && (
                        <div className="mt-6 p-3 bg-dark-light rounded-lg">
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Active Filters:</h4>
                            <div className="flex flex-wrap gap-1">
                                {filters.carName && (
                                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                        Model: {filters.carName}
                                    </span>
                                )}
                                {filters.brand && (
                                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                        Brand: {filters.brand}
                                    </span>
                                )}
                                {filters.fuelType && (
                                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                        Fuel: {filters.fuelType}
                                    </span>
                                )}
                                {filters.transmission && (
                                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                        Trans: {filters.transmission}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
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
