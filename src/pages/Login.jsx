import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice'; // Redux slice
import { Button } from '../components/ui/button'; // ShadCN UI Button Component
import { Input } from '../components/ui/input'; // ShadCN UI Input Component
import Alert from '../components/ui/Alert'; // Correct import for Alert Component
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Dispatch the login action with the token
        dispatch(login(data.token));
        navigate('/'); // Redirect to the dashboard or homepage
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      
      {/* Error message */}
      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <Button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
