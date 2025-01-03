import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import CreateModal from '../models/CreateModal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl font-bold">
            MyApp
          </a>
          <div className="flex items-center space-x-4">
            <Link to="/allBlogs" className="hover:text-gray-400">
              Home
            </Link>
            {!token ? (
              <>
                <Link to="/login" className="hover:text-gray-400">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-gray-400">
                  Signup
                </Link>
              </>
            ) : (
              <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                Logout
              </Button>
            )}
            <Link to="/allBlogs" className="hover:text-gray-400">
              All Blogs
            </Link>
            <Button onClick={openCreateModal} className="bg-blue-500 hover:bg-blue-600">
              Create
            </Button>
          </div>
        </div>
      </nav>

      {isModalOpen && <CreateModal onClose={closeCreateModal} onCreate={(newBlogPost) => console.log(newBlogPost)} />}
    </>
  );
};

export default NavBar;
