import { useState, useEffect } from 'react';
import { HiSun, HiMoon } from "react-icons/hi";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <div className="flex items-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={darkMode}
          onChange={toggleTheme}
        />
        <div className="relative w-11 h-[19px] bg-gray-200 rounded-full peer-checked:bg-gray-700 dark:bg-gray-700 peer dark:peer-checked:bg-gray-200">
          <div id='topdiv'
            className={`z-50 w-5 h-5 absolute -mt-[1.2px] bg-white rounded-full shadow-md transform transition-transform ${
              darkMode ? 'translate-x-6 bg-gray-800' : 'translate-x-0 bg-gray-700'
            }`}
          ></div>
          <div id='bgdiv' className='z-30 mt-[1.5px] pr-0.5 flex justify-between ml-[2px]'>
            <HiSun className='text-yellow-500'/> 
            <HiMoon  className=''/>
          </div>
        </div>
        {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </span> */}
      </label>
    </div>
  );
};

export default ThemeToggle;
