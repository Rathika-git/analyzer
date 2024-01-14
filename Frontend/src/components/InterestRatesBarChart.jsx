import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from "recharts";

function InterestRatesBarChart() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/interest-rates");
        const data = await response.json();
        setApiData(data);
        console.log('Data received from API in CusBarChart:', data);
      } catch (error) {
        console.error('Error fetching data from API:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const formatPercent = (tickItem) => {
    return `${(tickItem * 100).toFixed(0)}%`;
  };

  return (
    <div>
      <h6>Existing Lenders Interest Rate</h6>
      <BarChart width={550} height={300} data={apiData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Lender ID" />
        <YAxis tickFormatter={formatPercent} />
        <Tooltip formatter={(value) => `${(value * 100).toFixed(0)}%`} />
        <Legend />
        <Bar dataKey="Interest Rate" fill="#181547">
          <Label content={({ value }) => `${(value * 100).toFixed(0)}%`} position="top" />
        </Bar>
      </BarChart>
    </div>
  );
}

export default InterestRatesBarChart;