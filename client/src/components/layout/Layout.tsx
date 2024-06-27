
import { useSelector } from 'react-redux';
import Menu from './Menu/Menu';
import Navbar from './Navbar/Navbar';
import Footer from '../comman/Footer/Fotter';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../Store/types';

const Layout = () => {
  const userRole = useSelector((state: RootState) => state.auth.user?.role) || 'guest';
  return (
    <div className="flex bg-[#343944]  flex-row overflow-hidden h-screen">
      <Menu role={userRole} />
      <div className="flex flex-col w-full dark:bg-[#1e1e1e] dark:text-white">
        <Navbar />
        <div className="flex-grow overflow-y-auto bg-[#E5EAEF] dark:bg-[#333333]  dark:text-white py-2">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
