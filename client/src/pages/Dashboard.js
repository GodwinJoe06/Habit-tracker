import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';
import HabitChart from '../components/HabitChart';


const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });

  const fetchHabits = async (date) => {
    try {
      const { data } = await axios.get(`/habits/filter?date=${date}`);
      console.log('Fetched habits:', data);
      setHabits(data);
    } catch (err) {
      alert('Failed to load habits');
      console.error('Error fetching habits:', err);
    }
  };

  useEffect(() => {
    fetchHabits(selectedDate);
  }, [selectedDate]);

  return (
    <div className="container">
      <h2>Habit Tracker</h2>    
      <HabitForm onAdd={() => fetchHabits(selectedDate)} />
      
      <label htmlFor="date">Select Date: </label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <HabitList habits={habits} />
      <HabitChart habits={habits} />

    </div>
  );
};

export default Dashboard;
