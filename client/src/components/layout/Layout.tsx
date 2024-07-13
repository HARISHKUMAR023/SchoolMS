
import { useSelector } from 'react-redux';
// import Menu from './Menu/Menu';
import Navbar from './Navbar/Navbar';
import Footer from '../comman/Footer/Fotter';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../Store/types';
import Side from '../../side/side'

const Layout = () => {
  const userRole = useSelector((state: RootState) => state.auth.user?.role) || 'guest';
  return (
    <div className="flex bg-[#343944] flex-row overflow-hidden h-screen">
      <div className='w-auto p-2'>
        <Side role={userRole} />
      </div>
      <div className="flex flex-col w-full ">
        <Navbar />

        <div className=" overflow-y-auto bg-[#E5EAEF] dark:bg-[#333333] p-3 pb-6 min-h-[90%] max-h-[90%]">

          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
