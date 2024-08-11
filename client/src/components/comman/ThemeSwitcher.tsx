import React, { useState } from 'react';
import '../../App.css';
import { useLayout } from '../../context/LayoutContext';
const themes = [
  { name: 'Light', color: 'bg-red-500', className: 'theme-light' },
  { name: 'Dark', color: 'bg-blue-950', className: 'theme-dark' },
  { name: 'Purple', color: 'bg-green-500', className: 'theme-purple' }
];

const ThemeSwitcher: React.FC = () => {
  const { setLayout } = useLayout();
  const [theme, setTheme] = useState<string>('theme-light');

  const changeTheme = (newTheme: string): void => {
    document.documentElement.className = newTheme;
    setTheme(newTheme);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
      <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">Current theme: {theme}</p>
      <div className="flex space-x-4">
        {themes.map((themeOption) => (
          <button
            key={themeOption.className}
            className={`${themeOption.color} text-white w-16 h-16 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none`}
            onClick={() => changeTheme(themeOption.className)}
            title={themeOption.name}
          >
            <span className="sr-only">{themeOption.name} Theme</span>
          </button>
        ))}
      </div>
      <button onClick={() => setLayout('default')}>Default Layout</button>
      <button onClick={() => setLayout('alternate')}>Alternate Layout</button>
    </div>
  );
};

export default ThemeSwitcher;
