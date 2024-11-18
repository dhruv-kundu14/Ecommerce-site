import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CartDetail from "./CartDetail"; // Your cart sidebar component
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../server/AuthContext";

const pages = [
  { name: "Home", link: "/" },
  { name: "Product List", link: "/products" },
  { name: "Pricing", link: "/pricing" },
  { name: "Products", link: "/ProductListing" },
];
const guestPages = [{ name: "Home", link: "/" }];
const settingsLoggedIn = [
  { name: "Profile", link: "/UserProfile" },
  { name: "Account", link: "/Account" },
  "Logout",
];
const settingsLoggedOut = ["Login"];

function ResponsiveAppBar({ cartCount = 0, cartItems = [] }) {
  const { isAuthenticated, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isCartSidebarOpen, setCartSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleUserMenuClick = (setting) => {
    if (setting === "Logout") {
      logout();
      navigate("/");
    } else if (setting === "Login") {
      navigate("/user");
    } else {
      navigate(setting.link || "/");
    }
    handleCloseUserMenu();
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <img
              src="/icons/shopping-bag.png"
              alt="Shopping Bag"
              style={{ width: 40, marginRight: 10, cursor: "pointer" }}
            />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {(isAuthenticated ? pages : guestPages).map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <NavLink
                      to={page.link}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography>{page.name}</Typography>
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Pages */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {(isAuthenticated ? pages : guestPages).map((page) => (
                <NavLink
                  key={page.name}
                  to={page.link}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  <Button color="inherit">{page.name}</Button>
                </NavLink>
              ))}
            </Box>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={
                    isAuthenticated
                      ? handleOpenUserMenu
                      : () => navigate("/user")
                  }
                  sx={{ p: 0 }}
                >
                  {isAuthenticated ? (
                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                  ) : (
                    <img
                      src="/icons/login.png"
                      alt="Login Icon"
                      style={{ width: 40 }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {(isAuthenticated
                  ? settingsLoggedIn
                  : settingsLoggedOut
                ).map((setting) => (
                  <MenuItem
                    key={setting.name || setting}
                    onClick={() => handleUserMenuClick(setting)}
                  >
                    <Typography>{setting.name || setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Cart Icon */}
            <IconButton
              onClick={() => setCartSidebarOpen(true)}
              style={{ position: "relative", marginLeft: "10px" }}
            >
              <ShoppingBagIcon style={{ color: "white" }} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "red",
                    borderRadius: "50%",
                    padding: "2px 8px",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Cart Sidebar */}
      <CartDetail
       cartItems={cartItems}
        open={isCartSidebarOpen}
        onClose={() => setCartSidebarOpen(false)}
      />
    </>
  );
}

export default ResponsiveAppBar;
