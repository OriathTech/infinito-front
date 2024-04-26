"use client"
import { createContext, useState } from 'react';
import { errorHandler } from '@/utils/errorHandler';
import axios from 'axios';

const PricesContext = createContext();

const PricesProvider = ({ children }) => {
    const [prices, setPrices] = useState([]);

    const fetchPrices = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/prices`, {
                withCredentials: true
            });

            if (response.status === 200) {
                setPrices(response.data.payload);
                return response.data;
            }

            return response.data;

        } catch (error) {
            const handledError = errorHandler(error)
            return handledError;
        }
    };

    const getPriceById = (priceId) => {
        const price = prices.find((price) => price._id === priceId);
        return price || null;
    };

    const updatePrice = async (priceId, info) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/prices/${priceId}`, { info }, {
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
        <PricesContext.Provider value={{ prices, fetchPrices, getPriceById, updatePrice }}>
            {children}
        </PricesContext.Provider>
    );
};

export { PricesProvider, PricesContext };