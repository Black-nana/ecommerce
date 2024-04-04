
import DataQuery from '../tanstackQuery/DataQuery';
import { Link } from 'react-router-dom';

const Cards = () => {
    const { data } = DataQuery();
    const products = data?.products;
    const card1 = products?.[4];
    const card2 = products?.[15];

  return (
    <div className='flex max-sm:flex-col md:flex lg:flex gap-4'>
      <div className="card card-compact h-fit border-2 bg-base-100 shadow-xl p-2">
        <figure>
          <img
            src={card1?.image}
            alt={card1?.title}
            className='w-32 h-32 object-fill'
          />
        </figure>
        <div className="card-body">
            <h2 className="">{card1?.title}</h2>
            <Link to={`/product/${card1?.id}`}>
            <div className="card-actions justify-end">
                <button className="rounded bg-[#716acd] hover:bg-[#8d98d9] duration-300 transition-all text-white p-2">Buy Now</button>
            </div>
            </Link>
        </div>
      </div>
      <div className="card card-compact bg-base-100 shadow-xl border-2 w-full lg:hidden  p-2">
        <figure>
          <img
            src={card2?.image}
            alt={card2?.title}
            className='w-32 h-32 object-fill'
          />
        </figure>
        <div className="card-body">
            <h2 className="">{card2?.title}</h2>
            <Link to={`/product/${card2?.id}`}>
            <div className="card-actions justify-end">
                <button className="rounded bg-[#716acd] hover:bg-[#8d98d9] duration-300 transition-all text-white p-2">Buy Now</button>
            </div>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
