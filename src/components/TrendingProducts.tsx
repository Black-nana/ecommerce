import React from 'react'
import { Link } from 'react-router-dom'
import DataQuery from '../tanstackQuery/DataQuery'
import Loading from './Loading';
import Product from './Product';


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
    <div>
        {data && data.products && (
          <ul className="grid grid-cols-4 gap-2">
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