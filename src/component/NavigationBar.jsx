// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import Modal from './Model'; // Import the Modal component
// import '../App.css';
// import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
// import Badge from '@mui/material/Badge'; // Material UI Badge for displaying cart count

// const Navbar = ({ cartCount }) => {  // Pass cartCount from parent component
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
//   const navigate = useNavigate();  // Initialize navigate function for programmatic navigation

//   const handleAvatarClick = (e) => {
//     const avatar = e.target.getBoundingClientRect(); // Get avatar position
//     setModalPosition({ 
//         top: avatar.bottom + window.scrollY + 10, // Position 10 pixels below the avatar
//         left: avatar.left + window.scrollX  // Align to the left of avatar
//     });
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleShopping = () => {
//     navigate('/ShoppingCart');
//   };

//   return (
//     <>
//       <nav className="navbar">
//         <div className="navbar-left">
//           <img src="/settings.png" alt="logo" className="logo" />
//           <span className="logo-text">LOGO</span>
//         </div>
//         <div className="navbar-center">
//           <ul className="nav-links">
//             <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink></li>
//             <li><NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>Products</NavLink></li>
//             <li><NavLink to="/pricing" className={({ isActive }) => (isActive ? "active" : "")}>Pricing</NavLink></li>
//             <li><NavLink to='/User' className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink></li>
//             <li><NavLink to='/ProductListing' className={({ isActive }) => (isActive ? "active" : "")}>ProductListing</NavLink></li>
//           </ul>
//         </div>
//         <div className="navbar-right">
//           <img
//             src="https://randomuser.me/api/portraits/men/1.jpg"
//             alt="user avatar"
//             className="avatar"
//             aria-label="User Avatar"
//             onClick={handleAvatarClick}
//           />
//           <Badge badgeContent={cartCount} color="secondary" overlap="rectangular">
//             <ShoppingCartTwoToneIcon 
//               style={{ height: 40, width: 40, cursor: 'pointer' }}
//               onClick={handleShopping}
//             />
//           </Badge>
//         </div>
//       </nav>
      
//       {isModalOpen && (
//         <div 
//           className="modal-overlay"
//           style={{
//             top: `${modalPosition.top}px`,
//             left: `${modalPosition.left}px`,
//             position: 'absolute',
//           }}
//         >
//           <div className="modal-content">
//             <h2>Logout</h2>
//             <p>Are you sure you want to logout?</p>
//             <button onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { NavLink } from 'react-router-dom'; // Import NavLink

const pages = [
  { name: 'Home', link: '/' },
  { name: 'Products', link: '/products' },
  { name: 'Pricing', link: '/pricing' },
  { name: 'User', link: '/user' },
  { name: 'ProductListing', link: '/productlisting' }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink to={page.link} style={{ textDecoration: 'none', color: 'inherit'}}>
                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink 
                key={page.name}
                to={page.link}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              </NavLink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
