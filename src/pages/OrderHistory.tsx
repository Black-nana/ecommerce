import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../appRedux/slice/rootReducer';
import { clearHistory } from '../appRedux/slice/history/historySlice';
import { useDispatch } from 'react-redux';
import TextGradient from '../components/TextGradient';
import bars from '../assets/bar-1.svg';
import Loading from '../components/Loading';

const OrderHistory: React.FC = () => {
  const dispatch = useDispatch();
  const { orderHistory } = useSelector((state: RootState) => state.history);
  console.log('orderHistory', orderHistory);

  if (!orderHistory) {
    return<div className="flex justify-center items-center h-screen">
    <Loading />
  </div>; 
  }

  const handleClearHistory = () => {
    dispatch(clearHistory());
    toast.error('Order history cleared');
  };

  return (
    <div>
      <div className='grid place-items-center my-4'>
      <TextGradient>
          <div className="grid place-items-center">
            <p>Order History</p>
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
      {orderHistory.map((order, index) => (
        <div
          key={order.id}
          className="my-4">
          <div className="collapse collapse-plus bg-base-200">
            <input
              type="radio"
              name="my-accordion-3"
              defaultChecked
            />
            <div className="collapse-title text-xl font-medium">
              Order ID: {order.id}
            </div>
            <div className="collapse-content flex justify-evenly w-full ">
              <div className='flex flex-col'>
                <span className='p-2'>Order</span>
                <span className='p-2'> {index + 1}</span>
                </div>
              <div className="flex flex-col font-sans">
                <span className='p-2'>Date</span>
                <span className='p-2'> {order?.date}</span>
                </div>
              <div className="flex flex-col font-sans">
                <span className='p-2'>Quantity</span>
                <span className='p-2'> {order?.quantity}</span>
              </div>
              <div className="flex flex-col font-sans">
                <span className='p-2'>Total</span>
                <span className='p-2'>GH₵{order?.total}</span> 
              </div>
              {/* Render other order details as needed */}
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleClearHistory}
        className="btn bg-[#716acd] hover:bg-[#8d98d9] duration-300 transition-all w-full">
        Clear History
      </button>
      <ToastContainer />
    </div>
  );
};

export default OrderHistory;
