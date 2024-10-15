import React, { useState, useEffect } from 'react';
import '../App.css'; // Add styles for HomePage here
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import Carousel from 'react-bootstrap/Carousel';

const HomePage = () => {
  const products = [
    { id: 1, name: "Bagpack", price: "₹ 9500", image: "/NIKE Diamond Select Bat Pack - Black.jpeg" },
    { id: 2, name: "Adidas Light", price: "₹ 12565", image: "/NIKE Diamond Select Bat Pack - Black.jpeg" },
    { id: 3, name: "Cartoon Astronaut T-Shirt", price: "₹ 12565", image: "/NIKE Diamond Select Bat Pack - Black.jpeg" },
    { id: 4, name: "Cartoon Astronaut T-Shirt", price: "₹ 12565", image: "/NIKE Diamond Select Bat Pack - Black.jpeg" },
    { id: 5, name: "Cartoon Astronaut T-Shirt", price: "₹ 12565", image: "/NIKE Diamond Select Bat Pack - Black.jpeg" },
    { id: 6, name: "Cartoon Astronaut T-Shirt", price: "₹ 12565", image: "/NIKE Diamond Select Bat Pack - Black.jpeg" },
  ];

  const carouselItems = [
    { id: 1, image: "/carasoule/1969 Ford Mustang Boss 429 Continuation Car Debuts at SEMA.jpeg", caption: "Limited Time Offer" },
    { id: 2, image: "/carasoule/download(3).jpeg", caption: "Best Sellers" },
    { id: 3, image: "/carasoule/download(4).jpeg", caption: "New Arrivals" },
  ];

  const [saleMessage, setSaleMessage] = useState('');

  useEffect(() => {
    const checkTime = () => {
      const currDate = new Date();
      
      // Extract day, month, and year to format the date
      const day = String(currDate.getDate()).padStart(2, '0');
      const month = String(currDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
      const year = String(currDate.getFullYear()).slice(-2); // Get last 2 digits of the year
  
      // Format as 15-10-24
      const formattedDate = `${day}-${month}-${year}`;
      
  
      
      const currentHour = currDate.getHours();
      const currentMinute = currDate.getMinutes();
  
      // Create a variable for the specific date you want to check against
      const saleEndDate = '16-10-24';
  
      // Adjusted condition: If today is the sale end date and it's before 10 PM (22:00)
      if (formattedDate === saleEndDate && (currentHour < 23)) {
        setSaleMessage('Sale ends at 10 PM today!');
      } else {
        setSaleMessage('The sale has ended. Check back for new offers!');
      }
    };
  
    // Call the function when component mounts
    checkTime();
  
    // Optional: Set interval to check every minute if you want real-time updates
    const interval = setInterval(checkTime, 60000);
  
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero">
        <img src='/hero-section.jpg' alt="" />
        <div className="hero-content">
          <h2>Super value Deals</h2>
          <h3>On all Products</h3>
          <p>Shop Now</p>
        </div>
      </div>

      {/* Product List */}
      <div className="product-list">
        <h3>Featured Products</h3>
        <div className="products">
          {products.map(product => (
            <div key={product.id} className="product">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>{product.price}</p>
              <button>
                <ShoppingBagIcon />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className='carousel'>
        <Carousel>
          {carouselItems.map(item => (
            <Carousel.Item key={item.id}>
              <img className="carousel-img" src={item.image} alt={`Slide ${item.id}`} />
              <Carousel.Caption>
                <h3>{item.caption}</h3>
                <p>{saleMessage}</p> {/* Dynamic message */}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>


      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Your Store Name. All Rights Reserved.</p>

        {/* Social Media Links */}
        <ul className="social">
          <li><a href="#"><i className="bi bi-facebook"></i></a></li>
          <li><a href="#"><i className="bi bi-instagram"></i></a></li>
          <li><a href="#"><i className="bi bi-twitter"></i></a></li>
        </ul>

        {/* Footer Info Section */}
        <div className="info">
          <ul>
            <li className="footer-list_header">Offers</li>
            <li><a href="#">Discounts</a></li>
            <li><a href="#">Seasonal Offers</a></li>
            <li><a href="#">Exclusive Deals</a></li>
          </ul>
          <ul>
            <li className="footer-list_header">Products</li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Trending</a></li>
          </ul>
          <ul>
            <li className="footer-list_header">Services</li>
            <li><a href="#">Customer Support</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
          <ul>
            <li className="footer-list_header">Company</li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
