
import proimg from '../../../assets/react.svg';
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
   <div className='flex justify-end p-2 bg-white'>
    <div className='mr-3 flex flex-row  items-center'>
    <button onClick={handleLogout} className="logout-button mr-3">
      Logout
    </button>
    <ThemeToggle />
    <IoMdNotifications className='w-6 h-6' />
        <h2 className='mx-3'>Harish</h2>
        <img src={proimg} alt="Profile imaga" className='w-8 h-8 rounded-full p-0.5 bg-yellow-600 ' />
    </div>
   </div>
  )
}

export default Navbar