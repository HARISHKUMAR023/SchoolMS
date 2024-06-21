// src/components/Card.tsx
import React, { ReactElement } from 'react';

interface CardProps {
  icon: ReactElement;
  count: number;
  text: string;
}

const DashboardCard: React.FC<CardProps> = ({ icon, count, text }) => {
  return (
    <div className="flex items-center  p-4 bg-white shadow rounded-lg">
      <div className="text-red-500 mr-4">
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold">{count}</div>
        <div className="text-gray-600">{text}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
