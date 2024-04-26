"use client"
import { createContext, useState, useEffect } from 'react';
import { errorHandler } from '@/utils/errorHandler';
import axios from 'axios';


const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);

      if (response.status === 200) {
        setProducts(response.data.payload.products);
        setFilters(response.data.payload.filters[0]);
      }

    } catch (error) {
      const handledError = errorHandler(error);
      return handledError;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const getProductById = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product || null;
  };

  const postProduct = async (info) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, info, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setProducts((prevProducts) => [...prevProducts, response.data.payload]);
        return response.data;
      }

      return response.data;

    } catch (error) {
      const handledError = errorHandler(error);
      return handledError;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== response.data.payload._id));
        return response.data;
      }

      return response.data;

    } catch (error) {
      const handledError = errorHandler(error)
      return handledError;
    }
  };

  const updateProduct = async (productId, info) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, info, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setProducts(prevProducts => prevProducts.map(product =>
          product._id === response.data.payload._id ? response.data.payload : product
        ));
        return response.data;
      }

      return response.data;

    } catch (error) {
      const handledError = errorHandler(error)
      return handledError;
    }
  };

  const updateThumbnail = async (productId, info) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}/thumbnail/`, info, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setProducts(prevProducts => prevProducts.map(product =>
          product._id === response.data.payload._id ? response.data.payload : product
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
    <ProductContext.Provider value={{ products, filters, getProductById, postProduct, deleteProduct, updateProduct, updateThumbnail, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };