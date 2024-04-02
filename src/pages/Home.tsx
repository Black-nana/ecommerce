import React from 'react';
import Stat from '../components/Stat';
import Hero from './Hero';
import DataQuery from '../tanstackQuery/DataQuery';

import TextGradient from '../components/TextGradient';
import bars from '../assets/bar-1.svg';
import Loading from '../components/Loading';
import Badge from '../components/Badge';
import CarouselShowCase from '../components/CarouselShowCase';
import TrendingProducts from '../components/TrendingProducts';
import Jewelry from '../components/Jewelery';


// Define the interface for product data
interface ProductType {
  id: number;
  title: string;
  image: string;
  price: string;
  // Add more properties as needed
}

const Home: React.FC = () => {
  const {  error, isLoading } = DataQuery();
  // console.log(data?.products);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="w-full h-screen">Error: {error.message}</div>;
  }

  return (
    <div className="w-full grid place-items-center">
      <Hero />
      <Badge />
      <div className="grid place-items-center my-10">
        <Stat />
      </div>
      <CarouselShowCase />
      <Jewelry />
      <div className="grid place-items-center p-10">
        <h2 className="font-extrabold text-6xl py-6">
          <TextGradient>
            Trending Products
            <div>
              <img
                alt="bar"
                loading="lazy"
                width="500"
                height="50"
                decoding="async"
                data-nimg="1"
                className="mt-6"
                src={bars}
              />
            </div>
          </TextGradient>
        </h2>
        <TrendingProducts />
      </div>
      
    </div>
  );
};

export default Home;
