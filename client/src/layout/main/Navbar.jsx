
import React, { useContext } from "react";
import { MdMenuOpen } from "react-icons/md";
import logo from '../../assets/logo.png'
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = ({setSidebarOpen}) => {
  const {user,logout} = useContext(AuthContext)
  const { pathname } = useLocation();
console.log(pathname);
const shouldShowButton = location.pathname.startsWith('/dashboard')

  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${
        pathname === "/" ? null : "bg-white"
      }`}
    >
      <ul className='max-w-7xl mx-auto flex gap-3 h-full items-center'>
        <li className='flex-auto flex font-semibold items-center text-xl md:text-2xl'>
          <Link to='/'>
            <img className="h-12 " src={logo} alt="professilink" />
          </Link>
          {
            shouldShowButton &&           <button   onClick={() => setSidebarOpen((state) => !state)} className=" border ml-5 text-gray-600 z-3"><MdMenuOpen  size={30}/></button>
          }

        </li>

        <Link className='hover:text-primary' to='/jobs'>
            Jobs
          </Link>

        <Link className='hover:text-primary' to='/blogs'>
            Blogs
          </Link>
        <Link className='hover:text-primary' to='/profile'>
            Profiles
          </Link>
        {
user?.email && (
  user?.role ? (
    <Link className='hover:text-primary hover:border hover:border-primary hover:bg-transparent bg-primary text-white px-3 py-1 rounded-full' to='/dashboard'>
    Dashboard
  </Link>
  ) : (
    <Link className='hover:text-primary' to='/register'>
   Get Started
  </Link>
  )
)
        }
        <li>

        </li>

{
  user?.id  ? 
  (
    <button onClick={()=>logout()}
    className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
    
  >
  Logout
  </button>
  )
   :(
    <li>
    <Link
      className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
      to='/login'
    >
      Login
    </Link>
  </li>
  )
  
}

      </ul>
    </nav>
  );
};

export default Navbar;
