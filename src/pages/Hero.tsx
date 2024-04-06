import { Link } from 'react-router-dom'
import banner from '../assets/main banner 3.jpg'

const Hero = () => {
  return (
    <div
  className="w-full py-20 hero min-h-96 text-white bg-cover bg-center bg-no-repeat relative"
  style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',}}
>
  <div className="hero-overlay bg-opacity-15"></div>
  <div className=" text-center text-neutral-content">
    <div className="w-full">
    <h1 className="text-6xl font-bold max-md:text-4xl text-[#f5eded]">Black Nana, Providing the quality brand!</h1>
        <p className="py-6 text-2xl max-md:text-lg text-[#f5eded]">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae
          et a id nisi.
        </p>
        <Link to="/shop" className="btn btn-wide bg-[#716acd] hover:bg-[#8d98d9] duration-300 transition-all text-white">Shop Now</Link>
      </div>
  </div>
</div>
  )
}

export default Hero