import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import CreateModal from "../models/CreateModal"; // Import CreateModal component

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
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
            <Link to="/login" className="hover:text-gray-400">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-400">
              Signup
            </Link>
            <Link to="/allBlogs" className="hover:text-gray-400">
              All Blogs
            </Link>
            <Button onClick={openCreateModal} className="bg-blue-500 hover:bg-blue-600">
              Create
            </Button>
          </div>
        </div>
      </nav>

      {/* Conditionally render CreateModal */}
      {isModalOpen && <CreateModal onClose={closeCreateModal} onCreate={(newBlogPost) => console.log(newBlogPost)} />}
    </>
  );
};

export default NavBar;
