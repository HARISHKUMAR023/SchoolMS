// src/components/Card.tsx
import React, { ReactElement } from 'react';


interface CardProps {
  icon: ReactElement;
  count: number;
  text: string;
  addicon: ReactElement;
  add: string;
}

const DashboardCard: React.FC<CardProps> = ({ icon, count, text, addicon, add }) => {
  return (
    <div className='flex justify-between w-full'>
   <div className="dark:bg-[#262626] dark:text-white hover:shadow-md dark:hover:bg-white/5
                    flex items-center p-4 bg-white/50 hover:bg-white shadow rounded-lg cursor-pointer w-full">
      <div className="text-red-500 mr-4">
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold">{count}</div>
        <div className="text-gray-600 dark:text-gray-300">{text}</div>
      </div>

      <div className='flex h-full ml-auto'>
        <hr className='  border-l-[0.5px] border-gray-400 h-full mr-2' />
        <div className="h-full w-16 p-1 rounded-md flex flex-col justify-center items-center text-center hover:bg-blue-100 dark:hover:bg-white/10">
          <p className='dark:text-gray-300 text-2xl font-bold text-btnprimary m-1'>{addicon}</p>
          <p className='text-gray-600 dark:text-gray-300 text-xs'>{add}</p>
        </div>
      </div>

          </div>
    </div>
  );
};

export default DashboardCard;
