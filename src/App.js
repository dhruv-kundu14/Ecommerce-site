// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from './component/NavigationBar.jsx';
// import MTable from './component/MTable.jsx';
// import HomePage from './component/HomePage.jsx';
// import UserLogin from './component/UserLogin.jsx';
// import Register from './component/RegisterPage.jsx';
// import TemporaryDrawer from './component/ProductsSidebar.jsx';
// import Pricing from './component/Pricing.jsx';
// import ProductList from './component/Products.jsx';
// import Account from './component/Account.jsx';
// import Dashboard from './component/Dashboard.jsx';
// import UserProfile from './component/UserProfile.jsx';

// const Home = () => <HomePage />;
// const Product = () => (
//   <div>
//     <MTable />
//   </div>
// );

// const ProductListing = ({ addToCart }) => (
//   <div>
//     <TemporaryDrawer />
//     <ProductList addToCart={addToCart} />
//   </div>
// );

// const User = () => <UserLogin />;
// const PricingPage = () => <Pricing />;
// const Registeration = () => <Register />;
// const UserProfilePage = () => <UserProfile />;
// const DashboardPage = () => <Dashboard />;
// const AccountPage = () => <Account />;

// const AppContent = ({ cartItems, toggleCart, addToCart }) => {
//   const location = useLocation(); // Get the current route

//   // Conditionally hide Navbar
//   const showNavbar = location.pathname !== '/user';

//   return (
//     <div>
//       {showNavbar && <Navbar cartCount={cartItems.length} toggleCart={toggleCart} />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Product />} />
//         <Route path="/Pricing" element={<PricingPage />} />
//         <Route path="/user" element={<User />} />
//         <Route path="/register" element={<Registeration />} />
//         <Route path="/productlisting" element={<ProductListing addToCart={addToCart} />} />
//         <Route path="/Account" element={<AccountPage />} />
//         <Route path="/Dashboard" element={<DashboardPage />} />
//         <Route path="/UserProfile" element={<UserProfilePage />} />
//       </Routes>
//     </div>
//   );
// };

// const App = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [cartOpen, setCartOpen] = useState(false);

//   const addToCart = (product) => {
//     const existingItem = cartItems.find((item) => item._id === product._id);

//     if (existingItem) {
//       setCartItems(cartItems.map((item) =>
//         item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
//       ));
//     } else {
//       setCartItems([...cartItems, { ...product, quantity: 1 }]);
//     }

//     setTotalPrice(totalPrice + product.price);
//   };

//   const toggleCart = () => {
//     setCartOpen(!cartOpen);
//   };

//   return (
//     <Router>
//       <AppContent cartItems={cartItems} toggleCart={toggleCart} addToCart={addToCart} />
//     </Router>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/NavigationBar.jsx';
import MTable from './component/MTable.jsx';
import HomePage from './component/HomePage.jsx';
import UserLogin from './component/UserLogin.jsx';
import Register from './component/RegisterPage.jsx';
import TemporaryDrawer from './component/ProductsSidebar.jsx';
import Pricing from './component/Pricing.jsx';
import ProductList from './component/Products.jsx';
import Account from './component/Account.jsx';
import Dashboard from './component/Dashboard.jsx';
import UserProfile from './component/UserProfile.jsx';

const Home = () => <HomePage />;
const Product = () => (
  <div>
    <MTable />
  </div>
);

const ProductListing = ({ addToCart, filters, onFilterChange }) => (
  <div>
    <TemporaryDrawer onFilterChange={onFilterChange} />
    <ProductList addToCart={addToCart} filters={filters} />
  </div>
);

const User = () => <UserLogin />;
const PricingPage = () => <Pricing />;
const Registeration = () => <Register />;
const UserProfilePage = () => <UserProfile />;
const DashboardPage = () => <Dashboard />;
const AccountPage = () => <Account />;

const AppContent = ({ cartItems, toggleCart, addToCart, filters, onFilterChange }) => {
  const location = useLocation();

  // Conditionally hide Navbar
  const showNavbar = location.pathname !== '/user';

  return (
    <div>
      {showNavbar && <Navbar cartCount={cartItems.length} toggleCart={toggleCart} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/Pricing" element={<PricingPage />} />
        <Route path="/user" element={<User />} />
        <Route path="/register" element={<Registeration />} />
        <Route
          path="/productlisting"
          element={
            <ProductListing
              addToCart={addToCart}
              filters={filters}
              onFilterChange={onFilterChange}
            />
          }
        />
        <Route path="/Account" element={<AccountPage />} />
        <Route path="/Dashboard" element={<DashboardPage />} />
        <Route path="/UserProfile" element={<UserProfilePage />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [filters, setFilters] = useState({}); // Add state for filters

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setTotalPrice(totalPrice + product.price);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleFilterChange = (newFilters) => {
    console.log('Filters applied:', newFilters); // Debugging log
    setFilters(newFilters); // Update the filters state with new values
  };

  return (
    <Router>
      <AppContent
        cartItems={cartItems}
        toggleCart={toggleCart}
        addToCart={addToCart}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </Router>
  );
};

export default App;
