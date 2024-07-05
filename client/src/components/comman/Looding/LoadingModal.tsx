import React from 'react';
import { Hourglass} from 'react-loader-spinner';

interface LoadingModalProps {
  show: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg flex items-center">
        <Hourglass height="50" width="50"  colors={['#A91D3A', '#C73659']} ariaLabel="loading" />
        <span className="ml-2 text-gray-700 text-bold">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingModal;
