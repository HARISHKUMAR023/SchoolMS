import { useState } from 'react';
import proimg from '../../../assets/avatar.jpg';
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../comman/Buttons/ThemeToggle';
import { useDispatch } from 'react-redux';
import { logout } from '../../../slices/authSlice';
const Navbar = () => {
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
    <div className='flex justify-end p-2 bg-white/90 dark:bg-darkbg2/10 backdrop:blur-md border-b border-gray-300'>
      <div className='mr-3 flex flex-row gap-x-3 items-center'>
        
        <ThemeToggle />
        <IoMdNotifications className='size-6 hover:shadow' />
        <h2 className=''>Harish</h2>
        <img
          src={proimg}
          alt="Profile image"
          className='size-10 rounded-full p-0.5 hover:shadow-yellow-600 hover:shadow-md cursor-pointer'
          onClick={toggleFloatDiv}
        />
        {showFloatDiv && (
          <div id='floatdiv' className=' absolute size-16 mt-28 ml-[125px]'>
            {/* Content of floatdiv */}
            <button onClick={handleLogout} className="bg-white py-2 px-3 rounded-md shadow-md shadow-yellow-600 text-black font-medium">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
