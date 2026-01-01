import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaTimes, FaImages } from 'react-icons/fa';

const ManageCars = () => {
    const [cars, setCars] = useState([]);
    const [editingCar, setEditingCar] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        year: '',
        fuelType: '',
        transmission: '',
        mileage: '',
        description: '',
        status: 'Available'
    });
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const location = useLocation();

    useEffect(() => {
        fetchCars();
    }, []);

    useEffect(() => {
        if (cars.length > 0) {
            const queryParams = new URLSearchParams(location.search);
            const editId = queryParams.get('edit');
            if (editId) {
                const carToEdit = cars.find(c => c._id === editId);
                if (carToEdit) {
                    openEditModal(carToEdit);
                }
            }
        }
    }, [location.search, cars]);

    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/cars');
            setCars(data);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('userInfo');
                window.location.href = '/login';
            }
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                await axios.delete(`/api/cars/${id}`, config);
                fetchCars();
            } catch (error) {
                console.error(error);
                alert('Error deleting car');
            }
        }
    };

    const openEditModal = (car) => {
        setEditingCar(car);
        setFormData({
            name: car.name,
            brand: car.brand,
            price: car.price,
            year: car.year,
            fuelType: car.fuelType,
            transmission: car.transmission,
            mileage: car.mileage,
            description: car.description,
            status: car.status
        });
        setImages(car.images || []);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditingCar(null);
        setImages([]);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const uploadFileHandler = async (e) => {
        const files = Array.from(e.target.files);

        if (images.length + files.length > 10) {
            alert('You can only have up to 10 images');
            return;
        }

        setUploading(true);

        try {
            const uploadedImages = [];

            for (const file of files) {
                const formData = new FormData();
                formData.append('image', file);

                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                const { data } = await axios.post('/api/upload', formData, config);
                uploadedImages.push(data);
            }

            setImages(prev => [...prev, ...uploadedImages]);
            setUploading(false);
        } catch (error) {
            console.error('Upload Error:', error.response ? error.response.data : error.message);
            alert('Error uploading images. Please check file type and size.');
            setUploading(false);
        }
    };

    const removeImage = (indexToRemove) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            alert('Please have at least one image');
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const payload = {
                ...formData,
                images: images
            };

            await axios.put(`/api/cars/${editingCar._id}`, payload, config);
            alert('Car updated successfully!');
            closeEditModal();
            fetchCars();
        } catch (error) {
            console.error(error);
            alert('Error updating car');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Cars</h1>
            <div className="bg-dark-card rounded-lg border border-gray-800 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-dark-light text-gray-400 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Brand</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {cars.map(car => (
                            <tr key={car._id} className="hover:bg-dark-light/50 transition">
                                <td className="px-6 py-4">
                                    <img
                                        src={
                                            car.images && car.images[0] && !car.images[0].includes('…') && car.images[0].length > 20 && !car.images[0].endsWith(':')
                                                ? (car.images[0].startsWith('http') ? car.images[0] : `${car.images[0]}`)
                                                : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTBlMGUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltZzwvdGV4dD48L3N2Zz4='
                                        }
                                        alt={car.name}
                                        className="w-16 h-10 object-cover rounded"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTBlMGUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltZzwvdGV4dD48L3N2Zz4=';
                                            e.target.onError = null; // Prevent infinite loop
                                        }}
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium">{car.name}</td>
                                <td className="px-6 py-4 text-gray-400">{car.brand}</td>
                                <td className="px-6 py-4">₹ {car.price.toLocaleString('en-IN')}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${car.status === 'Available' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                                        {car.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex space-x-3">
                                    <button onClick={() => openEditModal(car)} className="text-blue-400 hover:text-blue-300 transition" title="Edit Car">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => deleteHandler(car._id)} className="text-red-400 hover:text-red-300 transition" title="Delete Car">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-dark-card rounded-xl border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-dark-card border-b border-gray-800 px-6 py-4 flex justify-between items-center z-10">
                            <h2 className="text-2xl font-bold">Edit Car</h2>
                            <button onClick={closeEditModal} className="text-gray-400 hover:text-white transition">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="edit-name" className="block text-gray-400 mb-2">Car Model Name</label>
                                    <input
                                        type="text"
                                        id="edit-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-brand" className="block text-gray-400 mb-2">Brand</label>
                                    <input
                                        type="text"
                                        id="edit-brand"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        placeholder="Enter brand name"
                                        className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none placeholder-gray-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-price" className="block text-gray-400 mb-2">Price (INR)</label>
                                    <input
                                        type="number"
                                        id="edit-price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-year" className="block text-gray-400 mb-2">Year</label>
                                    <input
                                        type="number"
                                        id="edit-year"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-fuelType" className="block text-gray-400 mb-2">Fuel Type</label>
                                    <select
                                        id="edit-fuelType"
                                        name="fuelType"
                                        value={formData.fuelType}
                                        onChange={handleChange}
                                        className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
                                    >
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Hybrid">Hybrid</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="edit-transmission" className="block text-gray-400 mb-2">Transmission</label>
                                    <select
                                        id="edit-transmission"
                                        name="transmission"
                                        value={formData.transmission}
                                        onChange={handleChange}
                                        className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
                                    >
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">Automatic</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="edit-mileage" className="block text-gray-400 mb-2">Mileage (kmpl)</label>
                                    <input
                                        type="number"
                                        id="edit-mileage"
                                        name="mileage"
                                        value={formData.mileage}
                                        onChange={handleChange}
                                        className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="edit-status" className="block text-gray-400 mb-2">Status</label>
                                    <select
                                        id="edit-status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Sold">Sold</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="edit-description" className="block text-gray-400 mb-2">Description</label>
                                <textarea
                                    id="edit-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full bg-dark-light border border-gray-600 rounded px-4 py-3 text-white focus:border-primary focus:outline-none"
                                    placeholder="Enter car description..."
                                ></textarea>
                            </div>

                            {/* Image Management */}
                            <div>
                                <label className="block text-gray-400 mb-2 flex items-center gap-2">
                                    <FaImages className="text-primary" />
                                    Car Images (Up to 10 images)
                                </label>
                                <p className="text-sm text-gray-500 mb-3">Manage car images. Remove existing or add new ones.</p>

                                <div className="flex items-center space-x-4 mb-4">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={uploadFileHandler}
                                        disabled={images.length >= 10}
                                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary file:cursor-pointer disabled:opacity-50"
                                    />
                                    {uploading && <span className="text-gray-400 animate-pulse">Uploading...</span>}
                                </div>

                                {/* Image Previews Grid */}
                                {images.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image.startsWith('http') ? image : `${image}`}
                                                    alt={`Preview ${index + 1}`}
                                                    className="h-32 w-full object-cover rounded border-2 border-gray-600 group-hover:border-primary transition"
                                                    onError={(e) => {
                                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTBlMGUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJyb2tlbiBJbWFnZTwvdGV4dD48L3N2Zz4=';
                                                        e.target.onError = null; // Prevent infinite loop
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                                >
                                                    <FaTimes size={12} />
                                                </button>
                                                <span className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                                    {index + 1}
                                                </span>
                                            </div>
                                        ))}

                                        {/* Add More Placeholder */}
                                        {images.length < 10 && (
                                            <div className="h-32 border-2 border-dashed border-gray-600 rounded flex items-center justify-center text-gray-500 text-sm">
                                                <span>Add {10 - images.length} more</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={uploading || images.length === 0}
                                    className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Update Car
                                </button>
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCars;
