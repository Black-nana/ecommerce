import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextGradient from './TextGradient';
import bars from '../assets/bar-1.svg';
import { removeFromCart } from '../appRedux/slice/cart/cartSlice';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../Auth/useAuth';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { addToOrderHistory } from '../appRedux/slice/history/historySlice'; // Import addToOrderHistory action creator
import { clearCart } from '../appRedux/slice/cart/cartSlice';
import { RootState } from '../appRedux/slice/rootReducer'; // Import RootState type
import moment from 'moment';

const Cart: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const generateOrderId = () => {
    return uuidv4();
  };

  const { cartItems } = useSelector((state: RootState) => state.cart);
  console.log('cartItems', cartItems);

  // Calculate subtotal, shipping cost, tax, and total
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = 10; // Adjust as needed
  const taxRate = 0.15; // 15%
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Convert numbers to fixed(2) format
  const subtotalFixed = subtotal.toFixed(2);
  const shippingCostFixed = shippingCost.toFixed(2);
  const taxFixed = tax.toFixed(2);
  const totalFixed = total.toFixed(2);

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
    toast.error('Item removed from cart');
  };

  const handleClearCart = () => {
    cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
    toast.error('Cart cleared');
  };

  const handleAddToHistory = () => {
    const orderId = generateOrderId();
    const order = {
      id: orderId,
      total: parseFloat(totalFixed), // Convert totalFixed to a number
      quantity: totalQuantity,
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    dispatch(addToOrderHistory(order));
    console.log('order', order);
    dispatch(clearCart());
  };

  return (
    <div className="w-full grid place-items-center py-20">
      <ToastContainer />
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
      {user ? (
        <div className="w-full my-10 mx-10 px-10 grid lg:grid-cols-[2fr,1fr] place-items-center">
          <div className="w-full p-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 ">
                  <div className="w-full border-b-4 my-4"></div>
                <div className="grid lg:grid-cols-5 gap-4 items-center">
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
                        <span>{item.rating.rate}</span>
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>Quantity</p>
                    <div>{item.quantity}</div>
                  </div>
                  <div>
                    <span className="text-orange-400">GH₵ {item.price}</span>
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="p-2 bg-red-400 text-white rounded-lg">
                      <FontAwesomeIcon
                        icon={faHeartBroken}
                        className="text-red-900"
                      />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
                <div className="w-full border-b-4 my-4"></div>
              </div>
            ))}
            <div>
              <button
                onClick={handleClearCart}
                className="btn text-white bg-[#716acd] hover:bg-[#8d98d9] duration-300 transition-all">
                Clear Cart
              </button>
            </div>
          </div>
          <div className="w-full grid place-items-center gap-10 ">
            <div className="w-full bg-slate-700 p-8 text-white font-sans rounded-lg">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <div className="w-full border-b-4 my-4"></div>
              <p className="font-bold grid grid-cols-2 text-sm font-sans">
                <span>Subtotal</span>
                <span> GH {subtotalFixed}</span>
              </p>
              <p className="font-bold grid grid-cols-2 text-sm font-sans">
                <span>Shipping</span>
                <span> GH {shippingCostFixed}</span>
              </p>
              <p className="font-bold grid grid-cols-2 text-sm font-sans">
                <span>Tax 15%</span>
                <span>GH {taxFixed}</span>
              </p>
              <p className="font-bold grid grid-cols-2 text-sm font-sans my-6">
                <span>Order Total</span>
                <span> GH {totalFixed}</span>
              </p>
            </div>
            <div className="w-full">
              <Link to={'/checkout'}>
                <button
                  className="btn bg-[#716acd] hover:bg-[#8d98d9] duration-300 transition-all tex-white w-full"
                  onClick={handleAddToHistory}>
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center h-64">
          <Link to={'/signin'}>
            <button className="btn bg-red-400 text-white font-bold text-xl py-2 px-4 rounded-lg">
              Please Log in
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
