import React from 'react';

const StateSelection = ({ states, handleStateClick }) => {
  return (
    <div>
      {/* Buttons for each state */}
      {states.map(state => (
        <button key={state} onClick={() => handleStateClick(state)}>{state}</button>
      ))}
    </div>
  );
};

export default StateSelection;

