import React from 'react';
import { Link } from 'react-router-dom';

// Define types/interfaces
interface ProductType {
  id: number;
  title: string;
  image: string;
  price: string;
}

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <li className='shadow-lg border-2 rounded-lg grid place-items-center p-8 cursor-default hover:scale-105 transition-all duration-200'>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} className='h-20 w-20'/>
        <div className='text-left'>
          <p className='text-sm'>{product.title}</p>
          <p className='text-orange-600 font-serif'>GH‎ {product.price}</p>
        </div>
      </Link>
    </li>
  );
};

export default Product;
