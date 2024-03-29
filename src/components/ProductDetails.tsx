import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import QuantityInput from './QuantityInput';
import TextGradient from './TextGradient';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import { addToCart } from '../appRedux/slice/cart/cartSlice';
import { addToWishlist } from '../appRedux/slice/whishlist/wishlistSlice'; // Import addToWishlist action creator
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify package
import 'react-toastify/dist/ReactToastify.css';

interface ProductDetailsProps {}

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState<number>(1);
  let { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
        throw new Error('Failed to fetch product');
      }
    },
  });

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    const newData = {
      id: data?.id,
      title: data?.title,
      image: data?.image,
      price: data?.price,
      rating: data?.rating, // Add rating to the cart item
      quantity, // Directly access the quantity state
    };
    dispatch(addToCart(newData));

    // Trigger a toast notification
    toast.success('Item added to cart');
  };

  const handleAddToWishlist = ({}) => {
    // Dispatch action to add to wishlist
    const newData = {
      id: data?.id,
      title: data?.title,
      image: data?.image,
      price: data?.price,
      rating: data?.rating, // Add rating to the wishlist item
      name: data?.title, // Add the required 'name' property
    };
    dispatch(addToWishlist(newData));
    console.log('newData', newData);

    // Trigger a toast notification
    toast.success('Item added to wishlist');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full grid place-items-center">
      <ToastContainer /> {/* Initialize the ToastContainer component */}
      <div className="w-5/6 grid place-items-center grid-cols-2 p-10 mx-10 ">
        <div>
          <img src={data?.image} alt={data?.title} className="h-80 full" />
        </div>
        <div>
          <h2 className="font-bold text-4xl">{data?.title}</h2>
          <p>
            <span className="font-semibold text-xl">Description:</span>{' '}
            <span className="text-base font-light">{data?.description}</span>
          </p>
          <p>
            <span className="font-semibold text-xl">Rating:</span>{' '}
            <TextGradient>{data?.rating.rate}</TextGradient>{' '}
          </p>
          <p className="text-orange-500 font-extrabold font-sans py-4 text-3xl">
            Price: GH‎ {data?.price}
          </p>
          <div className="py-4">
            <QuantityInput initialValue={1} onChange={handleQuantityChange} />
          </div>
          <button
            onClick={handleAddToCart} // Use handleAddToCart function
            className="btn bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md mr-2"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Add to
            Cart
          </button>
          <button
            onClick={handleAddToWishlist} // Use handleAddToWishlist function
            className="btn bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            <FontAwesomeIcon icon={faHeart} className="mr-2" /> Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
