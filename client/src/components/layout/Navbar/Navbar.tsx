import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import proimg from '../../../assets/avatar.jpg';
import { IoMdNotifications } from "react-icons/io";
import ThemeToggle from '../../comman/Buttons/ThemeToggle';

const Navbar: React.FC = () => {
  const [showFloatDiv, setShowFloatDiv] = useState(false);
  const [pageName, setPageName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathToName: { [key: string]: string } = {
      '/dashboard/Dashboard': 'Dashboard',
      '/dashboard/add-student': 'Add Student',
      '/dashboard/add-employee': 'Add Employee',
      '/dashboard/student-details': 'Student Details',
      '/dashboard/employee-details': 'Employee Details',
      // Add more paths and names as needed
    };

    const currentPageName = pathToName[location.pathname] || 'Page';
    setPageName(currentPageName);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleFloatDiv = () => {
    setShowFloatDiv(!showFloatDiv);
  };

  return (
    <div className='flex justify-end p-2 bg-white/90 dark:bg-darkbg2/10 backdrop:blur-md border-b dark:border-gray-300 border-darkbg2'>
      <div className='mr-3 flex flex-row gap-x-3 items-center'>
        <p id="pagename">{pageName}</p>
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
