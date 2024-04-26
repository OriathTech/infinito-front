"use client"
import { createContext, useState, useEffect } from 'react';
import { errorHandler } from '@/utils/errorHandler';
import axios from 'axios';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [quantityTotalProducts, setQuantityTotalProducts] = useState(0);
    const [cart, setCart] = useState({
        products: [],
        deliveryFee: 0
    });

    useEffect(() => {
        setQuantityTotalProducts(cart.products.reduce((total, p) => total + p.quantity, 0));
    }, [cart]);

    const addDeliveryFee = (deliveryFee) => {
        setCart((prevCart) => ({
            ...prevCart,
            deliveryFee: deliveryFee
        }));
    };

    const addProductCart = (product, quantity, width) => {

        const productInCart = cart.products.find((p) => p.productId === product._id);

        if (!productInCart || productInCart.width !== width) {
            const productToAdd = {
                productId: product._id,
                name: product.name,
                width: width,
                price: product.unitaryPrice,
                quantity: quantity,
                thumbnail: product.thumbnail
            };

            setCart((prevCart) => ({
                ...prevCart,
                products: [...prevCart.products, productToAdd]
            }));

            return {
                status: "success",
                message: "Producto agregado al carrito."
            }

        }

        const indexProductInCart = cart.products.findIndex((p) => p.productId === product._id && p.width === width);

        const updatedCart = { ...cart };
        updatedCart.products[indexProductInCart].quantity = quantity;
        setCart(updatedCart);
        return {
            status: "success",
            message: "Cantidad del producto actualizada."
        }

    };

    const deleteProductCart = (productId) => {
        const updatedProducts = cart.products.filter((product) => product.productId !== productId);

        setCart((prevCart) => ({
            ...prevCart,
            products: updatedProducts
        }));

        return {
            status: "success",
            message: "Producto eliminado del carrito."
        }
    };

    const deleteAllProductsCart = () => {
        setCart((prevCart) => ({
            ...prevCart,
            products: []
        }));
        setQuantityTotalProducts(0);
    };

    const updateQuantityProduct = (productId, width, newQuantity) => {
        const index = cart.products.findIndex((product) => product.productId === productId && product.width === width);

        if (index !== -1) {
            const updatedCart = { ...cart };
            updatedCart.products[index].quantity = newQuantity;
            setCart(updatedCart);
        }
    };

    const checkout = async (info) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`, info, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setCart((prevCart) => ({
                    ...prevCart,
                    products: []
                }));
                return response.data;
            }

            return response.data;

        } catch (error) {
            const handledError = errorHandler(error);
            return handledError;
        }
    };

    return (
        <CartContext.Provider value={{ cart, quantityTotalProducts, addProductCart, deleteProductCart, deleteAllProductsCart, updateQuantityProduct, checkout, addDeliveryFee }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };