
import { Link } from 'react-router-dom';
import UserSection from './UseSection';
import { useAuth } from '../Auth/useAuth'; // Import the useAuth hook from AuthProvider


const Navbar = () => {
  const { user } = useAuth(); // Get the user 

  return (
    <div className="navbar bg-base-100 fixed z-50 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <Link
              to="/"
              className="menu-title">
              Home
            </Link>
            <Link
              to="/shop"
              className="menu-title">
              Shop
            </Link>
            <Link
              to="/about"
              className="menu-title">
              About Us
            </Link>
            <Link
              to="/contact"
              className="menu-title">
              Contact
            </Link>
            {!user && (
              <Link
                to="/signup"
                className="menu-title">
                Sign Up
              </Link>
            )}
            {!user && (
              <Link
                to="/signin"
                className="menu-title">
                Sign In
              </Link>
            )}
          </ul>
        </div>
        <Link
          to={'/'}
          className="btn btn-ghost text-xl">
          BlackNana
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Link
            to="/"
            className="menu-title">
            Home
          </Link>
          <Link
            to="/shop"
            className="menu-title">
            Shop
          </Link>
          <Link
            to="/about"
            className="menu-title">
            About Us
          </Link>
          <Link
            to="/contact"
            className="menu-title">
            Contact
          </Link>
          {!user && (
            <Link
              to="/signup"
              className="menu-title">
              Sign Up
            </Link>
          )}
          {!user && (
            <Link
              to="/signin"
              className="menu-title">
              Sign In
            </Link>
          )}
        </ul>
      </div>
      <div className="navbar-end pr-4">
        <UserSection />
      </div>
    </div>
  );
};

export default Navbar;
