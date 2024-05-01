"use client"
import { createContext, useState } from 'react';
import { errorHandler } from '@/utils/errorHandler';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
                withCredentials: true
            });

            if (response.status === 200) {
                setUsers(response.data.payload);
                return response.data;
            }

            return response.data;

        } catch (error) {
            const handledError = errorHandler(error);
            return handledError;
        }
    };

    const getUserById = (userId) => {
        const user = users.find((user) => user._id === userId);
        return user || null;
    };

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
                withCredentials: true
            });

            if (response.status === 200) {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== response.data.payload._id));
                return response.data;
            }

            return response.data;

        } catch (error) {
            const handledError = errorHandler(error)
            return handledError;
        }
    };

    const updateUser = async (userId, info) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, { info }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setUsers(prevUsers => prevUsers.map(user =>
                    user._id === response.data.payload._id ? response.data.payload : user
                ));
                return response.data;
            }

            return response.data;

        } catch (error) {
            const handledError = errorHandler(error)
            return handledError;
        }
    };

    return (
        <UserContext.Provider value={{ users, fetchUsers, getUserById, deleteUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };