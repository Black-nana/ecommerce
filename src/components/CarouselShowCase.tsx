
import MainCarousel from './MainCarousel';
import Cards from './Cards';

const CarouselShowCase = () => {
  return (
    <div className=" grid gap-4 lg:grid-cols-[2fr,1fr] grid-cols-1 px-10">
      <div className='w-full'>
        <MainCarousel />
      </div>
      <div className='w-full'>
        <Cards/>
      </div>
    </div>
  );
};

export default CarouselShowCase;
