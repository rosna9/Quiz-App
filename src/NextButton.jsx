import React from 'react';

const NextButton = ({ onClick, isEnabled }) => {
  return (
    <button
      className={`${
        isEnabled ? 'bg-blue-500' : 'bg-gray-400 cursor-not-allowed'
      } text-white font-semibold py-2 px-4 rounded-lg mt-4`}
      onClick={isEnabled ? onClick : null}
      disabled={!isEnabled}
    >
      Next
    </button>
  );
};

export default NextButton;
