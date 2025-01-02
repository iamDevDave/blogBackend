import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import CreateModal from '../models/CreateModal'; // Import CreateModal component
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const navigate = useNavigate(); // Initialize useNavigate hook

  const openCreateModal = () => {
    setIsModalOpen(true); // Open the create modal when the button is clicked
  };

  const closeCreateModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <Navbar expand="lg" className="navbar position-sticky top-0">
        <Navbar.Brand href="/" className="text-white">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-white">Login</Nav.Link>
            <Nav.Link as={Link} to="/allBlogs" className="text-white">All Blogs</Nav.Link>
            <Button variant="primary" className="ml-2" onClick={openCreateModal}>
              Create
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Conditionally render CreateModal */}
      {isModalOpen && <CreateModal onClose={closeCreateModal} onCreate={(newBlogPost) => console.log(newBlogPost)} />}
    </>
  );
};

export default NavBar;
