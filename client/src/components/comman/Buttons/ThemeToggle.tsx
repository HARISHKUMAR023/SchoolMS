import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  // Initialize the theme state based on localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Apply the theme class to the body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle the theme and save the preference in localStorage
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
        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-gray-700 dark:bg-gray-700 peer dark:peer-checked:bg-gray-200">
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              darkMode ? 'translate-x-5 bg-gray-800' : 'translate-x-0 bg-white'
            }`}
          ></div>
        </div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
