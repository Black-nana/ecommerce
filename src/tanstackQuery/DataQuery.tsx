import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const DataQuery = () => {
  return useQuery({
    queryKey: ['products', 'cart', ], // Unique keys for each query
    queryFn: async () => {
      try {
        // Fetch products
        const productsResponse = await axios.get('https://fakestoreapi.com/products');
        const products = productsResponse.data;

     
        // Fetch Carts
        const cartResponse = await axios.get('https://fakestoreapi.com/carts');
        const cart = cartResponse.data;
       


        return { products, cart }; // Return an object containing both sets of data
      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
      }
    },
  });
};

export default DataQuery;
