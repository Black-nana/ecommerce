import React, { useState } from 'react';
import DataQuery from '../tanstackQuery/DataQuery';
import { Link } from 'react-router-dom';

interface Product {
    image: string | undefined;
    id: number;
    title: string;
    description: string;
    price: number;
    category: string; // Adding category
    // Add more properties as needed
}

function Shop() {
    const { data, error, isLoading } = DataQuery();
    const products: Product[] | undefined = data?.products;
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts: Product[] = products ? products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) || // Including category in search
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) // Including description in search
    ) : [];

    return (
        <div className='mx-10 py-20'>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className='p-4 border-4 rounded-lg w-5/6 my-4 text-xl'
            />
            {/* Display filtered products */}
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {filteredProducts.length > 0 ? (
                <div>
                    {filteredProducts.map(product => (
                        <div key={product.id}
                        className='shadow-lg border-2 rounded-lg grid  p-8 cursor-default hover:scale-105 transition-all duration-200'>
                            <Link to={`/product/${product.id}`}>
                           <div className='flex gap-4 '>
                           <img src={product.image} alt={product.title} className='h-40 w-40'/>
                            <div>
                            <h2 className='font-bold'>{product.title}</h2>
                            <p>{product.description}</p>
                            <p>GH{product.price}</p>
                            </div>
                           </div>
                            {/* Add more product 
                            details as needed */}
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No products found.</div>
            )}
        </div>
    );
}

export default Shop;
