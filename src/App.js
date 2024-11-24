

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "./component/NavigationBar.jsx";
// import MTable from "./component/MTable.jsx";
// import HomePage from "./component/HomePage.jsx";
// import UserLogin from "./component/UserLogin.jsx";
// import Register from "./component/RegisterPage.jsx";
// import TemporaryDrawer from "./component/ProductsSidebar.jsx";
// import Pricing from "./component/Pricing.jsx";
// import ProductList from "./component/Products.jsx";
// import Account from "./component/Account.jsx";
// import Dashboard from "./component/Dashboard.jsx";
// import UserProfile from "./component/UserProfile.jsx";
// import CartDetail from "./component/CartDetail.jsx";
// import PaymentPage from "./component/PaymentPage.jsx"; // Assuming you have this component

// const Home = () => <HomePage />;
// const Product = () => (
//   <div>
//     <MTable />
//   </div>
// );

// const ProductListing = ({ addToCart, filters, onFilterChange }) => (
//   <div>
//     <TemporaryDrawer onFilterChange={onFilterChange} />
//     <ProductList addToCart={addToCart} filters={filters} />
//   </div>
// );

// const User = () => <UserLogin />;
// const PricingPage = () => <Pricing />;
// const Registeration = () => <Register />;
// const UserProfilePage = () => <UserProfile />;
// const DashboardPage = () => <Dashboard />;
// const AccountPage = () => <Account />;

// const AppContent = ({ cartItems, toggleCart, addToCart, filters, onFilterChange }) => {
//   const location = useLocation();
//   const navigate = useNavigate();  // Use useNavigate for navigation

//   const showNavbar = location.pathname !== "/user"; // Hide Navbar on the User Login Page

//   return (
//     <div>
//       {showNavbar && (
//         <Navbar cartCount={cartItems.length} cartItems={cartItems} toggleCart={toggleCart} />
//       )}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Product />} />
//         <Route path="/Pricing" element={<PricingPage />} />
//         <Route path="/user" element={<User />} />
//         <Route path="/register" element={<Registeration />} />
//         <Route
//           path="/productlisting"
//           element={
//             <ProductListing
//               addToCart={addToCart}
//               filters={filters}
//               onFilterChange={onFilterChange}
//             />
//           }
//         />
//         <Route path="/Account" element={<AccountPage />} />
//         <Route path="/Dashboard" element={<DashboardPage />} />
//         <Route path="/UserProfile" element={<UserProfilePage />} />
//         <Route path="/payment" element={<PaymentPage />} /> {/* Add the Payment Page Route */}
//       </Routes>
//     </div>
//   );
// };

// const App = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [filters, setFilters] = useState({});

//   const addToCart = (product) => {
//     let updatedCartItems;
//     const existingItem = cartItems.find((item) => item._id === product._id);

//     if (existingItem) {
//       updatedCartItems = cartItems.map((item) =>
//         item._id === product._id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//     } else {
//       updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
//     }

//     setCartItems(updatedCartItems);
//     setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);

//     console.log("Updated Cart Items:", updatedCartItems);
//   };

//   const removeItem = (itemId) => {
//     const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
//     setCartItems(updatedCartItems);
//   };

//   const toggleCart = () => {
//     setCartOpen(!cartOpen);
//   };

//   const handleFilterChange = (newFilters) => {
//     console.log("Filters applied:", newFilters);
//     setFilters(newFilters);
//   };

//   return (
//     <Router>
//       <AppContent
//         cartItems={cartItems}
//         removeItem={removeItem}
//         toggleCart={toggleCart}
//         addToCart={addToCart}
//         filters={filters}
//         onFilterChange={handleFilterChange}
//       />
//       <CartDetail
//         cartItems={cartItems}
//         removeItem={removeItem}
//         open={cartOpen}
//         onClose={toggleCart}
//       />
//     </Router>
//   );
// };

// export default App;


import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./component/NavigationBar.jsx";
import MTable from "./component/MTable.jsx";
import HomePage from "./component/HomePage.jsx";
import UserLogin from "./component/UserLogin.jsx";
import Register from "./component/RegisterPage.jsx";
import TemporaryDrawer from "./component/ProductsSidebar.jsx";
import Pricing from "./component/Pricing.jsx";
import ProductList from "./component/Products.jsx";
import Account from "./component/Account.jsx";
import Dashboard from "./component/Dashboard.jsx";
import UserProfile from "./component/UserProfile.jsx";
import CartDetail from "./component/CartDetail.jsx";
import PaymentPage from "./component/PaymentPage.jsx";
import CheckoutPage from "./component/CheckoutPage";

const AppContent = ({ cartItems, toggleCart, addToCart, removeItem, filters, onFilterChange }) => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const showNavbar = location.pathname !== "/user"; 

  return (
    <div>
      {showNavbar && (
        <Navbar cartCount={cartItems.length} cartItems={cartItems} toggleCart={toggleCart} />
      )}
      <Routes>
        <Route path="/Ecommerce-site" element={<HomePage />} />
        <Route path="/products" element={<MTable />} />
        <Route path="/Pricing" element={<Pricing />} />
        <Route path="/user" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productlisting" element={<ProductList addToCart={addToCart} filters={filters} onFilterChange={onFilterChange} />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const addToCart = (product) => {
    let updatedCartItems;
    const existingItem = cartItems.find((item) => item._id === product._id);

    if (existingItem) {
      updatedCartItems = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCartItems);
  };

  const removeItem = (id) => {
    console.log("removeItem called for id:", id); // Debugging log
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item._id !== id);
      console.log("Updated Cart Items after removal:", updatedItems); // Log to verify the updated cart items
      return updatedItems;
    });
  };

  const toggleCart = () => {
    setCartOpen((prevState) => !prevState);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  console.log("App.js: removeItem is a function?", typeof removeItem); 

  return (
    <Router>
      <AppContent
        cartItems={cartItems}
        removeItem={removeItem}  // Ensure removeItem is passed correctly here
        toggleCart={toggleCart}
        addToCart={addToCart}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <CartDetail
        cartItems={cartItems}
        removeItem={removeItem}  // Ensure removeItem is passed here
        open={cartOpen}
        onClose={toggleCart}
      />
    </Router>
  );
};

export default App;
