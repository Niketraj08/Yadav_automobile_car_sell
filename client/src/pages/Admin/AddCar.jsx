import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaImages } from 'react-icons/fa';

const AddCar = () => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: '',
        fuelType: 'Petrol',
        transmission: 'Manual',
        year: new Date().getFullYear(),
        mileage: '',
        description: '',
    });
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const uploadFileHandler = async (e) => {
        const files = Array.from(e.target.files);

        // Limit to 10 images
        if (images.length + files.length > 10) {
            alert('You can only upload up to 10 images');
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

    const submitHandler = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            alert('Please upload at least one image');
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
                price: Number(formData.price),
                year: Number(formData.year),
                mileage: Number(formData.mileage),
                images: images,
            };

            await axios.post('/api/cars', payload, config);
            alert('Car added successfully!');
            navigate('/admin/manage-cars');
        } catch (error) {
            console.error(error);
            alert('Error adding car');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Add New Car</h1>
            <form onSubmit={submitHandler} className="bg-dark-card p-8 rounded-lg border border-gray-800 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-400 mb-2">Car Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            placeholder="e.g., Audi Q7 Technology 55 TFSI"
                            className="w-full bg-dark-light border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="brand" className="block text-gray-400 mb-2">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            onChange={handleChange}
                            placeholder="e.g., Audi, BMW, Mercedes-Benz"
                            className="w-full bg-dark-light border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-primary placeholder-gray-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-gray-400 mb-2">Price (INR)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={handleChange}
                            placeholder="e.g., 8500000"
                            className="w-full bg-dark-light border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="fuelType" className="block text-gray-400 mb-2">Fuel Type</label>
                        <select id="fuelType" name="fuelType" onChange={handleChange} className="w-full bg-dark-light border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-primary">
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="transmission" className="block text-gray-400 mb-2">Transmission</label>
                        <select id="transmission" name="transmission" onChange={handleChange} className="w-full bg-dark-light border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-primary">
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="year" className="block text-gray-400 mb-2">Year</label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            onChange={handleChange}
                            defaultValue={new Date().getFullYear()}
                            className="w-full bg-dark-light border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="mileage" className="block text-gray-400 mb-2">Mileage (kmpl)</label>
                        <input
                            type="number"
                            id="mileage"
                            name="mileage"
                            onChange={handleChange}
                            placeholder="e.g., 12"
                            className="w-full bg-dark-light border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-primary"
                            required
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-400 mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        onChange={handleChange}
                        rows="4"
                        placeholder="Describe the car features, technology, comfort, etc..."
                        className="w-full bg-dark-light border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-primary placeholder-gray-500"
                        required
                    ></textarea>
                </div>

                {/* Multiple Image Upload */}
                <div className="mb-8">
                    <label className="block text-gray-400 mb-2 flex items-center gap-2">
                        <FaImages className="text-primary" />
                        Car Images (Up to 10 images - different angles)
                    </label>
                    <p className="text-sm text-gray-500 mb-3">Upload up to 10 images to show the car from different angles (exterior, interior, dashboard, engine, etc.). Customers can view all images before purchase.</p>

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
                                        src={`${image}`}
                                        alt={`Preview ${index + 1}`}
                                        className="h-32 w-full object-cover rounded border-2 border-gray-600 group-hover:border-primary transition"
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

                    {images.length === 0 && (
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                            <FaImages className="mx-auto text-4xl text-gray-600 mb-2" />
                            <p className="text-gray-500">No images uploaded yet</p>
                            <p className="text-xs text-gray-600 mt-1">Upload at least 1 image (max 10)</p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={images.length === 0 || uploading}
                    className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add Car to Inventory
                </button>
            </form>
        </div>
    );
};

export default AddCar;
