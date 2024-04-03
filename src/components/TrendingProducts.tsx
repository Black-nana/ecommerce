import React from 'react'
import DataQuery from '../tanstackQuery/DataQuery'
import Loading from './Loading';
import Product from './Product';
import TextGradient from './TextGradient';
import bars from '../assets/bar-1.svg'


interface ProductType {
    id: number;
    title: string;
    image: string;
    price: string;
    // Add more properties as needed
  }

const TrendingProducts:React.FC = () => {
    const { data, error, isLoading } = DataQuery();
    const products = data?.products;
    if (isLoading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        );
      }
      if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
      }
  return (
    <div className='grid place-items-center'>
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
          <ul className="grid lg:grid-cols-4 md:grid-cols-2 sm grid-cols-1 gap-2">
            {products.map((product: ProductType) => (
              <Product
                key={product.id}
                product={product}
              />
            ))}
          </ul>
        )}
    </div>
  )
}

export default TrendingProducts