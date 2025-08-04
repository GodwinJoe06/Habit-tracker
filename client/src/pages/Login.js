import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid login');
    }
  };

  return (
      <form className="container" onSubmit={handleLogin}>
        <div className="title">Welcome,<br /><span>login to continue</span></div>
        <input name="email" placeholder="Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        <input name="password" placeholder="Password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="button-confirm">Let’s go →</button>
      </form>
  );
};


export default Login;
