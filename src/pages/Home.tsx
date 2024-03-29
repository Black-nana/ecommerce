import React from 'react';
import Stat from '../components/Stat';
import Hero from './Hero';
import DataQuery from '../tanstackQuery/DataQuery';
import Product from '../components/Product';
import TextGradient from '../components/TextGradient';
import bars from '../assets/bar-1.svg';
import Loading from '../components/Loading';

// Define the interface for product data
interface ProductType {
  id: number;
  title: string;
  image: string;
  price: string;
  // Add more properties as needed
}

const Home: React.FC = () => {
  const { data, error, isLoading } = DataQuery();
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
    <div className="w-full">
      <Hero />
      <div className="grid place-items-center my-10">
        <Stat />
      </div>
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
        {data && data.products && (
          <ul className="grid grid-cols-4 gap-2">
            {data.products.map((product: ProductType) => (
              <Product
                key={product.id}
                product={product}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
