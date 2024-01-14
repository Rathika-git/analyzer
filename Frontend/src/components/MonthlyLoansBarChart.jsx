import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';


const MonthlyLoansBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/monthly-loans');
        const apiData = await response.json();
        setData(apiData);

        console.log('Data received in MonthlyLoansBarChart:', apiData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const formatPercent = (tickItem) => {
    return `${(tickItem * 100).toFixed(0)}%`;
  };

  return (
    <div>
      <h6>Monthly Loans (In Lakhs)</h6>
      <BarChart width={550} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Month" /> {/* Check that "Month" matches the key in your data */}
        <YAxis tickFormatter={formatPercent} />
        <Tooltip formatter={(value) => `${(value * 100).toFixed(0)}%`} />
        <Legend />
        <Bar dataKey="Loans" fill="#181547">
          <Label content={({ value }) => `${(value * 100).toFixed(0)}%`} position="top" />
        </Bar>
      </BarChart>
    </div>
  );
};

export default MonthlyLoansBarChart;