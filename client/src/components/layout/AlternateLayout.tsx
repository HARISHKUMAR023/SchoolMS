import Navbar from './Navbar/Navbar';
import Footer from '../comman/Footer/Fotter';
import { Outlet } from 'react-router-dom';
import Side from '../../side/side';

const AlternateLayout = ({ userRole }: { userRole: string }) => (
  <div className='h-screen flex flex-col'>
    <div className="flex flex-1 bg-secondary dark:bg-darkbg1 overflow-hidden shadow">
      <div className='w-auto p-2'>
        <Side role={userRole} />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className='my-2 mr-2 rounded-md sticky top-0'>
          <Navbar />
        </div>
        <div className="bg-secondary/70 dark:bg-[#444444] p-3 mr-2 mb-2 rounded-md flex-1 overflow-y-auto main-bg">
          <Outlet />
        </div>
      </div>
    </div>
    <div className='w-full border-t-[0.1px] dark:border-gray-100 border-gray-500'>
      <Footer />
    </div>
  </div>
);

export default AlternateLayout;
