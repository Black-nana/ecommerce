import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../appRedux/slice/cart/cartSlice';
import { addToWishlist } from '../appRedux/slice/whishlist/wishlistSlice';
import { BookHeart, NotebookText } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../Auth/useAuth';

// Define types/interfaces
interface ProductType {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  quantity:number;
} interface CartItems {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
  quantity: number;
}

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (user) {
      const newData: CartItems = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
        quantity: 1 // Set the default quantity to 1
      };
      dispatch(addToCart(newData));
      toast.success('Item added to cart');
    } else {
      toast.error('Please log in');
    }
  };
  

  const handleAddToWishlist = () => {
    if (user) {
      const newData:CartItems = {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
        quantity:1,
      };
      dispatch(addToWishlist(newData));
      toast.success('Item added to wishlist');
    } else {
      toast.error('Please log in');
    }
  };

  return (
    <li className="w-full shadow-lg border-2 rounded-lg grid lg:place-items-center p-8 cursor-default transition-all duration-200">
      <Toaster 
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          zIndex: 9999,
        }}
       
      />
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-20 w-20"
        />
        <div className="text-left">
          <p className="text-sm">{product.title}</p>
          <p className="text-orange-600 font-serif">GH‎ {product.price}</p>
        </div>
      </Link>
      <div className="w-full flex text-purple-500 justify-end gap-2">
        <div className="relative group" onClick={handleAddToWishlist}>
          <BookHeart
            size={24}
            className="cursor-pointer"
          />
          <span className="w-fit mb-2 absolute bottom-full -translate-x-3 mt-1 rounded-md px-2 bg-indigo-100 text-indigo-800 text-sm opacity-0 transition-opacity group-hover:opacity-100">
            Add to wishlist
          </span>
        </div>

        <div className="relative group" onClick={handleAddToCart}>
          <NotebookText
            size={24}
            className="cursor-pointer"
          />
          <span className="mb-2 absolute bottom-full -translate-x-3 mt-1 rounded-md px-2 bg-indigo-100 text-indigo-800 text-sm opacity-0 transition-opacity group-hover:opacity-100">
            Add to cart
          </span>
        </div>
      </div>
    </li>
  );
};

export default Product;
