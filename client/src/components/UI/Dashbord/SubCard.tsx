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
    <div className="dark:bg-darkbg1 hover:dark:bg-white/10 dark:text-white hover:shadow-md hover:bg-white
                    bg-white/50 shadow rounded-lg  px-auto flex flex-col items-center 
                     m-2 py-4 justify-center gap-y-3">
      {typeof IconComponent === 'function' ? (
        <IconComponent className="text-blue-500 w-10 h-10" />
      ) : (
        IconComponent
      )}
      <div className="">
        <Link to="#" className="text-lg font-semibold text-center">{text}</Link>
        <div className="text-2xl text-center">{count}</div>
      </div>
    </div>
  );
};

export default SubCard;
