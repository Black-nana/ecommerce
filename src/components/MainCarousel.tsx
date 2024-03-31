import React, { useState, useEffect, ReactNode } from 'react';
import DataQuery from '../tanstackQuery/DataQuery';
import { Link } from 'react-router-dom';

const MainCarousel = () => {
  const { data, error, isLoading } = DataQuery();
  console.log('electronics', data?.electronics);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % (data?.electronics.length || 0)
      );
    }, 5000); // Change slide every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [data?.electronics.length]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="w-full h-screen">Error: {error.message}</div>;
  }

  return (
    <div className="h-fit overflow-hidden border-2 shadow-xl rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {data?.electronics.map(
          (
            item: {
              [x: string]: any;
              description: ReactNode;
              image: string | undefined;
              title: string | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <div
              key={index}
              className=" bg-slate-50 p-4 w-full grid items-center gap-10 grid-cols-2 flex-shrink-0">
              <div className="flex flex-col gap-10 items-center">
                <div className="text-center font-sans font-bold text-2xl text-slate-600">
                  {item.title}
                </div>
                <div>
                  <Link to={`/product/${item.id}`}>
                    <button className="btn py-2 px-4 border-2 bg-transparent hover:bg-blue-500 transition-all duration-300">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-64 h-80 object-cover"
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MainCarousel;
