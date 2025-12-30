import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellCar = () => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        fuelType: 'Petrol',
        transmission: 'Manual',
        year: '',
        mileage: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!userInfo) {
            alert('Please login to submit a sell request.');
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post('/api/admin/sell-requests', {
                carDetails: {
                    ...formData,
                    price: Number(formData.price),
                    year: Number(formData.year),
                    mileage: Number(formData.mileage),
                    image: 'https://via.placeholder.com/300' // Placeholder for now or implement upload
                }
            }, config);

            alert('Sell request submitted successfully! Pending admin approval.');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Error submitting request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark text-text py-12 px-4">
            <div className="max-w-3xl mx-auto bg-dark-card rounded-xl shadow-2xl overflow-hidden border border-gray-800">
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-4 text-center">Sell Your <span className="text-primary">Car</span></h1>
                    <p className="text-center text-gray-400 mb-8">Fill in the details below to get the best price for your vehicle.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-400 mb-2">Car Model Name</label>
                                <input type="text" id="name" name="name" onChange={handleChange} className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none" required />
                            </div>
                            <div>
                                <label htmlFor="brand" className="block text-gray-400 mb-2">Brand</label>
                                <input
                                    type="text"
                                    id="brand"
                                    name="brand"
                                    onChange={handleChange}
                                    placeholder="Enter brand name (e.g., Audi, BMW...)"
                                    className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none placeholder-gray-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-gray-400 mb-2">Expected Price (INR)</label>
                                <input type="number" id="price" name="price" onChange={handleChange} className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none" required />
                            </div>
                            <div>
                                <label htmlFor="year" className="block text-gray-400 mb-2">Year of Purchase</label>
                                <input type="number" id="year" name="year" onChange={handleChange} className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none" required />
                            </div>
                            <div>
                                <label htmlFor="fuelType" className="block text-gray-400 mb-2">Fuel Type</label>
                                <select id="fuelType" name="fuelType" onChange={handleChange} className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none">
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="transmission" className="block text-gray-400 mb-2">Transmission</label>
                                <select id="transmission" name="transmission" onChange={handleChange} className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none">
                                    <option value="Manual">Manual</option>
                                    <option value="Automatic">Automatic</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="mileage" className="block text-gray-400 mb-2">Mileage (kmpl)</label>
                                <input type="number" id="mileage" name="mileage" onChange={handleChange} className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none" required />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-gray-400 mb-2">Description</label>
                            <textarea id="description" name="description" onChange={handleChange} rows="4" className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none" placeholder="Tell us more about the car's condition..."></textarea>
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-lg transition duration-300 text-lg">
                            {loading ? 'Submitting...' : 'Submit Sell Request'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellCar;
