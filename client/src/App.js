import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, AuthContext } from './context/AuthContext';
import './style.css';


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/" element={<RegisterWrapper />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const LoginWrapper = () => {
  const { setUser } = useContext(AuthContext);
  return <Login setUser={setUser} />;
};

const RegisterWrapper = () => {
  const { setUser } = useContext(AuthContext);
  return <Register setUser={setUser} />;
};

export default App;
