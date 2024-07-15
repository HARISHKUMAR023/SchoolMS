import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="breadcrumb">
      <ul className="flex space-x-2 ml-2 dark:text-white">
        <li>
          <Link to="/" className="dark:text-white hover:underline">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="dark:text-white text-lg font-bold">{value.replace(/-/g, ' ')}</span>
              ) : (
                <Link to={to} className="dark:text-white hover:underline">{value.replace(/-/g, ' ')}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
