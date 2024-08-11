import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSetting } from '../../slices/visibilitySlice';
import { RootState, AppDispatch } from '../../Store/index';
const ComponentsSettings: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const visibility = useSelector((state: RootState) => state.visibility);
  
    // Handler to toggle visibility
    const handleToggleVisibility = (component: string) => {
      const isVisible = !visibility[component];
      dispatch(updateSetting({ component, isVisible }));
    };
  
    return (
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Component Visibility Settings</h2>
        <ul className="space-y-2">
          {Object.keys(visibility).map((component) => (
            <li key={component} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
              <span className="text-gray-700">{component}</span>
              <button
                onClick={() => handleToggleVisibility(component)}
                className={`px-4 py-2 text-white rounded-lg ${
                  visibility[component] ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {visibility[component] ? 'Hide' : 'Show'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ComponentsSettings;