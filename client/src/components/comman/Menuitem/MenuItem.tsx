// src/components/MenuItem.tsx
import React, { useState, ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface SubMenuItem {
  name: string;
  link: string;
  icone?: ReactElement; // If `icone` is a React component
  // icone?: string; // Use this line instead if `icone` is a string
}

interface MenuItemProps {
  title: string;
  subMenuItems: SubMenuItem[];
  icone?: ReactElement; // If `icone` is a React component
}

const MenuItem: React.FC<MenuItemProps> = ({ title, subMenuItems, icone }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
       
      <button onClick={toggleSubMenu} className="font-semibold text-left py-4  px-4 rounded flex  items-center font-4xl text-gray-300">
        {icone} <span className="ml-2">{title}</span>
      </button>
      {isOpen && (
        <ul className="pl-8">
          {subMenuItems.map((item, index) => (
            <li key={index} className="py-1">
              <Link to={item.link} className="text-gray-400 flex items-center p-1 font-medium focus:text-red-500 hover:text-red-500">
                <span>{item.icone}</span> <span className='ml-2'>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
