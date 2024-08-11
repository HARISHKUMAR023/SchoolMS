import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import proimg from '../../../assets/avatar.jpg';
import { IoMdNotifications } from "react-icons/io";
import ThemeToggle from '../../comman/Buttons/ThemeToggle';
import Breadcrumb from './Breadcrumb';
import { useDispatch } from 'react-redux';
import { logout } from '../../../slices/authSlice';
import ThemeSwitcher from '../../comman/ThemeSwitcher';
import colorpicker from '../../../assets/icone/color.png';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const [showFloatDiv, setShowFloatDiv] = useState(false);
  const [showNotification, setNotification] = useState(false);
  const [showThemePicker, setThemePicker] = useState(false);

  const handleColorTheme = () => {
    setThemePicker(!showThemePicker);
  };

  const handleNotification = () => {
    setNotification(!showNotification);
  };

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
    <div className='flex justify-between items-center p-2 bg-primary/70 dark:bg-darkbg1 border-b dark:border-gray-300 shadow-md border-darkbg2 bg-opacity-70 backdrop-blur-sm rounded-md'>
      <div className='flex items-center'>
        <Breadcrumb />
      </div>
      <div className='mr-3 flex flex-row gap-x-3 items-center'>
        <img src={colorpicker} alt="color picker" width={25} height={25} onClick={handleColorTheme} />
        <ThemeToggle />
        <IoMdNotifications className='size-6 hover:shadow dark:text-white' onClick={handleNotification} />
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

        {showNotification && (
          <div className='absolute top-14 right-20 bg-white rounded-sm p-4 h-96 w-72 z-50'>
            <h4 className='bg-slate-500 p-3 rounded'>Notification from Harish</h4>
          </div>
        )}

        {showThemePicker && (
          <div className='absolute top-14 right-20 bg-white rounded-sm p-4 h-96 w-72 z-50 shadow-2xl'>
            <ThemeSwitcher />
          </div>
        )}

        {/* <div className="flex space-x-2">
          <button
            className={`p-2 ${layout === 'default' ? 'bg-blue-500' : 'bg-gray-400'} text-white rounded`}
            onClick={() => setLayout('default')}
          >
            Default Layout
          </button>
          <button
            className={`p-2 ${layout === 'alternate' ? 'bg-blue-500' : 'bg-gray-400'} text-white rounded`}
            onClick={() => setLayout('alternate')}
          >
            Alternate Layout
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
