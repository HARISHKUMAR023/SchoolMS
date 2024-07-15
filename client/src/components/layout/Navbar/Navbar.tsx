import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import proimg from '../../../assets/avatar.jpg';
import { IoMdNotifications } from "react-icons/io";
import ThemeToggle from '../../comman/Buttons/ThemeToggle';
import Breadcrumb from './Breadcrumb'
import { useDispatch } from 'react-redux';
import { logout } from '../../../slices/authSlice';
const Navbar: React.FC = () => {
     const dispatch = useDispatch();
  const [showFloatDiv, setShowFloatDiv] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  const toggleFloatDiv = () => {
    setShowFloatDiv(!showFloatDiv);
  };

  return (
    <div className='flex justify-between items-center p-2 bg-primary/70 dark:bg-darkbg1 border-b dark:border-gray-300
                    shadow-md border-darkbg2 bg-opacity-70 backdrop-blur-sm rounded-md'>
      <div className='flex items-center'>
        <Breadcrumb />
      </div>
      <div className='mr-3 flex flex-row gap-x-3 items-center'>
        <ThemeToggle />
        <IoMdNotifications className='size-6 hover:shadow dark:text-white' />
        <h2 className='dark:text-white'>Harish</h2>
        <img
          src={proimg}
          alt="Profile image"
          className='size-10 rounded-full p-0.5 hover:shadow-yellow-600 hover:shadow-md cursor-pointer'
          onClick={toggleFloatDiv}
        />
        {showFloatDiv && (
          <div id='floatdiv' className='absolute size-16 mt-28 ml-[125px]'>
            <button onClick={handleLogout} className="bg-white py-2 px-3 rounded-md shadow-md shadow-yellow-600 text-black font-medium dark:bg-darkbg1 dark:text-white">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
