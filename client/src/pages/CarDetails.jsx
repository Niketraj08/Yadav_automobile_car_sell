import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import { FaGasPump, FaCogs, FaTachometerAlt, FaCalendarAlt, FaMoneyBillWave, FaArrowLeft, FaCar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayRef = useRef(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await api.get(`/api/cars/${id}`);
                setCar(data);
                if (data.images && data.images.length > 0) {
                    setSelectedImage(data.images[0]);
                    setCurrentImageIndex(0);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    // Auto-play carousel
    useEffect(() => {
        if (car?.images && car.images.length > 1 && isAutoPlaying) {
            autoPlayRef.current = setInterval(() => {
                setCurrentImageIndex((prevIndex) => {
                    const nextIndex = (prevIndex + 1) % car.images.length;
                    setSelectedImage(car.images[nextIndex]);
                    return nextIndex;
                });
            }, 3000); // 3 seconds
        }

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [car?.images, isAutoPlaying]);

    // Navigation functions
    const goToPrevious = () => {
        if (!car?.images || car.images.length === 0) return;
        const newIndex = currentImageIndex === 0 ? car.images.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
        setSelectedImage(car.images[newIndex]);
    };

    const goToNext = () => {
        if (!car?.images || car.images.length === 0) return;
        const newIndex = (currentImageIndex + 1) % car.images.length;
        setCurrentImageIndex(newIndex);
        setSelectedImage(car.images[newIndex]);
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
        setSelectedImage(car.images[index]);
    };

    if (loading) return <div className="text-center py-20 bg-dark text-white">Loading...</div>;
    if (!car) return <div className="text-center py-20 bg-dark text-white">Car not found</div>;

    return (
        <div className="bg-dark min-h-screen text-text py-4 px-4 sm:py-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/cars" className="inline-flex items-center text-gray-400 hover:text-primary mb-4 sm:mb-6 transition text-sm sm:text-base">
                    <FaArrowLeft className="mr-2" /> Back to Listing
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div
                            className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-800 h-[250px] sm:h-[350px] lg:h-[450px] group"
                            onMouseEnter={() => setIsAutoPlaying(false)}
                            onMouseLeave={() => setIsAutoPlaying(true)}
                        >
                            <img
                                src={selectedImage ? (selectedImage.startsWith('http') ? selectedImage : `${selectedImage}`) : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTBlMGUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4='}
                                alt={car.name}
                                className="w-full h-full object-cover transition-opacity duration-300"
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTBlMGUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
                                    e.target.onError = null; // Prevent infinite loop
                                }}
                            />

                            {/* Navigation Arrows */}
                            {car?.images && car.images.length > 1 && (
                                <>
                                    <button
                                        onClick={goToPrevious}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                                        aria-label="Previous image"
                                    >
                                        <FaChevronLeft className="text-lg sm:text-xl" />
                                    </button>
                                    <button
                                        onClick={goToNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
                                        aria-label="Next image"
                                    >
                                        <FaChevronRight className="text-lg sm:text-xl" />
                                    </button>
                                </>
                            )}

                            {/* Image Counter */}
                            {car?.images && car.images.length > 1 && (
                                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                    {currentImageIndex + 1} / {car.images.length}
                                </div>
                            )}
                        </div>
                        {/* Thumbnail gallery */}
                        {car.images && car.images.length > 1 && (
                            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {car.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToImage(index)}
                                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition active:scale-95 ${currentImageIndex === index ? 'border-primary' : 'border-gray-700 hover:border-gray-500'}`}
                                    >
                                        <img
                                            src={img.startsWith('http') ? img : `${img}`}
                                            alt={`${car.name} view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9Ijc1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1nPC90ZXh0Pjwvc3ZnPg==';
                                                e.target.onError = null; // Prevent infinite loop
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Dot Indicators */}
                        {car?.images && car.images.length > 1 && (
                            <div className="flex justify-center gap-2">
                                {car.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToImage(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                            currentImageIndex === index
                                                ? 'bg-primary scale-125'
                                                : 'bg-gray-600 hover:bg-gray-500'
                                        }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="lg:pl-4">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{car.name}</h1>
                        <p className="text-lg sm:text-xl text-primary font-semibold mb-4 sm:mb-6">Create the Future of Driving</p>

                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8">
                            ₹ {car.price.toLocaleString('en-IN')}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="bg-dark-card p-3 sm:p-4 rounded-lg border border-gray-800 flex items-center space-x-3 sm:space-x-4 hover:border-primary/50 transition duration-300">
                                <FaGasPump className="text-xl sm:text-2xl text-primary flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-gray-400 text-xs sm:text-sm">Fuel Type</p>
                                    <p className="font-bold text-sm sm:text-base truncate">{car.fuelType}</p>
                                </div>
                            </div>
                            <div className="bg-dark-card p-3 sm:p-4 rounded-lg border border-gray-800 flex items-center space-x-3 sm:space-x-4 hover:border-primary/50 transition duration-300">
                                <FaCogs className="text-xl sm:text-2xl text-primary flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-gray-400 text-xs sm:text-sm">Transmission</p>
                                    <p className="font-bold text-sm sm:text-base truncate">{car.transmission}</p>
                                </div>
                            </div>
                            <div className="bg-dark-card p-3 sm:p-4 rounded-lg border border-gray-800 flex items-center space-x-3 sm:space-x-4 hover:border-primary/50 transition duration-300">
                                <FaTachometerAlt className="text-xl sm:text-2xl text-primary flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-gray-400 text-xs sm:text-sm">Mileage</p>
                                    <p className="font-bold text-sm sm:text-base truncate">{car.mileage} kmpl</p>
                                </div>
                            </div>
                            <div className="bg-dark-card p-3 sm:p-4 rounded-lg border border-gray-800 flex items-center space-x-3 sm:space-x-4 hover:border-primary/50 transition duration-300">
                                <FaCalendarAlt className="text-xl sm:text-2xl text-primary flex-shrink-0" />
                                <div className="min-w-0 flex-1">
                                    <p className="text-gray-400 text-xs sm:text-sm">Year</p>
                                    <p className="font-bold text-sm sm:text-base truncate">{car.year}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 sm:mb-8">
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 border-b border-gray-800 pb-2">Description</h3>
                            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                                {car.description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Link
                                to={`/booking/${car._id}?type=buy`}
                                className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-3 sm:py-4 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2 text-base sm:text-lg"
                            >
                                <FaMoneyBillWave className="text-sm sm:text-base" />
                                <span>Buy Now</span>
                            </Link>
                            <Link
                                to={`/booking/${car._id}?type=test-drive`}
                                className="flex-1 bg-dark-light hover:bg-gray-700 border border-gray-600 text-white font-bold py-3 sm:py-4 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2 text-base sm:text-lg"
                            >
                                <FaCar className="text-sm sm:text-base" />
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
