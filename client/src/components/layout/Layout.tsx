import React from 'react';
import { useLayout } from '../../context/LayoutContext'; // Adjust the path as needed
import DefaultLayout from './DefaultLayout';
import AlternateLayout from './AlternateLayout';
import Offline from '../comman/Offline';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/types'; // Adjust the path as needed

const Layout: React.FC = () => {
  const { layout } = useLayout();
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const userRole = useSelector((state: RootState) => state.auth.user?.role) || 'guest'; // Retrieve userRole from the store

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <Offline />;
  }

  const renderLayout = () => {
    switch (layout) {
      case 'alternate':
        return <AlternateLayout userRole={userRole} />;
      case 'default':
      default:
        return <DefaultLayout userRole={userRole} />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {renderLayout()}
    </div>
  );
};

export default Layout;
