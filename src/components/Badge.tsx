// import React from 'react'
import { FaShippingFast } from 'react-icons/fa';
import { GiReturnArrow } from 'react-icons/gi';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { MdLocalGroceryStore } from 'react-icons/md';

const Badge = () => {
  return (
    <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-4 grid-cols-4 place-items-center bg-slate-700 p-4">
      <div className="w-full flex gap-4 items-center">
        <div>
          <FaShippingFast className="text-6xl text-amber-700 p-2 border-2 border-blue-500 rounded-full" />
        </div>
        <div className="max-sm:hidden">
          <p className="text-white font-sans font-semibold ">Shipping</p>
          <p className="text-slate-300">Free delivery over Gh100</p>
        </div>
      </div>
      <div className="w-full flex gap-4 items-center">
        <div>
          <GiReturnArrow className="text-6xl text-amber-700 p-2 border-2 border-blue-500 rounded-full" />
        </div>
        <div className="max-sm:hidden">
          <p className="text-white font-sans font-semibold text-2xl">
            Free Returns
          </p>
          <p className="text-slate-300">Free Returns At No Cost</p>
        </div>
      </div>
      <div className="w-full flex gap-4 items-center">
        <div>
          <RiSecurePaymentLine className="text-6xl text-amber-700 p-2 border-2 border-blue-500 rounded-full" />
        </div>
        <div className="max-sm:hidden">
          <p className="text-white font-sans font-semibold text-2xl ">
            Secure Shopping
          </p>
          <p className="text-slate-300">Best security features</p>
        </div>
      </div>
      <div className="w-full flex gap-4 items-center">
        <div>
          <MdLocalGroceryStore className="text-6xl text-amber-700 p-2 border-2 border-blue-500 rounded-full" />
        </div>
        <div className="max-sm:hidden">
          <p className="text-white font-sans font-semibold text-2xl">
            Unlimited Products
          </p>
          <p className="text-slate-300">providing best products</p>
        </div>
      </div>
    </div>
  );
};

export default Badge;
