import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaGasPump, FaCogs, FaTachometerAlt, FaCalendarAlt, FaMoneyBillWave, FaArrowLeft, FaCar } from 'react-icons/fa';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await axios.get(`/api/cars/${id}`);
                setCar(data);
                if (data.images && data.images.length > 0) {
                    setSelectedImage(data.images[0]);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    if (loading) return <div className="text-center py-20 bg-dark text-white">Loading...</div>;
    if (!car) return <div className="text-center py-20 bg-dark text-white">Car not found</div>;

    return (
        <div className="bg-dark min-h-screen text-text py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <Link to="/cars" className="inline-flex items-center text-gray-400 hover:text-primary mb-6 transition">
                    <FaArrowLeft className="mr-2" /> Back to Listing
                </Link>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800 h-[400px]">
                            <img
                                src={selectedImage ? (selectedImage.startsWith('http') ? selectedImage : `${selectedImage}`) : 'https://via.placeholder.com/800x600'}
                                alt={car.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Thumbnail gallery */}
                        {car.images && car.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {car.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(img)}
                                        className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition active:scale-95 ${selectedImage === img ? 'border-primary' : 'border-gray-700 hover:border-gray-500'}`}
                                    >
                                        <img
                                            src={img.startsWith('http') ? img : `${img}`}
                                            alt={`${car.name} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div>
                        <h1 className="text-4xl font-bold mb-2">{car.name}</h1>
                        <p className="text-xl text-primary font-semibold mb-6">Create the Future of Driving</p>

                        <div className="text-4xl font-bold text-white mb-8">
                            ₹ {car.price.toLocaleString('en-IN')}
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-dark-card p-4 rounded-lg border border-gray-800 flex items-center space-x-4 hover:border-primary/50 transition duration-300">
                                <FaGasPump className="text-2xl text-primary" />
                                <div>
                                    <p className="text-gray-400 text-sm">Fuel Type</p>
                                    <p className="font-bold">{car.fuelType}</p>
                                </div>
                            </div>
                            <div className="bg-dark-card p-4 rounded-lg border border-gray-800 flex items-center space-x-4 hover:border-primary/50 transition duration-300">
                                <FaCogs className="text-2xl text-primary" />
                                <div>
                                    <p className="text-gray-400 text-sm">Transmission</p>
                                    <p className="font-bold">{car.transmission}</p>
                                </div>
                            </div>
                            <div className="bg-dark-card p-4 rounded-lg border border-gray-800 flex items-center space-x-4 hover:border-primary/50 transition duration-300">
                                <FaTachometerAlt className="text-2xl text-primary" />
                                <div>
                                    <p className="text-gray-400 text-sm">Mileage</p>
                                    <p className="font-bold">{car.mileage} kmpl</p>
                                </div>
                            </div>
                            <div className="bg-dark-card p-4 rounded-lg border border-gray-800 flex items-center space-x-4 hover:border-primary/50 transition duration-300">
                                <FaCalendarAlt className="text-2xl text-primary" />
                                <div>
                                    <p className="text-gray-400 text-sm">Year</p>
                                    <p className="font-bold">{car.year}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Description</h3>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {car.description}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                to={`/booking/${car._id}?type=buy`}
                                className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2 text-lg"
                            >
                                <FaMoneyBillWave />
                                <span>Buy Now</span>
                            </Link>
                            <Link
                                to={`/booking/${car._id}?type=test-drive`}
                                className="flex-1 bg-dark-light hover:bg-gray-700 border border-gray-600 text-white font-bold py-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2 text-lg"
                            >
                                <FaCar />
                                <span>Book Test Drive</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
