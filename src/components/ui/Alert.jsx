import React from 'react';

const Alert = ({ message }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md">
      <strong className="font-medium">Error:</strong> {message}
    </div>
  );
};

// Make sure you are exporting it as the default export
export default Alert;
