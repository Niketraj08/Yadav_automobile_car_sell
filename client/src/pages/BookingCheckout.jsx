import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaCar, FaCreditCard, FaCheckCircle, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const BookingCheckout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const bookingType = new URLSearchParams(location.search).get('type') || 'buy'; // 'buy' or 'test-drive'

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        preferredDate: '',
        preferredTime: ''
    });

    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        paymentMethod: 'card' // card, upi, netbanking
    });

    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
            // Redirect to login with return URL
            navigate(`/login?redirect=/booking/${id}?type=${bookingType}`);
            return;
        }

        fetchCar();
        // Auto-fill user data if logged in
        setFormData(prev => ({
            ...prev,
            name: userInfo.name || '',
            email: userInfo.email || ''
        }));
    }, [id, navigate, bookingType]);

    const fetchCar = async () => {
        try {
            const { data } = await axios.get(`/api/cars/${id}`);
            setCar(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handleStep1Submit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const bookingPayload = {
                car: car._id,
                bookingType: bookingType,
                amount: bookingType === 'buy' ? car.price : 5000,
                customerDetails: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode
                },
                paymentMethod: paymentData.paymentMethod,
                testDriveDetails: bookingType === 'test-drive' ? {
                    date: formData.preferredDate,
                    time: formData.preferredTime
                } : {}
            };

            const { data } = await axios.post('/api/bookings', bookingPayload, config);

            // Create display order object from response
            const order = {
                bookingId: data._id,
                type: data.type,
                car: car,
                customer: data.customerDetails,
                payment: {
                    method: data.paymentDetails.method,
                    amount: data.amount,
                    status: 'Success'
                },
                date: new Date(data.createdAt).toLocaleDateString(),
                time: new Date(data.createdAt).toLocaleTimeString()
            };

            setOrderDetails(order);
            setStep(3);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Error creating booking');
        }
    };

    if (loading) return <div className="min-h-screen bg-dark text-white flex items-center justify-center">Loading...</div>;
    if (!car) return <div className="min-h-screen bg-dark text-white flex items-center justify-center">Car not found</div>;

    const amount = bookingType === 'buy' ? car.price : 5000;

    return (
        <div className="min-h-screen bg-dark text-text py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-center space-x-4">
                        <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-600'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary/20' : 'border-gray-600'}`}>
                                1
                            </div>
                            <span className="ml-2 hidden md:inline">Details</span>
                        </div>
                        <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-gray-600'}`}></div>
                        <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-600'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary/20' : 'border-gray-600'}`}>
                                2
                            </div>
                            <span className="ml-2 hidden md:inline">Payment</span>
                        </div>
                        <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-gray-600'}`}></div>
                        <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-gray-600'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-primary bg-primary/20' : 'border-gray-600'}`}>
                                3
                            </div>
                            <span className="ml-2 hidden md:inline">Confirm</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left - Car Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-dark-card rounded-xl border border-gray-800 p-6 sticky top-24">
                            <h3 className="text-xl font-bold mb-4">
                                {bookingType === 'buy' ? 'Purchase Summary' : 'Test Drive Booking'}
                            </h3>
                            <img
                                src={car.images && car.images[0] ? (car.images[0].startsWith('http') ? car.images[0] : `${car.images[0]}`) : 'https://via.placeholder.com/400x300'}
                                alt={car.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h4 className="font-bold text-lg mb-2">{car.name}</h4>
                            <div className="space-y-2 text-sm text-gray-400 mb-4">
                                <p>Brand: <span className="text-white">{car.brand}</span></p>
                                <p>Year: <span className="text-white">{car.year}</span></p>
                                <p>Fuel: <span className="text-white">{car.fuelType}</span></p>
                                <p>Transmission: <span className="text-white">{car.transmission}</span></p>
                            </div>
                            <div className="border-t border-gray-700 pt-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-400">
                                        {bookingType === 'buy' ? 'Vehicle Price' : 'Booking Fee'}
                                    </span>
                                    <span className="font-bold">₹ {amount.toLocaleString('en-IN')}</span>
                                </div>
                                {bookingType === 'buy' && (
                                    <>
                                        <div className="flex justify-between mb-2 text-sm text-gray-400">
                                            <span>Registration Fee</span>
                                            <span>₹ 15,000</span>
                                        </div>
                                        <div className="flex justify-between mb-2 text-sm text-gray-400">
                                            <span>Insurance (1 Year)</span>
                                            <span>₹ 25,000</span>
                                        </div>
                                    </>
                                )}
                                <div className="border-t border-gray-700 pt-2 mt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold">Total Amount</span>
                                        <span className="text-2xl font-bold text-primary">
                                            ₹ {(bookingType === 'buy' ? amount + 40000 : amount).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Forms */}
                    <div className="lg:col-span-2">
                        {step === 1 && (
                            <div className="bg-dark-card rounded-xl border border-gray-800 p-8">
                                <h2 className="text-3xl font-bold mb-6">
                                    {bookingType === 'buy' ? 'Buyer Information' : 'Test Drive Details'}
                                </h2>
                                <form onSubmit={handleStep1Submit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-gray-400 mb-2 text-sm font-medium">Full Name *</label>
                                            <div className="relative">
                                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleFormChange}
                                                    className="w-full bg-dark-light border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-gray-400 mb-2 text-sm font-medium">Email Address *</label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleFormChange}
                                                    className="w-full bg-dark-light border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-gray-400 mb-2 text-sm font-medium">Phone Number *</label>
                                            <div className="relative">
                                                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleFormChange}
                                                    className="w-full bg-dark-light border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {bookingType === 'test-drive' && (
                                            <>
                                                <div>
                                                    <label htmlFor="preferredDate" className="block text-gray-400 mb-2 text-sm font-medium">Preferred Date *</label>
                                                    <div className="relative">
                                                        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="date"
                                                            id="preferredDate"
                                                            name="preferredDate"
                                                            value={formData.preferredDate}
                                                            onChange={handleFormChange}
                                                            min={new Date().toISOString().split('T')[0]}
                                                            className="w-full bg-dark-light border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="preferredTime" className="block text-gray-400 mb-2 text-sm font-medium">Preferred Time *</label>
                                                    <select
                                                        id="preferredTime"
                                                        name="preferredTime"
                                                        value={formData.preferredTime}
                                                        onChange={handleFormChange}
                                                        className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                                        required
                                                    >
                                                        <option value="">Select Time</option>
                                                        <option value="10:00 AM">10:00 AM</option>
                                                        <option value="12:00 PM">12:00 PM</option>
                                                        <option value="02:00 PM">02:00 PM</option>
                                                        <option value="04:00 PM">04:00 PM</option>
                                                        <option value="06:00 PM">06:00 PM</option>
                                                    </select>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {bookingType === 'buy' && (
                                        <>
                                            <div>
                                                <label htmlFor="address" className="block text-gray-400 mb-2 text-sm font-medium">Address *</label>
                                                <div className="relative">
                                                    <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-400" />
                                                    <textarea
                                                        id="address"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleFormChange}
                                                        className="w-full bg-dark-light border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary"
                                                        rows="2"
                                                        required
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-3 gap-6">
                                                <div>
                                                    <label htmlFor="city" className="block text-gray-400 mb-2 text-sm font-medium">City *</label>
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleFormChange}
                                                        className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="state" className="block text-gray-400 mb-2 text-sm font-medium">State *</label>
                                                    <input
                                                        type="text"
                                                        id="state"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleFormChange}
                                                        className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="pincode" className="block text-gray-400 mb-2 text-sm font-medium">Pincode *</label>
                                                    <input
                                                        type="text"
                                                        id="pincode"
                                                        name="pincode"
                                                        value={formData.pincode}
                                                        onChange={handleFormChange}
                                                        className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                                        maxLength="6"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-lg transition duration-300"
                                    >
                                        Proceed to Payment
                                    </button>
                                </form>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="bg-dark-card rounded-xl border border-gray-800 p-8">
                                <h2 className="text-3xl font-bold mb-6">Payment Details</h2>

                                {/* Payment Method Selection */}
                                <div className="mb-6">
                                    <label className="block text-gray-400 mb-4 text-sm font-medium">Select Payment Method</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentData({ ...paymentData, paymentMethod: 'card' })}
                                            className={`p-4 rounded-lg border-2 transition ${paymentData.paymentMethod === 'card' ? 'border-primary bg-primary/20' : 'border-gray-700 hover:border-gray-600'}`}
                                        >
                                            <FaCreditCard className="text-2xl mx-auto mb-2" />
                                            <p className="text-sm">Card</p>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentData({ ...paymentData, paymentMethod: 'upi' })}
                                            className={`p-4 rounded-lg border-2 transition ${paymentData.paymentMethod === 'upi' ? 'border-primary bg-primary/20' : 'border-gray-700 hover:border-gray-600'}`}
                                        >
                                            <span className="text-2xl mx-auto mb-2 block">₹</span>
                                            <p className="text-sm">UPI</p>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentData({ ...paymentData, paymentMethod: 'netbanking' })}
                                            className={`p-4 rounded-lg border-2 transition ${paymentData.paymentMethod === 'netbanking' ? 'border-primary bg-primary/20' : 'border-gray-700 hover:border-gray-600'}`}
                                        >
                                            <span className="text-2xl mx-auto mb-2 block">🏦</span>
                                            <p className="text-sm">Net Banking</p>
                                        </button>
                                    </div>
                                </div>

                                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                                    {paymentData.paymentMethod === 'card' && (
                                        <>
                                            <div>
                                                <label htmlFor="cardNumber" className="block text-gray-400 mb-2 text-sm font-medium">Card Number</label>
                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    name="cardNumber"
                                                    value={paymentData.cardNumber}
                                                    onChange={handlePaymentChange}
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength="19"
                                                    className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                                    required
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Demo: Use any 16-digit number</p>
                                            </div>
                                            <div>
                                                <label htmlFor="cardName" className="block text-gray-400 mb-2 text-sm font-medium">Cardholder Name</label>
                                                <input
                                                    type="text"
                                                    id="cardName"
                                                    name="cardName"
                                                    value={paymentData.cardName}
                                                    onChange={handlePaymentChange}
                                                    placeholder="John Doe"
                                                    className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="expiryDate" className="block text-gray-400 mb-2 text-sm font-medium">Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        id="expiryDate"
                                                        name="expiryDate"
                                                        value={paymentData.expiryDate}
                                                        onChange={handlePaymentChange}
                                                        placeholder="MM/YY"
                                                        maxLength="5"
                                                        className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="cvv" className="block text-gray-400 mb-2 text-sm font-medium">CVV</label>
                                                    <input
                                                        type="text"
                                                        id="cvv"
                                                        name="cvv"
                                                        value={paymentData.cvv}
                                                        onChange={handlePaymentChange}
                                                        placeholder="123"
                                                        maxLength="3"
                                                        className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {paymentData.paymentMethod === 'upi' && (
                                        <div>
                                            <label htmlFor="upiId" className="block text-gray-400 mb-2 text-sm font-medium">UPI ID</label>
                                            <input
                                                type="text"
                                                id="upiId"
                                                placeholder="yourname@upi"
                                                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                                required
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Demo: Use any UPI format</p>
                                        </div>
                                    )}

                                    {paymentData.paymentMethod === 'netbanking' && (
                                        <div>
                                            <label htmlFor="bankSelect" className="block text-gray-400 mb-2 text-sm font-medium">Select Bank</label>
                                            <select
                                                id="bankSelect"
                                                className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                                                required
                                            >
                                                <option value="">Choose Bank</option>
                                                <option value="sbi">State Bank of India</option>
                                                <option value="hdfc">HDFC Bank</option>
                                                <option value="icici">ICICI Bank</option>
                                                <option value="axis">Axis Bank</option>
                                            </select>
                                        </div>
                                    )}

                                    <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-4 text-yellow-200 text-sm">
                                        <p className="font-bold mb-1">🔒 Demo Payment Gateway</p>
                                        <p>This is a simulated payment. No actual charges will be made.</p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="flex-1 bg-dark-light hover:bg-gray-700 border border-gray-600 text-white font-bold py-4 rounded-lg transition duration-300"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-4 rounded-lg transition duration-300"
                                        >
                                            Pay ₹ {(bookingType === 'buy' ? amount + 40000 : amount).toLocaleString('en-IN')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {step === 3 && orderDetails && (
                            <div className="bg-dark-card rounded-xl border border-gray-800 p-8 text-center">
                                <div className="bg-green-900/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaCheckCircle className="text-6xl text-green-500" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">
                                    {bookingType === 'buy' ? 'Purchase Successful!' : 'Test Drive Booked!'}
                                </h2>
                                <p className="text-gray-400 mb-8">
                                    {bookingType === 'buy'
                                        ? 'Your order has been confirmed. We will contact you shortly for delivery arrangements.'
                                        : 'Your test drive has been scheduled. We look forward to seeing you!'}
                                </p>

                                <div className="bg-dark-light rounded-lg p-6 mb-8 text-left">
                                    <h3 className="font-bold mb-4 text-center">Order Details</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Booking ID:</span>
                                            <span className="font-mono text-primary">{orderDetails.bookingId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Vehicle:</span>
                                            <span>{orderDetails.car.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Customer:</span>
                                            <span>{orderDetails.customer.name}</span>
                                        </div>
                                        {bookingType === 'test-drive' && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Date:</span>
                                                    <span>{formData.preferredDate}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Time:</span>
                                                    <span>{formData.preferredTime}</span>
                                                </div>
                                            </>
                                        )}
                                        <div className="flex justify-between pt-2 border-t border-gray-700">
                                            <span className="text-gray-400">Amount Paid:</span>
                                            <span className="text-primary font-bold">₹ {orderDetails.payment.amount.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Payment Status:</span>
                                            <span className="text-green-500 font-bold">{orderDetails.payment.status}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => navigate('/cars')}
                                        className="flex-1 bg-dark-light hover:bg-gray-700 border border-gray-600 text-white font-bold py-3 rounded-lg transition duration-300"
                                    >
                                        Browse More Cars
                                    </button>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition duration-300"
                                    >
                                        Go Home
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCheckout;
