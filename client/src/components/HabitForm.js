import React, { useState } from 'react';
import axios from '../services/api';

const HabitForm = ({ onAdd }) => {
  const [habitName, setHabitName] = useState('');
  const [type, setType] = useState('productive');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!habitName) return;

    try {
      const { data } = await axios.post('/habits/add', { habitName, type });
      onAdd(data); 
      setHabitName('');
    } catch (err) {
      alert('Error adding habit');
      console.error('Error adding habit:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter habit"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="productive">Productive</option>
        <option value="useless">Useless</option>
      </select>
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
