import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import BranchesDonutChart from './BranchesDonutChart';

function CitiesDonutChart({ selectedState }) {
  const [citiesData, setCitiesData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedState) {
          console.error('Selected state is undefined');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/cities/${selectedState}`);
        const data = await response.json();
        setCitiesData(data);
        console.log('Cities data received in CitiesDonutChart:', data);
      } catch (error) {
        console.error('Error fetching cities data:', error.message);
      }
    };

    fetchData();
  }, [selectedState]);

  console.log('Selected State:', selectedState);
  console.log('Cities Data:', citiesData);

  const donutChartData = citiesData.map((city, index) => [city, index + 1, `C${index + 1}`]);

  console.log('Donut Chart Data:', donutChartData);

  const donutOptions = {
    pieHole: 0.7,
    pieSliceText: 'label',
    tooltip: { isHtml: true },
    legend: { position: 'right', labels: citiesData.map((city, index) => ({ text: `C${index + 1}` })) },
  };
  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="container mt-5">
      <h6 style={{ textAlign: 'center' }}>Leads by city {selectedState}</h6>
      <Chart
        className="custom-chart"
        width={'100%'}
        height={'100%'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[['City', 'Lead Points', { role: 'style' }], ...donutChartData]}
        options={donutOptions}
        rootProps={{ 'data-testid': '1' }}
        chartEvents={[
          {
            eventName: 'select',
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length > 0) {
                const row = selection[0].row;
                if (row >= 0 && row < donutChartData.length) {
                  const city = donutChartData[row][0];
                  console.log('Selected City:>>>>>>', city);
                  handleCityClick(city);
                }
              }
            },
          },
        ]}
      />
      {selectedCity && <BranchesDonutChart selectedState={selectedState} selectedCity={selectedCity} />}
    </div>
  );
}

export default CitiesDonutChart;