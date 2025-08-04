import React, { useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#00C49F', '#FF4444'];

const HabitChart = ({ habits }) => {
  const [chartType, setChartType] = useState('pie');

  const data = [
    {
      name: 'Productive',
      value: habits.filter(h => h.type === 'productive').length
    },
    {
      name: 'Useless',
      value: habits.filter(h => h.type === 'useless').length
    }
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return (
          <PieChart>
            <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={80} label>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>Habit Summary for Selected Date</h3>

      <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
        <option value="pie">Pie Chart</option>
        <option value="bar">Bar Chart</option>
      </select>

      <ResponsiveContainer>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default HabitChart;
