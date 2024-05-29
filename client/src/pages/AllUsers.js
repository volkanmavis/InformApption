import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/css/allUsers.css'

function AllUsers() {
    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:${process.env.PORT || 8000}/users/allusers`);
            setUsers(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:${process.env.PORT || 8000}/users/${userId}`);
            const updatedUsers = users.filter(user => user._id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const confirmDeleteUser = (userId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this user?');
        if (isConfirmed) {
            deleteUser(userId);
        }
    };

    return (
        <div className='all-users'>
        <div className='container'>
            {users.map((user) => (
                <div className='card' key={user._id}>
                    <p><b>Username:</b> {user.userName}</p>
                    <p><b>Email:</b> {user.email}</p>
                    <p><b>Role:</b> {user.role}</p>
                    <p><b>Id:</b> {user._id}</p>
                    <button onClick={() => confirmDeleteUser(user._id)}>Delete</button>
                </div>
            ))}
        </div>
        </div>
    );
}

export default AllUsers;
