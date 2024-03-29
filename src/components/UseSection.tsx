import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Corrected import
import { useAuth } from '../Auth/useAuth';
import { RootState } from '../appRedux/slice/rootReducer';

const UserSection = () => { // Renamed component to UserSection
  

  const cartItems = useSelector((state: RootState) => state.cart.cartItems); // Corrected useSelector
  
  const calculateSubtotal = (cartItems: any[]) => { // Corrected function name to camelCase
    let subtotal = 0;
    cartItems.forEach(item => {
      subtotal += item.price * item.quantity;
    });
    return subtotal;
  }
  const subtotal = calculateSubtotal(cartItems);

  const { logout, user } = useAuth();
  const handleLogout = () => {
    logout();
  }

  return (
    <div>
      <div className="flex gap-2">
        <Link
          to="/wishlist"
          className="btn btn-ghost btn-circle text-accent-content"
        >
          <FaHeart className="text-xl" />
        </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="badge badge-sm indicator-item">{cartItems.length}</span> {/* Updated cartItems.length */}
            </div>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">{cartItems.length} Items</span> {/* Updated cartItems.length */}
              <span className="text-info">Subtotal: ‎ {subtotal}</span>
              <Link to={'/cart'}>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={`/userProfile`}>
                  <span className="justify-between">Profile</span>
                </Link>
              </li>
              <li onClick={handleLogout}>
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSection;
