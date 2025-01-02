import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar'; 
import AllBlogs from './pages/AllBlogs';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Set token from localStorage on page load

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken); // Store the token in localStorage
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Remove the token from localStorage on logout
  };

  return (
    <Router>
      <div>
        <NavBar onLogout={handleLogout} />
        <div className="container mt-5">
          <Routes>
            <Route path="/allBlogs" element={<AllBlogs token={token} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
