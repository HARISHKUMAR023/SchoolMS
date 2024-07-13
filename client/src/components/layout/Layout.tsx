
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
    <div className="flex bg-blue-300 dark:bg-darkbg2 flex-row overflow-hidden h-screen">
      <div className='w-auto p-2'>
        <Side role={userRole} />
      </div>
      <div className="flex flex-col w-full overflow-y-auto">
        
        <div className='my-2 mr-2 rounded-md  sticky top-0 '>
          <Navbar />
        </div>
        
        <div className="  bg-primary/70 dark:bg-[#333333] p-3 pb-6 mr-2 rounded-md">
          <Outlet />
        </div>
        <Footer />
      </div>
    
    </div>
  );
};

export default Layout;
