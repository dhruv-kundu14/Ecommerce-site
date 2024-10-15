import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/NavigationBar.jsx';
import MTable from './component/MTable.jsx';
import HomePage from './component/HomePage.jsx';
import UserLogin from './component/UserLogin.jsx';
import Register from './component/RegisterPage.jsx';
import TemporaryDrawer from './component/Products.jsx';
import Pricing from './component/Pricing.jsx';
import ProductList from './component/ProductList.jsx';
import ShoppingCart from './component/ShoppingCart.jsx';

const Home = () => <HomePage />;
const Product = () => {
  return (
    <div>
      <TemporaryDrawer />
      <MTable />
    </div>
  );
};
// const Admin = () => <h2>Admin Login page</h2>;
const User = () => <UserLogin />;
const PricingPage = () => <Pricing />;
const Registeration = () => <Register />;
const ProductListing = ({ addToCart }) => <ProductList addToCart={addToCart} />;

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartOpen, setCartOpen] = useState(false); 

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);

    if (existingItem) {
      setCartItems(cartItems.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setTotalPrice(totalPrice + product.price);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <Router>
      <div>
        <Navbar cartCount={cartItems.length} toggleCart={toggleCart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/Pricing" element={<PricingPage />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
          <Route path="/user" element={<User />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/productlisting" element={<ProductListing addToCart={addToCart} />} />
        </Routes>

      </div>
    </Router>
  );
};

export default App;
