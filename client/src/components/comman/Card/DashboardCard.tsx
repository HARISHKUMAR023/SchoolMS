// src/components/Card.tsx
import React, { ReactElement } from 'react';

interface CardProps {
  icon: ReactElement;
  count: number;
  text: string;
}

const DashboardCard: React.FC<CardProps> = ({ icon, count, text }) => {
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
    </div>
    </div>
  );
};

export default DashboardCard;
