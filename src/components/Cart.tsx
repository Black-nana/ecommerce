import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextGradient from './TextGradient';
import bars from '../assets/bar-1.svg';
import { removeFromCart } from '../appRedux/slice/cart/cartSlice'; // Import addToCart action creator
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {toast, ToastContainer} from 'react-toastify';
import { useAuth } from '../Auth/useAuth';
import { Link } from 'react-router-dom';
import { parse, v4 as uuidv4 } from 'uuid';
import { addToOderHistoy,removeFromOrderHistory } from '../appRedux/slice/history/historySlice';

interface CartItems {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface RootState {
  cart: {
    cartItems: CartItems[];
    error: string | null;
  };
}

const Cart: React.FC = () => {
  const {user} = useAuth();
  const dispatch = useDispatch();


  // localStorage.clear();
const generateOderId = () =>{
  return parseInt(uuidv4(), 16);
}

  const { cartItems } = useSelector((state: RootState) => state.cart);

  console.log('cartitems', cartItems);

  // Calculate subtotal, shipping cost, tax, and total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = 10; // Adjust as needed
  const taxRate = 0.15; // 15%
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
    toast.error('Item removed from cart');
  };

  const handleClearCart = () => {
    cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
    toast.error('Cart cleared');
  };

  const handleAddToHistory = () => {
    const orderId = generateOderId();
    interface Order {
      id: number;
      items: CartItems[];
      total: number;
      date: string;
    }
    
    const order: Order = {
      id: orderId,
      items: cartItems,
      total: total,
      date: new Date().toISOString(),
    };
    dispatch(addToOderHistoy(order));
    console.log('order', order);
    
  };
  

  return (
    <div className="w-full grid place-items-center">
      <ToastContainer/>
      <div className="grid place-items-center my-4">
        <TextGradient>
          <div className="grid place-items-center">
            <p>Cart Items</p>
            <div>
              <img
                alt="bar"
                loading="lazy"
                width="500"
                height="50"
                decoding="async"
                data-nimg="1"
                className="my-6"
                src={bars}
              />
            </div>
          </div>
        </TextGradient>
      </div>
     {user?(
       <div className="w-full my-10 mx-10 grid grid-cols-[2fr,1fr] place-items-center">
       <div className="w-full p-8">
         {cartItems.map((item) => (
           <div
             key={item.id}
             className="flex flex-col gap-4 ">
             <div className="grid grid-cols-5 gap-4  items-center">
               <div>
                 <img
                   src={item.image || '/path/to/placeholder.jpg'}
                   alt={item.title}
                   width="100"
                 />
               </div>
               <div>
                 <p className="flex flex-col">
                   <span className="text-sm font-light">{item.title}</span>
                   <span>
                     {' '}
                     Rate:
                     <TextGradient>
                       <span>{item?.rating?.rate}</span>
                     </TextGradient>
                   </span>
                 </p>
               </div>
               <div>
                 <p>Quantity</p>
                 <div>{item.quantity}</div>
               </div>
               <div>
                 <span className="text-orange-400">GH₵‎ {item.price}</span>
               </div>
               <div>
                 <button onClick={() => handleRemoveFromCart(item.id)} className='p-2 bg-red-400 text-white rounded-lg'>
                 <FontAwesomeIcon icon={faHeartBroken} className='text-red-900' />
                   <span>
                   Remove
                   </span>
                 </button>
               </div>
             </div>
             <div className="w-full border-b-4 my-4"></div>
           </div>
         ))}
         <div>
           <button
             onClick={handleClearCart}
             className="btn btn-primary">
             Clear Cart
           </button>
         </div>
       </div>
       <div className="w-full grid place-items-center gap-10">
         <div className="w-full bg-slate-700 p-8 text-white font-sans rounded-lg">
           <h2 className="text-2xl font-bold">Order Summary</h2>
           <div className="w-full border-b-4 my-4"></div>
           <p className="font-bold  grid grid-cols-2 text-sm font-sans">
             <span>Subtotal</span>
             <span> GH‎ {subtotal}</span>
           </p>
           <p className="font-bold  grid grid-cols-2 text-sm font-sans">
             <span>Shipping</span>
             <span> GH‎ {shippingCost}</span>
           </p>
           <p className="font-bold grid grid-cols-2 text-sm font-sans">
             <span>Tax 15%</span>
             <span>GH‎ {tax}</span>
           </p>
           <p className="font-bold grid grid-cols-2 text-sm font-sans my-6">
             <span>Order Total</span>
             <span> GH‎ {total}</span>
           </p>
         </div>
         <div className="w-full">
          <Link to={'/checkout'}>
           <button className="btn btn-primary w-full" onClick={handleAddToHistory}>
             Proceed to Checkout
           </button>
           </Link>
         </div>
       </div>
     </div>
     ):(
      <div className='grid place-items-center h-64'>
          <Link to={'/signin'}>
          <button className='btn bg-red-400 text-white font-bold text-xl py-2 px-4 rounded-lg'>Please Log in</button>
          </Link>
        </div>
     )}
    </div>
  );
};

export default Cart;
