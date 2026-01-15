import React from 'react';
import { useLocation } from 'react-router-dom';

const Error = () => {
  const location = useLocation();
  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold">Error!</h3>
      <h1 className="text-8xl font-extrabold my-2 text-[#3bbb9c]">404</h1>
      <h4 className="text-lg">Page Not Found</h4>
      <h4 className="text-sm text-gray-400">{location.pathname}</h4>
    </div>
  );
};

export default Error;
