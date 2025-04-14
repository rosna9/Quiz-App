// src/Quit.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Quit = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-200 to-pink-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-4">
          Don’t Give Up!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Every expert was once a beginner. 💪 You’ve got this — give it another shot!
        </p>
        <Link to="/">
          <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-md transition duration-200">
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Quit;

