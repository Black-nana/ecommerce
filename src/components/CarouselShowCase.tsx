import React from 'react';
import MainCarousel from './MainCarousel';
import Cards from './Cards';

const CarouselShowCase = () => {
  return (
    <div className=" grid gap-4 grid-cols-[2fr,1fr] mx-10">
      <div className='w-full'>
        <MainCarousel />
      </div>
      <div>
        <Cards/>
      </div>
    </div>
  );
};

export default CarouselShowCase;
