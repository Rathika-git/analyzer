import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';
import LoansPerDayLineChart from './LoansPerDayLineChart';

function BranchesDonutChart({ selectedState, selectedCity }) {
  const [branchesData, setBranchesData] = useState([]);
  const [donetBranchData , setDonetBranchData] = useState([])
  const [selectedCityForLine, setSelectedCityForLine] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      setDonetBranchData([])
      try {
        if (!selectedState || !selectedCity) {
          console.error('Selected state or city is undefined');
          return;
        }
        const response = await fetch(`http://localhost:5000/api/branches/${selectedCity}`);
        const data = await response.json();
        setBranchesData(data);
        console.log('Branches data received in BranchesDonutChart:', data);
      } catch (error) {
        console.error('Error fetching branches data:', error.message);
      }
    };

    fetchData();
  }, [selectedState, selectedCity]);
  console.log('Selected State and City:', selectedState, selectedCity);
  console.log('Branches Data:', branchesData);

  useEffect (()=>{
    setSelectedCityForLine(selectedCity)
  }, [selectedCity])
 
  useEffect(()=>{
 
    const donutChartData = branchesData.map((branch, index) => [branch['Branch Name'], index + 1,  branch['Branch ID']]);
    setDonetBranchData(donutChartData)
 
  }, [branchesData])

  console.log('Donut Chart Data for Branches:', donetBranchData);

  const donutOptions = {
    pieHole: 0.7,
    pieSliceText: 'label',
    tooltip: { isHtml: true },
    legend: { position: 'right', labels: branchesData && branchesData.map((_, index) => ({ text: `B${index + 1}` })) },
  };
  return (
    <div className="container mt-5"style={{ border: '1px solid black' , minHeight: '300px' }}>
      <h6 style={{ textAlign: 'center' }}>Leads by branches in {selectedCity}</h6>
        <Chart
          className="custom-chart"
          width={'100%'}
          height={'100%'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={[['City', 'Lead Points', { role: 'style' }], ...donetBranchData]}
          options={donutOptions}
          rootProps={{ 'data-testid': '1' }}
        />
        {
selectedCityForLine&&
    <LoansPerDayLineChart selectedCity={selectedCityForLine} selectedState={selectedState}/>
        }
    </div>
  );
}

export default BranchesDonutChart; 