import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SubMenuItem {
  name: string;
  link: string;
  icone?: React.ReactElement;
}

interface MenuItemProps {
  title: string;
  subMenuItems: SubMenuItem[];
  icone?: React.ReactElement;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, subMenuItems, icone }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <button
        onClick={toggleSubMenu}
        className="font-semibold text-left py-4 px-4 rounded flex items-center text-gray-300"
      >
        {icone} <span className="ml-2">{title}</span>
      </button>
      {isOpen && (
        <ul className="pl-8">
          {subMenuItems.map((item, index) => (
            <li key={index} className="py-1">
              <MenuItemLink
                to={item.link}
                icone={item.icone}
                name={item.name}
              />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

interface MenuItemLinkProps {
  to: string;
  icone?: React.ReactElement;
  name: string;
}

const MenuItemLink: React.FC<MenuItemLinkProps> = ({ to, icone, name }) => {
  return (
    <Link
      to={to}
      className="text-gray-400 flex items-center p-1 font-medium hover:text-red-500"
    >
      {icone && <span>{icone}</span>} <span className="ml-2">{name}</span>
    </Link>
  );
};

export default MenuItem;
