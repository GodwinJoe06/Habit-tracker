import React, { useState } from 'react';
import axios from '../services/api';

const Register = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        console.log('Registering user:', { username, email, password });
      const { data } = await axios.post('/auth/register', { username, email, password });
      localStorage.setItem('token', data.token);
      setUser(data); // Optional
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form className="container" onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" required onChange={e => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
