import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import LoadingSpinner from './LoadingSpinner';

function LoansPerDayLineChart({ selectedState, selectedCity }) {
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({})
  const [options, setOptions] = useState({})
  const fetchChartData = async () => {
    try {


      // Fetch data based on the selected city
      const response = await fetch(`http://localhost:5000/api/loansperday/${selectedCity}`);
      const responseData = await response.json();

      if (response.ok) {
        console.log('Loans per day data received:', responseData);
        setData(responseData);
      } else {
        setError(`Error: ${responseData.message}`);
      }
      console.log("fetch request");
    } catch (error) {
      setError(`Error fetching loans per day data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchChartData();
  }, [selectedCity]);

  // useEffect(()=>{

  //   const chartData = {
  //     labels:data && Object.keys(data[0]).slice(1),
  //     datasets: data && data.map((cityData) => ({
  //       name: `City ${cityData['City ID']}`,
  //       data: Object.values(cityData)
  //         .slice(1)
  //         .map((value) => parseFloat(value)),
  //     })),
  //   }

  //   setChartData(chartData)
  //   const options = {
  //     xaxis: {
  //       categories: chartData.labels,
  //     },
  //   };
  //   setOptions(options)
  // },[data])
  useEffect(() => {
    // Fetch cities data from your API or source
    const fetchCities = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cities/${selectedState}`); // Replace with your API endpoint
        const data = await response.json();
        console.log("???", data);
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities data:', error.message);
      }
    };

    fetchCities();
  }, []);
const  handleSelect= (e)=>{
console.log(e.target.value, ">>>>>>>>>>>>>>>");
}

  return (
    <div className="container mt-5">
      { cities && <div>
        <label htmlFor="cityDropdown">Select a City:</label>
        <select onChange={(e)=>{
          handleSelect(e)
        }} id="cityDropdown">
          {cities.map((city) => (
            <option key={city} value={`C${index + 1}`}>
              {city}
            </option>
          ))}
        </select>
      </div>}
      {/* <Chart options={options} series={chartData.datasets} type="line" height={350} /> */}
    </div>
  );
}

export default LoansPerDayLineChart;