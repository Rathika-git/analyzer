import React, { useState } from 'react';
import StateSelection from './components/StateSelection';
import CitiesDonutChart from './components/CitiesDonutChart';
import MonthlyLoansBarChart from './components/MonthlyLoansBarChart';
import InterestRatesBarChart from './components/InterestRatesBarChart';
import LoansPerDayLineChart from './components/LoansPerDayLineChart';
import BranchesDonutChart from './components/BranchesDonutChart';

const App = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const states = ['TamilNadu', 'Karnataka', 'Kerala'];

  const handleStateClick = (state) => {
    
    setSelectedState(state);
    setSelectedCity(""); // Reset selectedCity when a new state is selected
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <h1>Analytics</h1>

      <StateSelection states={states} handleStateClick={handleStateClick} />
      <div >
        <div>
          {selectedState && (
            <CitiesDonutChart selectedState={selectedState} selectedCity={selectedCity}  handleCityClick={handleCityClick} />
          )}
        </div>
        <div>
          <MonthlyLoansBarChart />
          <InterestRatesBarChart />
        </div>
        <div >
          {selectedCity && (
            <>
              <BranchesDonutChart selectedState={selectedState} selectedCity={selectedCity} />
              <LoansPerDayLineChart selectedState={selectedState} selectedCity={selectedCity} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;