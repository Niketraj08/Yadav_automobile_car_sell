import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };
            const { data } = await axios.get('/api/admin/users', config);
            setUsers(data);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('userInfo');
                window.location.href = '/login';
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Registered Users</h1>
            <div className="bg-dark-card rounded-lg border border-gray-800 overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-dark-light text-gray-400 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Joined Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-dark-light/50 transition">
                                <td className="px-6 py-4 font-medium">{user.name}</td>
                                <td className="px-6 py-4 text-gray-400">{user.email}</td>
                                <td className="px-6 py-4">
                                    {user.isAdmin ? (
                                        <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-bold">Admin</span>
                                    ) : (
                                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-bold">User</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
