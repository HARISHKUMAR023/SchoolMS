
import proimg from '../../../assets/react.svg';
import { IoMdNotifications } from "react-icons/io";
const Navbar = () => {
  return (
   <nav className='flex justify-end p-2'>
    <div className='mr-3 flex flex-row  items-center'>
    <IoMdNotifications className='w-6 h-6' />
        <h2 className='mx-3'>Harish</h2>
        <img src={proimg} alt="Profile imaga" className='w-8 h-8 rounded-full p-0.5 bg-yellow-600 ' />
    </div>
   </nav>
  )
}

export default Navbar