import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaCar, FaMoneyBillWave, FaUser } from 'react-icons/fa';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get('/api/bookings', config);
            setBookings(data);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('userInfo');
                window.location.href = '/login';
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    const testDrives = bookings.filter(b => b.type === 'test-drive');
    const purchases = bookings.filter(b => b.type === 'buy');

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold mb-8">Bookings & Payments</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-dark-card p-6 rounded-lg border border-gray-800 flex items-center">
                    <div className="bg-blue-900/20 p-4 rounded-full mr-4">
                        <FaCar className="text-blue-500 text-xl" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Test Drives</p>
                        <h3 className="text-2xl font-bold">{testDrives.length}</h3>
                    </div>
                </div>
                <div className="bg-dark-card p-6 rounded-lg border border-gray-800 flex items-center">
                    <div className="bg-green-900/20 p-4 rounded-full mr-4">
                        <FaMoneyBillWave className="text-green-500 text-xl" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Car Sales</p>
                        <h3 className="text-2xl font-bold">{purchases.length}</h3>
                    </div>
                </div>
            </div>

            {/* Test Drives Table */}
            <div className="bg-dark-card rounded-lg border border-gray-800 overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" />
                        Test Drive Bookings
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-dark-light text-gray-400 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Car</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Amount Paid</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {testDrives.map(booking => (
                                <tr key={booking._id} className="hover:bg-dark-light/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {booking.car && booking.car.images && booking.car.images[0] && !booking.car.images[0].includes('…') && booking.car.images[0].length > 20 && !booking.car.images[0].endsWith(':') && (
                                                <img
                                                    src={booking.car.images[0].startsWith('http') ? booking.car.images[0] : `${booking.car.images[0]}`}
                                                    alt={booking.car.name}
                                                    className="w-10 h-10 rounded object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            )}
                                            <span className="font-medium">{booking.car?.name || 'Deleted Car'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <p className="font-medium">{booking.customerDetails.name}</p>
                                            <p className="text-gray-500 text-xs">{booking.customerDetails.phone}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <p>{booking.testDriveDetails?.date}</p>
                                            <p className="text-gray-500 text-xs">{booking.testDriveDetails?.time}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">₹ {booking.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-green-900 text-green-200 rounded text-xs">Confirmed</span>
                                    </td>
                                </tr>
                            ))}
                            {testDrives.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No test drive bookings found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Purchases Table */}
            <div className="bg-dark-card rounded-lg border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FaMoneyBillWave className="text-green-500" />
                        Car Sales & Payments
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-dark-light text-gray-400 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Car</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Amount Paid</th>
                                <th className="px-6 py-4">Payment Method</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {purchases.map(booking => (
                                <tr key={booking._id} className="hover:bg-dark-light/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {booking.car && booking.car.images && booking.car.images[0] && !booking.car.images[0].includes('…') && booking.car.images[0].length > 20 && !booking.car.images[0].endsWith(':') && (
                                                <img
                                                    src={booking.car.images[0].startsWith('http') ? booking.car.images[0] : `${booking.car.images[0]}`}
                                                    alt={booking.car.name}
                                                    className="w-10 h-10 rounded object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            )}
                                            <span className="font-medium">{booking.car?.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <p className="font-medium">{booking.customerDetails.name}</p>
                                            <p className="text-gray-500 text-xs">{booking.customerDetails.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {booking.customerDetails.city}, {booking.customerDetails.state}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-green-400">₹ {booking.amount.toLocaleString('en-IN')}</td>
                                    <td className="px-6 py-4 capitalize">{booking.paymentDetails.method}</td>
                                </tr>
                            ))}
                            {purchases.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No car sales found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
