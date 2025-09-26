// components/common/StatusToggle.js
import React from 'react';

const StatusToggle = ({ status, onToggle }) => {
  const isActive = status === 'active';

  const handleToggle = () => {
    const newStatus = isActive ? 'inactive' : 'active';
    onToggle(newStatus);
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isActive ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        onClick={handleToggle}
        role="switch"
        aria-checked={isActive}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
            isActive ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      {/* <span className="ml-2 text-sm text-gray-900">
        {isActive ? 'Active' : 'Inactive'}
      </span> */}
    </div>
  );
};

export default StatusToggle;