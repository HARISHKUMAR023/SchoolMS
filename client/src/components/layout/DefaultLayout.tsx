import React from 'react';
import Footer from '../comman/Footer/Fotter';
import { Outlet } from 'react-router-dom';
import Side from '../../side/side';
import Navbar from './Navbar/Navbar';
type DefaultLayoutProps = {
  userRole: string;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ userRole }) => (
    
  <div className='h-screen flex flex-col'>
    <h1 className='bg-red-600 text-center text-white'>
      Developed by Harish and Sivadharshan Technology PVT Ltd...
    </h1>
    <div className="flex flex-1 bg-primary dark:bg-darkbg2 overflow-hidden shadow">
      <div className='w-auto p-2'>
        <Side role={userRole} />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className='my-2 mr-2 rounded-md sticky top-0'>
          <Navbar />
        </div>
        <div className="bg-primary/70 dark:bg-[#333333] p-3 mr-2 mb-2 rounded-md flex-1 overflow-y-auto main-bg">
          <Outlet />
        </div>
      </div>
    </div>
    <div className='w-full border-t-[0.1px] dark:border-gray-100 border-gray-500'>
      <Footer />
    </div>
  </div>
);

export default DefaultLayout;
