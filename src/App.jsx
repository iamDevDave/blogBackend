import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import AllBlogs from './pages/AllBlogs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/allBlogs" element={<AllBlogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
