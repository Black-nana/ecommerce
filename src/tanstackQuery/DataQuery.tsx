import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const DataQuery = () => {
  return useQuery({
    queryKey: ['products', 'cart','electronics','jewelry' ], // Unique keys for each query
    queryFn: async () => {
      try {
        // Fetch products
        const productsResponse = await axios.get('https://fakestoreapi.com/products');
        const products = productsResponse.data;

        // Fetch Electronics
        const electronicsResponse = await axios.get('https://fakestoreapi.com/products/category/electronics');
        const electronics = electronicsResponse.data;

        //Fetch Jewelry
        const jewelryResponse = await axios.get('https://fakestoreapi.com/products/category/jewelery');
        const jewelry = jewelryResponse.data;

        // Fetch Carts
        const cartResponse = await axios.get('https://fakestoreapi.com/carts');
        const cart = cartResponse.data;
       


        return { products, cart, electronics,jewelry }; // Return an object containing both sets of data
      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
      }
    },
    // enabled: false, // Disable the query by default
  });
};

export default DataQuery;
