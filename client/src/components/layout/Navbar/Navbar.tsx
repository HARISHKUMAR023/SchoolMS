
import proimg from '../../../assets/avatar.jpg';
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../comman/Buttons/ThemeToggle';
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (

   <div className='flex justify-end p-2 bg-white dark:bg-darkbg2 border-b border-gray-300'>
    <div className='mr-3 flex flex-row gap-x-3 items-center'>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <IoMdNotifications className='size-6' />
      <h2 className=''>Harish</h2>
      <img src={proimg} alt="Profile imaga" 
          className='size-10 rounded-full p-0.5 hover:shadow-yellow-600 hover:shadow-md cursor-pointer' />
    </div>
   </div>
  )
}

export default Navbar