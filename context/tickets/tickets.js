"use client"
import { createContext, useState } from 'react';
import { errorHandler } from '@/utils/errorHandler';
import axios from 'axios';

const TicketContext = createContext();

const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);

    const fetchTickets = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`, {
                withCredentials: true,
            });

            if (response.status === 200) {
                setTickets(response.data.payload);
            }

        } catch (error) {
            const handledError = errorHandler(error);
            return handledError;
        }
    };

    const getTicketsByUser = (userId) => {
        const userTickets = tickets.filter((ticket) => ticket.userId === userId);
        return userTickets;
    };

    const getTicketById = (ticketId) => {
        const ticket = tickets.find((ticket) => ticket._id === ticketId);
        return ticket;
    };

    const updateTicket = async (ticketId, info) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${ticketId}`, info, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setTickets(prevTickets => prevTickets.map(ticket =>
                    ticket._id === response.data.payload._id ? response.data.payload : ticket
                ));
                return response.data;
            }

            return response.data;

        } catch (error) {
            const handledError = errorHandler(error)
            return handledError;
        }
    };

    const deleteTicket = async (ticketId) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${ticketId}`, {
                withCredentials: true,
            });

            if (response.status === 200) {
                setTickets((prevTickets) => prevProducts.filter((ticket) => ticket._id !== response.data.payload._id));
                return response.data;
            }

            return response.data;

        } catch (error) {
            const handledError = errorHandler(error)
            return handledError;
        }
    };

    return (
        <TicketContext.Provider value={{ tickets, fetchTickets, getTicketsByUser, getTicketById, updateTicket, deleteTicket }}>
            {children}
        </TicketContext.Provider>
    );
};

export { TicketProvider, TicketContext };