// import React from 'react';
import { FaExclamationCircle, FaCog, FaRocket, FaShieldAlt } from 'react-icons/fa';

const notifications = [
  {
    id: 1,
    heading: 'Update Available',
    description: 'A new update is available for your application. Please update to the latest version.',
    icon: <FaCog className="text-blue-500 size-7" />,
  },
  {
    id: 2,
    heading: 'System Maintenance',
    description: 'The system will undergo maintenance from 2 AM to 4 AM. Some features may be unavailable during this time.',
    icon: <FaExclamationCircle className="text-yellow-500 size-7" />,
  },
  {
    id: 3,
    heading: 'New Feature Released',
    description: 'Check out the new feature added to enhance your user experience. Explore now!',
    icon: <FaRocket className="text-green-500 size-7" />,
  },
  {
    id: 4,
    heading: 'Security Alert',
    description: 'We detected a login attempt from an unrecognized device. If this was not you, please change your password immediately.',
    icon: <FaShieldAlt className="text-red-500 size-7" />,
  },
];

const NotificationCard = () => {
  return (
    <div className="mt-4">
      {notifications.map((notification) => (
        <div key={notification.id} 
             className="flex items-start pb-1 cursor-pointer pt-2 hover:bg-white/50 hover:shadow-md border-b border-gray-400">
          <div className='flex items-center mx-1'>
            <div className="mr-3 ">{notification.icon}</div>
            <div>
                <h3 className="text-blue-500 font-semibold text-md">{notification.heading}</h3>
                <p className="text-black dark:text-white text-sm">{notification.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCard;
