import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextGradient from './TextGradient';
import bars from '../assets/bar-1.svg';
import QuantityInput from './QuantityInput';
import { removeFromCart, addToCart } from '../appRedux/slice/cart/cartSlice'; // Import addToCart action creator

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
  const dispatch = useDispatch();

  const { cartItems, error } = useSelector((state: RootState) => state.cart);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };
  console.log('cart items',cartItems);
  
//calculate the total price of the items in the cart
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(addToCart({ id:itemId, quantity: newQuantity }));
    } else {
      setErrorMessage('Quantity cannot be less than 1');
    }
  };

  const validatedCartItems = cartItems.map((item: CartItems) => ({
    ...item,
    quantity: Number.isFinite(item.quantity) ? Math.max(item.quantity, 1) : 1,
  }));

  const subtotal = validatedCartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const calculateShippingCost = (subtotal: number) => {
    return parseFloat(Math.max(0, subtotal * 0.1).toFixed(2)); // Convert shipping cost to 2 decimal places
  };

  const shippingCost = calculateShippingCost(Number(subtotal));
  const tax = ((Number(subtotal) + shippingCost) * 0.15).toFixed(2); // Calculate tax based on subtotal plus shipping cost
  const total = (Number(subtotal) + shippingCost + Number(tax)).toFixed(2); // Calculate total including tax

  const handleClearCart = () => {
    cartItems.forEach((item) => dispatch(removeFromCart(item.id)));
  };


console.table(validatedCartItems);

  
  return (
    <div className="w-full grid place-items-center">
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
      <div className="w-full my-10 mx-10 grid grid-cols-[2fr,1fr] place-items-center">
        <div className="w-full p-8">
          {validatedCartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 ">
              <div className="grid grid-cols-4 gap-4  items-center">
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
                        <span>{item.rating.rate}</span>
                      </TextGradient>
                    </span>
                  </p>
                </div>
                <div>
                  <p>Quantity</p>
                  <QuantityInput initialValue={item.quantity} onChange={(quantity: number) => handleQuantityChange(item.id, quantity)} />

                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    Remove
                  </button>
                </div>
                <div>
                  <span className="text-orange-400">GH₵‎ {item.price}</span>
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
              <span> GH‎  {subtotal}</span>
            </p>
            <p className="font-bold  grid grid-cols-2 text-sm font-sans">
              <span>Shipping</span>
              <span> GH‎  {shippingCost}</span>
            </p>
            <p className="font-bold grid grid-cols-2 text-sm font-sans">
              <span>Tax 15%</span> 
              <span>GH‎  {tax}</span>
            </p>
            <p className="font-bold grid grid-cols-2 text-sm font-sans my-6">
              <span>Order Total</span>
              <span> GH‎  {total}</span>
            </p>
          </div>
          <div className='w-full'>
            <button className="btn btn-primary w-full">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
