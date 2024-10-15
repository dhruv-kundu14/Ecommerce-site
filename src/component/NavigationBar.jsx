import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Modal from './Model'; // Import the Modal component
import '../App.css';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Badge from '@mui/material/Badge'; // Material UI Badge for displaying cart count
// import ShoppingCart from './ShoppingCart';

const Navbar = ({ cartCount }) => {  // Pass cartCount from parent component
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();  // Initialize navigate function for programmatic navigation

  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShopping = () => {
    // Redirect to the shopping cart page
    navigate('/ShoppingCart');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/settings.png" alt="logo" className="logo" />
          <span className="logo-text">LOGO</span>
        </div>
        <div className="navbar-center">
          <ul className="nav-links">
            <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
            <li><NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>Products</NavLink></li>
            <li><NavLink to="/pricing" className={({ isActive }) => (isActive ? "active" : "")}>Pricing</NavLink></li>
            {/* <li><NavLink to='/Admin' className={({ isActive }) => (isActive ? "active" : "")}>Admin Login</NavLink></li> */}
            <li><NavLink to='/User' className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink></li>
            <li><NavLink to='/ProductListing' className={({ isActive }) => (isActive ? "active" : "")}>ProductListing</NavLink></li>
          </ul>
        </div>
        <div className="navbar-right">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="user avatar"
            className="avatar"
            aria-label="User Avatar"
            onClick={handleAvatarClick} // Open modal on click
          />

          {/* Display the ShoppingCart icon with a badge showing the cart count */}
          <Badge badgeContent={cartCount} color="secondary" overlap="rectangular">
            <ShoppingCartTwoToneIcon 
              style={{ height: 40, width: 40, cursor: 'pointer' }}
              onClick={handleShopping}  // Use the handleShopping function to navigate
            />
          </Badge>
        </div>
      </nav>
      
      <Modal isOpen={isModalOpen} onClose={closeModal} /> {/* Render the modal */}
    </>
  );
};

export default Navbar;
