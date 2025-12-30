import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            const { data } = await axios.get('/api/admin/sell-requests', config);
            setRequests(data);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('userInfo');
                window.location.href = '/login';
            }
        }
    };

    const updateStatus = async (id, status) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            await axios.put(`/api/admin/sell-requests/${id}`, { status }, config);
            fetchRequests();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Sell Requests</h1>
            <div className="bg-dark-card rounded-lg border border-gray-800 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-dark-light text-gray-400 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Car Details</th>
                            <th className="px-6 py-4">Price Expectation</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {requests.length === 0 ? (
                            <tr><td colSpan="5" className="p-6 text-center text-gray-400">No pending requests</td></tr>
                        ) : (
                            requests.map(req => (
                                <tr key={req._id} className="hover:bg-dark-light/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{req.user?.name || 'Unknown'}</div>
                                        <div className="text-xs text-gray-500">{req.user?.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{req.carDetails.brand} {req.carDetails.name}</div>
                                        <div className="text-xs text-gray-500">{req.carDetails.year} • {req.carDetails.fuelType}</div>
                                    </td>
                                    <td className="px-6 py-4">₹ {req.carDetails.price.toLocaleString('en-IN')}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${req.status === 'Approved' ? 'bg-green-900 text-green-200' :
                                            req.status === 'Rejected' ? 'bg-red-900 text-red-200' : 'bg-yellow-900 text-yellow-200'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        {req.status === 'Pending' && (
                                            <>
                                                <button onClick={() => updateStatus(req._id, 'Approved')} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">Approve</button>
                                                <button onClick={() => updateStatus(req._id, 'Rejected')} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">Reject</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellRequests;
