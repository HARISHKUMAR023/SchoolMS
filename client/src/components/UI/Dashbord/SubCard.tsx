// src/components/SubCard.tsx
import { IconType } from 'react-icons';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
interface SubCardProps {
  icon: ReactElement | IconType;
  text: string;
  count: number;
}

const SubCard: React.FC<SubCardProps> = ({ icon, text, count }) => {
  const IconComponent = icon as ReactElement | IconType;
  return (
    <div className="bg-white shadow rounded-lg p-4  px-auto flex flex-col  items-center m-2 mx-6">
      {typeof IconComponent === 'function' ? (
        <IconComponent className="text-blue-500 w-10 h-10" />
      ) : (
        IconComponent
      )}
      <div className="ml-4">
        <Link to="#" className="text-lg font-semibold">{text}</Link>
        <div className="text-2xl text-center">{count}</div>
      </div>
    </div>
  );
};

export default SubCard;
